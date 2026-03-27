import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare, schimbaStatus, stergeRezervare, citesteRezervari } from '@/lib/rezervari'

// GET /api/rezervari — returnează toate rezervările
export async function GET() {
  try {
    const data = await citesteRezervari()
    return NextResponse.json({ succes: true, data })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la citire.' }, { status: 500 })
  }
}

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
