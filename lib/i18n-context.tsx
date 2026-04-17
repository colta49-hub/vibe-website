'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export const LIMBI = [
  { cod: 'ro', nume: 'Română',    flag: '🇷🇴' },
  { cod: 'en', nume: 'English',   flag: '🇬🇧' },
  { cod: 'de', nume: 'Deutsch',   flag: '🇩🇪' },
  { cod: 'fr', nume: 'Français',  flag: '🇫🇷' },
  { cod: 'ru', nume: 'Русский',   flag: '🇷🇺' },
  { cod: 'it', nume: 'Italiano',  flag: '🇮🇹' },
  { cod: 'es', nume: 'Español',   flag: '🇪🇸' },
  { cod: 'lt', nume: 'Lietuvių',  flag: '🇱🇹' },
  { cod: 'uk', nume: 'Українська',flag: '🇺🇦' },
  { cod: 'pl', nume: 'Polski',    flag: '🇵🇱' },
  { cod: 'el', nume: 'Ελληνικά', flag: '🇬🇷' },
  { cod: 'pt', nume: 'Português', flag: '🇵🇹' },
  { cod: 'cs', nume: 'Čeština',   flag: '🇨🇿' },
  { cod: 'sk', nume: 'Slovenčina',flag: '🇸🇰' },
  { cod: 'hu', nume: 'Magyar',    flag: '🇭🇺' },
  { cod: 'bg', nume: 'Български', flag: '🇧🇬' },
  { cod: 'sr', nume: 'Српски',    flag: '🇷🇸' },
  { cod: 'tr', nume: 'Türkçe',    flag: '🇹🇷' },
  { cod: 'nl', nume: 'Nederlands',flag: '🇳🇱' },
  { cod: 'sv', nume: 'Svenska',   flag: '🇸🇪' },
]

type Translations = Record<string, Record<string, string>>

interface I18nContextType {
  limba: string
  setLimba: (l: string) => void
  t: (sectiune: string, cheie: string) => string
  limbaInfo: typeof LIMBI[0]
}

const I18nContext = createContext<I18nContextType | null>(null)

const cache: Record<string, Translations> = {}

async function incarcaTraduceri(cod: string): Promise<Translations> {
  if (cache[cod]) return cache[cod]
  try {
    const res = await fetch(`/api/traduceri?lang=${cod}`)
    const data = await res.json()
    cache[cod] = data
    return data
  } catch {
    return {}
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [limba, setLimbaState] = useState('ro')
  const [traduceri, setTraduceri] = useState<Translations>({})

  useEffect(() => {
    const saved = localStorage.getItem('vibe-limba') || 'ro'
    setLimbaState(saved)
    incarcaTraduceri(saved).then(setTraduceri)
  }, [])

  function setLimba(cod: string) {
    setLimbaState(cod)
    localStorage.setItem('vibe-limba', cod)
    incarcaTraduceri(cod).then(setTraduceri)
  }

  function t(sectiune: string, cheie: string): string {
    return traduceri?.[sectiune]?.[cheie] || cheie
  }

  const limbaInfo = LIMBI.find(l => l.cod === limba) || LIMBI[0]

  return (
    <I18nContext.Provider value={{ limba, setLimba, t, limbaInfo }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n trebuie folosit în interiorul I18nProvider')
  return ctx
}
