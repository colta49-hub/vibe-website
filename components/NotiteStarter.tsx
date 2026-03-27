'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Notita {
  id: number
  mesaj: string
  created_at: string
  culoare: string
}

const CULORI = [
  { bg: '#FEF9EC', border: '#FCD34D', text: '#92400E' },
  { bg: '#FFF7ED', border: '#F59E0B', text: '#7C2D12' },
  { bg: '#FFFBEB', border: '#EAB308', text: '#713F12' },
  { bg: '#FEF3C7', border: '#D97706', text: '#78350F' },
  { bg: '#FDF4E7', border: '#B45309', text: '#6B2B00' },
]

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'acum câteva secunde'
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`
  return `acum ${Math.floor(diff / 86400)} zile`
}

export default function NotiteStarter() {
  const [notite, setNotite] = useState<Notita[]>([])
  const [mesaj, setMesaj] = useState('')
  const [trimis, setTrimis] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    incarcaNotite()
  }, [])

  async function incarcaNotite() {
    const { data } = await supabase
      .from('notite')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
    if (data) setNotite(data)
  }

  async function trimiteNotita() {
    const text = mesaj.trim()
    if (!text || text.length < 3) return
    setLoading(true)
    const culoare = CULORI[Math.floor(Math.random() * CULORI.length)].bg
    await supabase.from('notite').insert({ mesaj: text, culoare })
    setMesaj('')
    setTrimis(true)
    setLoading(false)
    await incarcaNotite()
    setTimeout(() => setTrimis(false), 4000)
  }

  return (
    <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #e8d5b0 50%, #f0e6cc 100%)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-700 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Recenzii clienți
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Vocea ta contează
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4 mb-6" />
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Ai vizitat Vibe Caffè? Lasă o recenzie și ajută-i pe alții să descopere experiența noastră.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Formular */}
          <div className="rounded-3xl p-8 bg-white border border-amber-100" style={{ boxShadow: '0 20px 60px rgba(44,24,16,0.12)' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Scrie o recenzie</h3>
            <p className="text-sm text-amber-600/70 mb-6 tracking-wide">Anonim · Vizibil tuturor · Max 160 caractere</p>

            <textarea
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value.slice(0, 160))}
              placeholder="Spune-ne cum a fost experiența ta la Vibe Caffè..."
              rows={4}
              className="w-full rounded-2xl border-2 border-amber-100 px-5 py-4 text-gray-800 text-base resize-none focus:outline-none focus:border-amber-300 transition-all bg-amber-50/30"
            />

            <div className="flex items-center justify-between mt-2 mb-5">
              <span className="text-xs text-gray-300">{mesaj.length}/160</span>
              {trimis && (
                <span className="text-sm font-semibold text-amber-600">
                  ✓ Recenzia ta a fost trimisă!
                </span>
              )}
            </div>

            <button
              onClick={trimiteNotita}
              disabled={loading || mesaj.trim().length < 3}
              className="block mx-auto px-8 py-3 rounded-2xl font-bold text-sm tracking-wide uppercase transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)', boxShadow: '0 4px 0 #92400e', color: '#1c1008' }}
            >
              {loading ? 'Se trimite...' : '⭐ Trimite recenzia'}
            </button>
          </div>

          {/* Peretele cu notițe */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {notite.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-3xl mb-3">☕</p>
                  <p className="text-amber-700 font-semibold text-base">Nicio recenzie încă</p>
                  <p className="text-amber-600/60 text-sm mt-1">Fii primul care împărtășește experiența!</p>
                </div>
              )}
              {notite.map((n, i) => {
                const culoare = CULORI.find(c => c.bg === n.culoare) || CULORI[i % CULORI.length]
                const rotatii = [-2, 1.5, -1, 2, -1.5, 1]
                return (
                  <div
                    key={n.id}
                    className="rounded-2xl p-5 transition-transform hover:-translate-y-1"
                    style={{
                      background: culoare.bg,
                      border: `2px solid ${culoare.border}`,
                      boxShadow: '0 6px 20px rgba(44,24,16,0.1)',
                      transform: `rotate(${rotatii[i % rotatii.length]}deg)`,
                    }}
                  >
                    <p className="text-sm font-medium leading-relaxed mb-3" style={{ color: culoare.text }}>
                      "{n.mesaj}"
                    </p>
                    <p className="text-xs opacity-50 font-semibold tracking-wide" style={{ color: culoare.text }}>
                      {timeAgo(n.created_at)}
                    </p>
                  </div>
                )
              })}
            </div>

            {notite.length > 0 && (
              <p className="text-center text-sm text-amber-600 font-bold mt-6 tracking-widest uppercase">
                ✦ Ultimele {notite.length} recenzii ✦
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
