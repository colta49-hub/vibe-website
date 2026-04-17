import { NextRequest, NextResponse } from 'next/server'
import { promises as dns } from 'dns'
import { supabaseServer as supabase } from '@/lib/supabase-server'

function validareEmailServer(email: string): boolean {
  const e = email.trim()
  return (
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e) &&
    (e.match(/@/g) || []).length === 1
  )
}

async function verificaMxDomain(email: string): Promise<boolean> {
  try {
    const domeniu = email.trim().split('@')[1]
    if (!domeniu) return false
    const records = await dns.resolveMx(domeniu)
    return records.length > 0
  } catch {
    return false
  }
}

function genereazaCod(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

// POST /api/trimite-cod
// Body: { email: string }
// Răspuns: { succes: true, cod: string } sau { eroare: string }
// Nota: trimiterea email-ului se face client-side prin EmailJS
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !validareEmailServer(email)) {
      return NextResponse.json({ eroare: 'Adresa de email nu este validă.' }, { status: 400 })
    }

    // Verificare MX — domeniu real?
    const mxValid = await verificaMxDomain(email)
    if (!mxValid) {
      return NextResponse.json(
        { eroare: 'Adresa de email nu există. Verifică și încearcă din nou.' },
        { status: 400 }
      )
    }

    // Marchează codurile vechi ca folosite (cleanup)
    await supabase
      .from('coduri_verificare')
      .update({ folosit: true })
      .eq('email', email.trim().toLowerCase())
      .eq('folosit', false)

    // Generează cod nou + expiră în 15 minute
    const cod = genereazaCod()
    const expiratLa = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    const { error } = await supabase.from('coduri_verificare').insert({
      email: email.trim().toLowerCase(),
      cod,
      expirat_la: expiratLa,
    })

    if (error) throw error

    // Returnează codul — trimiterea email se face client-side prin EmailJS
    return NextResponse.json({ succes: true, cod })
  } catch (e: unknown) {
    const mesaj = e instanceof Error ? e.message : 'Eroare la generarea codului.'
    return NextResponse.json({ eroare: mesaj }, { status: 500 })
  }
}
