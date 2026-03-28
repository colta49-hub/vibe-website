import { NextRequest, NextResponse } from 'next/server'
import { citesteOreOcupate } from '@/lib/rezervari'

export async function GET(req: NextRequest) {
  const data = req.nextUrl.searchParams.get('data')
  if (!data) return NextResponse.json({ eroare: 'data lipsește' }, { status: 400 })

  try {
    const ore = await citesteOreOcupate(data)
    return NextResponse.json({ ore })
  } catch {
    return NextResponse.json({ eroare: 'Eroare la citire.' }, { status: 500 })
  }
}
