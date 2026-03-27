'use client'

import { useState } from 'react'

const ORE_DISPONIBILE: string[] = []
for (let h = 10; h <= 22; h++) {
  ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 22) ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:30`)
}

function getAzi() { return new Date() }
function formatData(date: Date) { return date.toISOString().split('T')[0] }
function addLuni(date: Date, n: number) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d }
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay() }

function formatDataRo(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  const luni = ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec']
  return `${d} ${luni[parseInt(m) - 1]} ${y}`
}

function getDenumireZi(dateStr: string) {
  return ['Du','Lu','Ma','Mi','Jo','Vi','Sâ'][new Date(dateStr).getDay()]
}

export default function PaginaRezervari() {
  const azi = getAzi()
  const maxData = addLuni(azi, 6)

  const [pas, setPas] = useState(1)
  const [lunaCalendar, setLunaCalendar] = useState(new Date(azi.getFullYear(), azi.getMonth(), 1))
  const [dataSelectata, setDataSelectata] = useState('')
  const [oraSelectata, setOraSelectata] = useState('')
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', numar_persoane: 2 })
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [eroare, setEroare] = useState('')

  const year = lunaCalendar.getFullYear()
  const month = lunaCalendar.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const luniRo = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']

  const potMergeLunaInapoi = lunaCalendar > new Date(azi.getFullYear(), azi.getMonth(), 1)
  const potMergeLunaInainte = lunaCalendar < new Date(maxData.getFullYear(), maxData.getMonth(), 1)

  function esteDisponibila(zi: number) {
    const d = new Date(year, month, zi)
    return d >= new Date(formatData(azi)) && d <= maxData
  }

  const urmatoare14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(azi); d.setDate(azi.getDate() + i); return formatData(d)
  })

  async function trimite() {
    setLoading(true); setEroare('')
    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, data: dataSelectata, ora: oraSelectata }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.eroare)
      setSucces(true)
    } catch (e: unknown) {
      setEroare(e instanceof Error ? e.message : 'Eroare. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  function rezervareNoua() {
    setPas(1); setDataSelectata(''); setOraSelectata('')
    setForm({ nume: '', email: '', telefon: '', numar_persoane: 2 })
    setSucces(false); setEroare('')
  }

  // Ecran succes
  if (succes) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)' }}>
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}>✓</div>
          <h2 className="text-3xl font-bold text-white mb-3">Rezervare confirmată!</h2>
          <p className="text-teal-300 mb-1"><strong>{formatDataRo(dataSelectata)}</strong> la <strong>{oraSelectata}</strong></p>
          <p className="text-white/40 text-sm mb-8">Confirmare la {form.email}</p>
          <button onClick={rezervareNoua} className="w-full py-4 font-bold rounded-2xl text-white transition-all duration-300 hover:opacity-90" style={{ background: 'linear-gradient(135deg, #14B8A6, #F97316)' }}>
            Fă o rezervare nouă
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)' }}>

      {/* Blur orbs fundal */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#14B8A6' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#F97316' }} />

      <div className="relative max-w-lg mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: '#14B8A6' }}>Vibe Caffè</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Rezervă o masă</h1>
          <p className="text-white/40 text-sm">3 pași simpli</p>
        </div>

        {/* Indicator pași */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((p) => (
            <div key={p} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                pas === p ? 'text-white scale-110' :
                pas > p ? 'text-white/70' : 'text-white/30'
              }`} style={{
                background: pas === p ? 'linear-gradient(135deg, #14B8A6, #0D9488)' :
                pas > p ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.08)'
              }}>
                {pas > p ? '✓' : p}
              </div>
              {p < 3 && <div className="w-10 h-px" style={{ background: pas > p ? '#14B8A6' : 'rgba(255,255,255,0.15)' }} />}
            </div>
          ))}
        </div>

        {/* PASUL 1: Data */}
        {pas === 1 && (
          <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="text-xl font-bold text-white mb-1">Alege data</h2>
            <p className="text-white/40 text-xs mb-6">Disponibil 6 luni în avans</p>

            {/* Butoane rapide */}
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Zile rapide</p>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
              {urmatoare14.map((d) => (
                <button key={d} onClick={() => setDataSelectata(d)}
                  className="flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: dataSelectata === d ? 'linear-gradient(135deg, #14B8A6, #0D9488)' : 'rgba(255,255,255,0.08)',
                    color: dataSelectata === d ? 'white' : 'rgba(255,255,255,0.7)',
                    transform: dataSelectata === d ? 'scale(1.05)' : 'scale(1)'
                  }}>
                  <span className="opacity-70">{getDenumireZi(d)}</span>
                  <span className="text-base font-bold">{d.split('-')[2]}</span>
                </button>
              ))}
            </div>

            {/* Calendar */}
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Calendar</p>
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setLunaCalendar(new Date(year, month - 1, 1))} disabled={!potMergeLunaInapoi}
                  className="w-8 h-8 rounded-lg text-white text-lg transition-all disabled:opacity-20"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>‹</button>
                <span className="text-white font-semibold text-sm">{luniRo[month]} {year}</span>
                <button onClick={() => setLunaCalendar(new Date(year, month + 1, 1))} disabled={!potMergeLunaInainte}
                  className="w-8 h-8 rounded-lg text-white text-lg transition-all disabled:opacity-20"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>›</button>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {['Du','Lu','Ma','Mi','Jo','Vi','Sâ'].map((z) => (
                  <div key={z} className="text-center text-white/25 text-xs py-1">{z}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((zi) => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(zi).padStart(2, '0')}`
                  const disponibila = esteDisponibila(zi)
                  const selectata = dataSelectata === dateStr
                  return (
                    <button key={zi} onClick={() => disponibila && setDataSelectata(dateStr)} disabled={!disponibila}
                      className="aspect-square rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: selectata ? 'linear-gradient(135deg, #14B8A6, #0D9488)' : 'transparent',
                        color: selectata ? 'white' : disponibila ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)',
                        cursor: disponibila ? 'pointer' : 'not-allowed',
                        transform: selectata ? 'scale(1.1)' : 'scale(1)'
                      }}>
                      {zi}
                    </button>
                  )
                })}
              </div>
            </div>

            <button onClick={() => setPas(2)} disabled={!dataSelectata}
              className="w-full mt-6 py-4 font-bold rounded-2xl text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}>
              Continuă →
            </button>
          </div>
        )}

        {/* PASUL 2: Ora */}
        {pas === 2 && (
          <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="text-xl font-bold text-white mb-1">Alege ora</h2>
            <p className="text-xs mb-6" style={{ color: '#14B8A6' }}>{formatDataRo(dataSelectata)}</p>
            <div className="grid grid-cols-4 gap-2">
              {ORE_DISPONIBILE.map((o) => (
                <button key={o} onClick={() => setOraSelectata(o)}
                  className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: oraSelectata === o ? 'linear-gradient(135deg, #14B8A6, #0D9488)' : 'rgba(255,255,255,0.08)',
                    color: oraSelectata === o ? 'white' : 'rgba(255,255,255,0.75)',
                    transform: oraSelectata === o ? 'scale(1.05)' : 'scale(1)'
                  }}>
                  {o}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setPas(1)} className="flex-1 py-4 rounded-2xl font-semibold text-white/70 transition-all" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                ← Înapoi
              </button>
              <button onClick={() => setPas(3)} disabled={!oraSelectata}
                className="flex-1 py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {/* PASUL 3: Detalii */}
        {pas === 3 && (
          <div className="rounded-3xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="text-xl font-bold text-white mb-1">Detaliile tale</h2>
            <p className="text-xs mb-6" style={{ color: '#14B8A6' }}>{formatDataRo(dataSelectata)} la {oraSelectata}</p>

            <div className="space-y-4">
              {[
                { label: 'Nume complet *', key: 'nume', type: 'text', placeholder: 'Ex: Maria Ionescu' },
                { label: 'Email *', key: 'email', type: 'email', placeholder: 'Ex: maria@gmail.com' },
                { label: 'Telefon *', key: 'telefon', type: 'tel', placeholder: 'Ex: 07xxxxxxxx' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-white/50 text-xs mb-1.5 block">{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-2xl px-5 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    onFocus={(e) => e.target.style.borderColor = '#14B8A6'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>
              ))}

              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Număr persoane (1–12)</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setForm({ ...form, numar_persoane: Math.max(1, form.numar_persoane - 1) })}
                    className="w-12 h-12 rounded-xl text-2xl font-bold text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>−</button>
                  <span className="text-white text-2xl font-bold w-8 text-center">{form.numar_persoane}</span>
                  <button onClick={() => setForm({ ...form, numar_persoane: Math.min(12, form.numar_persoane + 1) })}
                    className="w-12 h-12 rounded-xl text-2xl font-bold text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>+</button>
                </div>
              </div>
            </div>

            {eroare && <p className="text-red-400 text-sm mt-4">{eroare}</p>}

            <div className="flex gap-3 mt-8">
              <button onClick={() => setPas(2)} className="flex-1 py-4 rounded-2xl font-semibold text-white/70 transition-all" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                ← Înapoi
              </button>
              <button onClick={trimite} disabled={!form.nume || !form.email || !form.telefon || loading}
                className="flex-1 py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Se trimite...
                  </>
                ) : 'Rezervă acum'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
