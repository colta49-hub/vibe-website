import { supabase } from './supabase'

export interface Rezervare {
  nume: string
  email: string
  telefon: string
  numar_persoane?: number
  data: string
  ora: string
}

export async function salveazaRezervare(rezervare: Rezervare) {
  const { data, error } = await supabase
    .from('rezervari')
    .insert([rezervare])
    .select()

  if (error) throw error
  return data
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('creat_la', { ascending: false })

  if (error) throw error
  return data
}
