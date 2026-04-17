import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const LIMBI_VALIDE = ['ro','en','de','fr','ru','it','es','lt','uk','pl','el','pt','cs','sk','hu','bg','sr','tr','nl','sv']

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') || 'ro'
  const cod = LIMBI_VALIDE.includes(lang) ? lang : 'ro'

  try {
    const filePath = join(process.cwd(), 'messages', `${cod}.json`)
    const content = readFileSync(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(content))
  } catch {
    return NextResponse.json({}, { status: 404 })
  }
}
