'use client'

import { useState, useEffect, useCallback } from 'react'

interface Rezervare {
  id: number
  nume: string
  email: string
  telefon: string
  numar_persoane: number
  data: string
  ora: string
  status: 'în așteptare' | 'confirmat' | 'respins'
  creat_la: string
}

const STATUS_CULORI: Record<string, string> = {
  'în așteptare': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'confirmat': 'bg-teal-100 text-teal-800 border-teal-200',
  'respins': 'bg-red-100 text-red-800 border-red-200',
}

const FILTRE = ['toate', 'în așteptare', 'confirmat', 'respins']

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([])
  const [cautare, setCautare] = useState('')
  const [filtruStatus, setFiltruStatus] = useState('toate')
  const [loading, setLoading] = useState(true)
  const [eroare, setEroare] = useState('')
  const [actiune, setActiune] = useState<number | null>(null)

  const incarcaRezervari = useCallback(async () => {
    setLoading(true)
    setEroare('')
    try {
      const res = await fetch('/api/rezervari')
      if (!res.ok) throw new Error('Eroare la încărcare')
      const json = await res.json()
      setRezervari(json.data ?? [])
    } catch {
      setEroare('Nu s-au putut încărca rezervările.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    incarcaRezervari()
  }, [incarcaRezervari])

  const schimbaStatus = async (id: number, status: string) => {
    setActiune(id)
    try {
      const res = await fetch('/api/rezervari', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error()
      setRezervari(prev =>
        prev.map(r => r.id === id ? { ...r, status: status as Rezervare['status'] } : r)
      )
    } catch {
      alert('Eroare la actualizare status.')
    } finally {
      setActiune(null)
    }
  }

  const sterge = async (id: number) => {
    if (!confirm('Sigur vrei să ștergi această rezervare?')) return
    setActiune(id)
    try {
      const res = await fetch('/api/rezervari', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error()
      setRezervari(prev => prev.filter(r => r.id !== id))
    } catch {
      alert('Eroare la ștergere.')
    } finally {
      setActiune(null)
    }
  }

  const rezervariFiltrate = rezervari.filter(r => {
    const potrivesteCautare = r.nume.toLowerCase().includes(cautare.toLowerCase())
    const potriviteFiltru = filtruStatus === 'toate' || r.status === filtruStatus
    return potrivesteCautare && potriviteFiltru
  })

  const formatData = (data: string) =>
    new Date(data).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })

  const formatOra = (ora: string) => ora.slice(0, 5)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)' }}>
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-6"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Admin <span style={{ color: '#14B8A6' }}>Rezervări</span></h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {/* Contoare status */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm"
                  style={{ background: 'rgba(234,179,8,0.15)', borderColor: 'rgba(234,179,8,0.4)', color: '#fde047' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(234,179,8,0.3)' }}>
                    {rezervari.filter(r => r.status === 'în așteptare').length}
                  </span>
                  în așteptare
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm"
                  style={{ background: 'rgba(20,184,166,0.15)', borderColor: 'rgba(20,184,166,0.4)', color: '#5eead4' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(20,184,166,0.3)' }}>
                    {rezervari.filter(r => r.status === 'confirmat').length}
                  </span>
                  confirmate
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm"
                  style={{ background: 'rgba(249,115,22,0.15)', borderColor: 'rgba(249,115,22,0.4)', color: '#fdba74' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(249,115,22,0.3)' }}>
                    {rezervari.filter(r => r.status === 'respins').length}
                  </span>
                  respinse
                </div>
                <button
                  onClick={incarcaRezervari}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 transition-all"
                >
                  ↻ Reîncarcă
                </button>
              </div>
            </div>
          </div>

          {/* Filtre + Căutare */}
          <div className="backdrop-blur-md rounded-2xl border border-white/10 p-4 mb-6 flex flex-col sm:flex-row gap-3"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <input
              type="text"
              placeholder="Caută după nume..."
              value={cautare}
              onChange={e => setCautare(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-teal-400 transition-all"
            />
            <div className="flex gap-2 flex-wrap">
              {FILTRE.map(filtru => (
                <button
                  key={filtru}
                  onClick={() => setFiltruStatus(filtru)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    filtruStatus === filtru
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                      : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {filtru}
                </button>
              ))}
            </div>
          </div>

          {/* Conținut */}
          {loading ? (
            <div className="text-center py-20 text-white/60">Se încarcă...</div>
          ) : eroare ? (
            <div className="text-center py-20 text-red-400">{eroare}</div>
          ) : rezervariFiltrate.length === 0 ? (
            <div className="text-center py-20 text-white/40">Nicio rezervare găsită.</div>
          ) : (
            <>
              {/* Tabel — desktop */}
              <div className="hidden md:block backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-sm">
                      <th className="text-left px-5 py-4 font-medium">Nume</th>
                      <th className="text-left px-5 py-4 font-medium">Contact</th>
                      <th className="text-left px-5 py-4 font-medium">Data & Ora</th>
                      <th className="text-left px-5 py-4 font-medium">Persoane</th>
                      <th className="text-left px-5 py-4 font-medium">Status</th>
                      <th className="text-right px-5 py-4 font-medium">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rezervariFiltrate.map((r, i) => (
                      <tr
                        key={r.id}
                        className={`border-b border-white/5 transition-colors hover:bg-white/5 ${actiune === r.id ? 'opacity-50' : ''}`}
                      >
                        <td className="px-5 py-4">
                          <div className="text-white font-medium">{r.nume}</div>
                          <div className="text-white/40 text-xs mt-0.5">#{r.id}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-white/80 text-sm">{r.email}</div>
                          <div className="text-white/50 text-xs mt-0.5">{r.telefon}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-white/80 text-sm">{formatData(r.data)}</div>
                          <div className="text-white/50 text-xs mt-0.5">{formatOra(r.ora)}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-white/80 text-sm">{r.numar_persoane} pers.</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_CULORI[r.status]}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2 justify-end">
                            {r.status !== 'confirmat' && (
                              <button
                                onClick={() => schimbaStatus(r.id, 'confirmat')}
                                disabled={actiune === r.id}
                                className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/40 text-xs font-medium transition-all disabled:opacity-40"
                              >
                                ✓ Confirmă
                              </button>
                            )}
                            {r.status !== 'respins' && (
                              <button
                                onClick={() => schimbaStatus(r.id, 'respins')}
                                disabled={actiune === r.id}
                                className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/40 text-xs font-medium transition-all disabled:opacity-40"
                              >
                                ✗ Respinge
                              </button>
                            )}
                            <button
                              onClick={() => sterge(r.id)}
                              disabled={actiune === r.id}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/40 text-xs font-medium transition-all disabled:opacity-40"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Carduri — mobil */}
              <div className="md:hidden flex flex-col gap-3">
                {rezervariFiltrate.map(r => (
                  <div
                    key={r.id}
                    className={`backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-opacity ${actiune === r.id ? 'opacity-50' : ''}`}
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-white font-semibold">{r.nume}</div>
                        <div className="text-white/40 text-xs">#{r.id}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_CULORI[r.status]}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Email</div>
                        <div className="text-white/80">{r.email}</div>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Telefon</div>
                        <div className="text-white/80">{r.telefon}</div>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Data</div>
                        <div className="text-white/80">{formatData(r.data)}</div>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Ora & Persoane</div>
                        <div className="text-white/80">{formatOra(r.ora)} · {r.numar_persoane} pers.</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {r.status !== 'confirmat' && (
                        <button
                          onClick={() => schimbaStatus(r.id, 'confirmat')}
                          disabled={actiune === r.id}
                          className="flex-1 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/40 text-sm font-medium transition-all disabled:opacity-40"
                        >
                          ✓ Confirmă
                        </button>
                      )}
                      {r.status !== 'respins' && (
                        <button
                          onClick={() => schimbaStatus(r.id, 'respins')}
                          disabled={actiune === r.id}
                          className="flex-1 py-2 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/40 text-sm font-medium transition-all disabled:opacity-40"
                        >
                          ✗ Respinge
                        </button>
                      )}
                      <button
                        onClick={() => sterge(r.id)}
                        disabled={actiune === r.id}
                        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/40 text-sm transition-all disabled:opacity-40"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
