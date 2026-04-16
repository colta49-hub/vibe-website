import { supabase } from './supabase'

export interface Rezervare {
  nume: string
  email: string
  telefon: string
  numar_persoane?: number
  data: string
  ora: string
  tip?: 'normal' | 'eveniment'
  durata_ore?: number
}

// Ore blocate de un eveniment: ora start + durata + 30 min curățenie
export function calculeazaOreBlocate(oraStart: string, durataOre: number): string[] {
  const [h, m] = oraStart.split(':').map(Number)
  const startMin = h * 60 + m
  // +30 min curățenie după eveniment
  const sfarsitMin = startMin + durataOre * 60 + 30
  const blocate: string[] = []
  for (let min = startMin; min < sfarsitMin; min += 30) {
    const hh = Math.floor(min / 60)
    const mm = min % 60
    blocate.push(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`)
  }
  return blocate
}

export async function salveazaRezervare(rezervare: Rezervare) {
  // Citește toate rezervările confirmate din ziua respectivă
  const { data: existente, error: errCheck } = await supabase
    .from('rezervari')
    .select('ora, tip, durata_ore')
    .eq('data', rezervare.data)
    .eq('status', 'confirmat')

  if (errCheck) throw errCheck

  // Calculează toate orele blocate de rezervările existente
  const oreBlocate = new Set<string>()
  for (const r of existente ?? []) {
    const tip = r.tip ?? 'normal'
    const durata = r.durata_ore ?? 1
    const ora = r.ora.substring(0, 5) // "13:00:00" → "13:00"
    if (tip === 'eveniment') {
      for (const o of calculeazaOreBlocate(ora, durata)) oreBlocate.add(o)
    } else {
      oreBlocate.add(ora)
    }
  }

  const oraNoua = rezervare.ora.substring(0, 5)
  if (oreBlocate.has(oraNoua)) {
    throw new Error('Această oră este deja rezervată. Te rugăm alege altă oră.')
  }

  // Dacă e eveniment, verifică că toate orele din interval sunt libere
  if (rezervare.tip === 'eveniment' && rezervare.durata_ore) {
    const oreNecesare = calculeazaOreBlocate(oraNoua, rezervare.durata_ore)
    const conflict = oreNecesare.find(o => oreBlocate.has(o))
    if (conflict) {
      throw new Error(`Intervalul ales nu este disponibil complet. Ora ${conflict} este deja rezervată.`)
    }
  }

  const { data, error } = await supabase
    .from('rezervari')
    .insert([{ ...rezervare, ora: oraNoua, tip: rezervare.tip ?? 'normal', durata_ore: rezervare.durata_ore ?? 1, status: 'confirmat' }])
    .select()

  if (error) throw error
  return data
}

export async function citesteOreOcupate(data: string): Promise<string[]> {
  const { data: rows, error } = await supabase
    .from('rezervari')
    .select('ora, tip, durata_ore')
    .eq('data', data)
    .eq('status', 'confirmat')

  if (error) throw error

  const oreBlocate = new Set<string>()
  for (const r of rows ?? []) {
    const tip = r.tip ?? 'normal'
    const durata = r.durata_ore ?? 1
    const ora = (r.ora as string).substring(0, 5)
    if (tip === 'eveniment') {
      for (const o of calculeazaOreBlocate(ora, durata)) oreBlocate.add(o)
    } else {
      oreBlocate.add(ora)
    }
  }

  return Array.from(oreBlocate)
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('creat_la', { ascending: false })

  if (error) throw error
  return data
}

export async function schimbaStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

export async function stergeRezervare(id: number) {
  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id)

  if (error) throw error
}
