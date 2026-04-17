import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare, schimbaStatus, stergeRezervare, citesteRezervari } from '@/lib/rezervari'
import { Resend } from 'resend'
import { promises as dns } from 'dns'
import { supabaseServer as supabase } from '@/lib/supabase-server'

// GET /api/rezervari — returnează toate rezervările
export async function GET() {
  try {
    const data = await citesteRezervari()
    return NextResponse.json({ succes: true, data })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la citire.' }, { status: 500 })
  }
}

function formatDataRo(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  const luni = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
  return `${d} ${luni[parseInt(m) - 1]} ${y}`
}

async function trimiteConfirmareEmail(email: string, nume: string, data: string, ora: string, persoane: number) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) return

  const resend = new Resend(RESEND_API_KEY)

  await resend.emails.send({
      from: 'Vibe Caffè <onboarding@resend.dev>',
      to: [email],
      subject: `✅ Rezervare confirmată — ${formatDataRo(data)} la ${ora}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #1c1008; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #fcd34d, #f59e0b); padding: 32px; text-align: center;">
            <div style="font-size: 40px;">☕</div>
            <h1 style="color: #1c1008; margin: 8px 0 4px; font-size: 24px;">Rezervare confirmată!</h1>
            <p style="color: #3d1f08; margin: 0; font-size: 14px;">Vibe Caffè · Crawley, UK</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.7); margin: 0 0 24px;">Bună, <strong style="color: #fcd34d;">${nume}</strong>!</p>
            <p style="color: rgba(255,255,255,0.7); margin: 0 0 24px;">Rezervarea ta a fost înregistrată cu succes. Te așteptăm!</p>
            <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(245,158,11,0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color: rgba(255,255,255,0.4); font-size: 12px; padding: 6px 0;">📅 Data</td><td style="color: #fcd34d; font-weight: bold; font-size: 14px; text-align: right;">${formatDataRo(data)}</td></tr>
                <tr><td style="color: rgba(255,255,255,0.4); font-size: 12px; padding: 6px 0;">🕐 Ora</td><td style="color: #fcd34d; font-weight: bold; font-size: 14px; text-align: right;">${ora}</td></tr>
                <tr><td style="color: rgba(255,255,255,0.4); font-size: 12px; padding: 6px 0;">👥 Persoane</td><td style="color: #fcd34d; font-weight: bold; font-size: 14px; text-align: right;">${persoane}</td></tr>
              </table>
            </div>
            <div style="background: rgba(245,158,11,0.08); border-radius: 12px; padding: 16px; text-align: center;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 4px;">📍 Locație</p>
              <p style="color: #fff; font-weight: bold; margin: 0; font-size: 14px;">2 Pound Hill Parade, Crawley RH10 7EA</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 0;">© 2026 Vibe Caffè · +44 7706 644 224</p>
          </div>
        </div>
      `,
  })
}

async function trimiteConfirmareSMS(telefon: string, nume: string, data: string, ora: string) {
  // Twilio SMS
  const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
  const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN
  const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) return

  const mesaj = `Vibe Caffè ✅ Rezervare confirmată, ${nume}! Data: ${formatDataRo(data)} la ${ora}. Adresă: 2 Pound Hill Parade, Crawley. Tel: +44 7706 644 224`

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: TWILIO_FROM, To: telefon, Body: mesaj }),
  })
}

function validareEmailServer(email: string): boolean {
  const e = email.trim()
  // un singur @, caractere valide înainte, domeniu cu punct + extensie minim 2 caractere
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e) && (e.match(/@/g) || []).length === 1
}

async function verificaMxDomain(email: string): Promise<boolean> {
  try {
    const domeniu = email.trim().split('@')[1]
    if (!domeniu) return false
    const records = await dns.resolveMx(domeniu)
    return records.length > 0
  } catch {
    // ENOTFOUND = domeniu inexistent, ENODATA = fără MX records
    return false
  }
}

function normalizeazaTelefon(telefon: string): string {
  return telefon.replace(/[\s\-().]/g, '')
}

// Prefixe locale valide per cod de țară (cifre după codul de țară)
const PREFIXE_VALIDE: Array<{ cod: string; lungime: number[]; prefix: RegExp }> = [
  { cod: '44',  lungime: [9,10],        prefix: /^(0?[1-9][0-9])/ },
  { cod: '40',  lungime: [9],           prefix: /^(7[0-8]|[23][0-9])/ },
  { cod: '373', lungime: [7,8],         prefix: /^[2-9]/ },
  { cod: '1',   lungime: [10],          prefix: /^[2-9][0-9]{2}[2-9]/ },
  { cod: '49',  lungime: [9,10,11],     prefix: /^(1[5-7][0-9]|[2-9][0-9])/ },
  { cod: '33',  lungime: [9],           prefix: /^[1-9]/ },
  { cod: '39',  lungime: [9,10],        prefix: /^(0[0-9]|3[0-9])/ },
  { cod: '34',  lungime: [9],           prefix: /^[6-9]/ },
  { cod: '31',  lungime: [9],           prefix: /^(0?6[0-9]|[1-9][0-9])/ },
  { cod: '32',  lungime: [8,9],         prefix: /^(0?4[0-9]|[1-9][0-9])/ },
  { cod: '48',  lungime: [9],           prefix: /^[4-8][0-9]/ },
  { cod: '380', lungime: [9],           prefix: /^[3-9][0-9]/ },
  { cod: '7',   lungime: [10],          prefix: /^[3-9][0-9]/ },
  { cod: '90',  lungime: [10],          prefix: /^(5[0-9][0-9]|[2-4][0-9][0-9])/ },
  { cod: '971', lungime: [7,8,9],       prefix: /^(5[024568]|[2-4][0-9])/ },
]

function validareTelefonServer(telefon: string): boolean {
  const t = normalizeazaTelefon(telefon)
  if (!/^\+\d{7,15}$/.test(t)) return false
  const cifre = t.slice(1) // fără +
  // Respinge toate cifrele identice
  if (/^(\d)\1+$/.test(cifre)) return false
  // Respinge secvențe simple
  if (cifre.includes('1234567890') || cifre.includes('0123456789')) return false
  // Respinge mai mult de 6 cifre identice consecutive
  if (/(\d)\1{5,}/.test(cifre)) return false
  // Trebuie cel puțin 4 cifre diferite
  if (new Set(cifre.split('')).size < 4) return false
  // Verificare lungime + prefix local per țară
  const tara = PREFIXE_VALIDE.find(p => cifre.startsWith(p.cod))
  if (tara) {
    const local = cifre.slice(tara.cod.length)
    if (!tara.lungime.includes(local.length)) return false
    if (!tara.prefix.test(local)) return false
  }
  return true
}

async function verificaCodEmail(email: string, cod: string): Promise<{ valid: boolean; eroare?: string }> {
  const emailNorm = email.trim().toLowerCase()

  const { data: rows, error } = await supabase
    .from('coduri_verificare')
    .select('id, cod, incercari, expirat_la, folosit')
    .eq('email', emailNorm)
    .eq('folosit', false)
    .order('creat_la', { ascending: false })
    .limit(1)

  if (error || !rows || rows.length === 0) {
    return { valid: false, eroare: 'Nu există un cod activ pentru acest email. Apasă "Trimite cod" din nou.' }
  }

  const record = rows[0]

  if (new Date(record.expirat_la) < new Date()) {
    return { valid: false, eroare: 'Codul a expirat. Apasă "Trimite cod" pentru a primi unul nou.' }
  }

  if (record.incercari >= 5) {
    return { valid: false, eroare: 'Prea multe încercări greșite. Apasă "Trimite cod" pentru un cod nou.' }
  }

  if (record.cod !== cod.trim()) {
    // Incrementează numărul de încercări
    await supabase
      .from('coduri_verificare')
      .update({ incercari: record.incercari + 1 })
      .eq('id', record.id)

    const ramasIncercari = 4 - record.incercari
    return { valid: false, eroare: `Cod incorect. Mai ai ${ramasIncercari} încercar${ramasIncercari === 1 ? 'e' : 'i'}.` }
  }

  // Cod corect — marchează ca folosit
  await supabase
    .from('coduri_verificare')
    .update({ folosit: true })
    .eq('id', record.id)

  return { valid: true }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nume, email, telefon, numar_persoane, data, ora, metoda_confirmare, tip, durata_ore, cod_verificare } = body

    if (!nume || !email || !telefon || !data || !ora) {
      return NextResponse.json({ eroare: 'Toate câmpurile sunt obligatorii.' }, { status: 400 })
    }

    if (!validareEmailServer(email)) {
      return NextResponse.json({ eroare: 'Adresa de email nu este validă.' }, { status: 400 })
    }

    if (!validareTelefonServer(telefon)) {
      return NextResponse.json({ eroare: 'Numărul de telefon nu este valid. Trebuie să includă codul țării (ex: +44...).' }, { status: 400 })
    }

    // Verificare cod email
    if (!cod_verificare) {
      return NextResponse.json({ eroare: 'Codul de verificare este obligatoriu.' }, { status: 400 })
    }

    const verificare = await verificaCodEmail(email, cod_verificare)
    if (!verificare.valid) {
      return NextResponse.json({ eroare: verificare.eroare }, { status: 400 })
    }

    const rezultat = await salveazaRezervare({ nume, email, telefon, numar_persoane, data, ora, tip: tip ?? 'normal', durata_ore: durata_ore ?? 1 })

    // Trimite confirmare în funcție de preferința clientului
    try {
      if (metoda_confirmare === 'sms') {
        await trimiteConfirmareSMS(telefon, nume, data, ora)
      } else {
        await trimiteConfirmareEmail(email, nume, data, ora, numar_persoane ?? 2)
      }
    } catch {
      // Confirmare eșuată nu blochează rezervarea
    }

    return NextResponse.json({ succes: true, data: rezultat })
  } catch (e: unknown) {
    const mesaj = e instanceof Error ? e.message : 'Eroare la salvare. Încearcă din nou.'
    const status = mesaj.includes('deja rezervată') ? 409 : 500
    return NextResponse.json({ eroare: mesaj }, { status })
  }
}

const STATUSURI_VALIDE = ['în așteptare', 'confirmat', 'respins']

// PATCH /api/rezervari — schimbă statusul unei rezervări
// Body: { id: number, status: string }
// Status-uri valide: 'în așteptare', 'confirmat', 'respins'
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ eroare: 'id și status sunt obligatorii.' }, { status: 400 })
    }

    if (!STATUSURI_VALIDE.includes(status)) {
      return NextResponse.json({ eroare: `Status invalid. Valorile acceptate: ${STATUSURI_VALIDE.join(', ')}.` }, { status: 400 })
    }

    const rezultat = await schimbaStatus(id, status)
    return NextResponse.json({ succes: true, data: rezultat })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la actualizare.' }, { status: 500 })
  }
}

// DELETE /api/rezervari — șterge o rezervare
// Body: { id: number }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ eroare: 'id este obligatoriu.' }, { status: 400 })
    }

    await stergeRezervare(id)
    return NextResponse.json({ succes: true })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la ștergere.' }, { status: 500 })
  }
}
