import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare } from '@/lib/rezervari'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nume, email, telefon, numar_persoane, data, ora } = body

    if (!nume || !email || !telefon || !data || !ora) {
      return NextResponse.json({ eroare: 'Toate câmpurile sunt obligatorii.' }, { status: 400 })
    }

    const rezultat = await salveazaRezervare({ nume, email, telefon, numar_persoane, data, ora })
    return NextResponse.json({ succes: true, data: rezultat })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la salvare. Încearcă din nou.' }, { status: 500 })
  }
}
