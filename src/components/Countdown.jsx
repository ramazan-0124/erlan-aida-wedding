import { useEffect, useState } from 'react'
import { data } from '../data'

// Кері санақ: тойға дейін қалған күн/сағат/минут/секунд.
function diff(target) {
  const ms = Math.max(0, target - Date.now())
  const s = Math.floor(ms / 1000)
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

export default function Countdown() {
  const c = data.countdown
  const target = new Date(c.target).getTime()
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const cells = [
    [t.d, c.units.d],
    [t.h, c.units.h],
    [t.m, c.units.m],
    [t.s, c.units.s],
  ]

  return (
    <div className="countdown center">
      <div className="countdown__pre script">{c.pre}</div>
      <div className="countdown__row">
        {cells.map(([n, label], i) => (
          <div className="countdown__cell" key={i}>
            <span className="countdown__num">{String(n).padStart(2, '0')}</span>
            <span className="countdown__label">{label}</span>
          </div>
        ))}
      </div>
      <div className="countdown__dress">{c.dressCode}</div>
    </div>
  )
}
