import { NextRequest, NextResponse } from 'next/server'
import { promises as dns } from 'dns'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

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
// Răspuns: { succes: true } sau { eroare: string }
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

    // Trimite email cu codul
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY)
      await resend.emails.send({
        from: 'Vibe Caffè <onboarding@resend.dev>',
        to: [email.trim()],
        subject: `🔐 Codul tău de verificare — ${cod}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #1c1008; color: #fff; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #fcd34d, #f59e0b); padding: 28px; text-align: center;">
              <div style="font-size: 36px;">☕</div>
              <h1 style="color: #1c1008; margin: 8px 0 4px; font-size: 22px;">Verificare email</h1>
              <p style="color: #3d1f08; margin: 0; font-size: 13px;">Vibe Caffè · Crawley, UK</p>
            </div>
            <div style="padding: 32px; text-align: center;">
              <p style="color: rgba(255,255,255,0.6); margin: 0 0 24px; font-size: 14px;">Folosește codul de mai jos pentru a confirma rezervarea ta:</p>
              <div style="background: rgba(245,158,11,0.12); border: 2px solid rgba(245,158,11,0.4); border-radius: 16px; padding: 24px; display: inline-block; margin-bottom: 24px;">
                <span style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #fcd34d;">${cod}</span>
              </div>
              <p style="color: rgba(255,255,255,0.35); font-size: 12px; margin: 0;">Codul expiră în <strong style="color: rgba(255,255,255,0.5);">15 minute</strong>.</p>
              <p style="color: rgba(255,255,255,0.35); font-size: 12px; margin: 8px 0 0;">Dacă nu ai solicitat acest cod, ignoră acest email.</p>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
              <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 0;">© 2026 Vibe Caffè · +44 7706 644 224</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ succes: true })
  } catch (e: unknown) {
    const mesaj = e instanceof Error ? e.message : 'Eroare la trimiterea codului.'
    return NextResponse.json({ eroare: mesaj }, { status: 500 })
  }
}
