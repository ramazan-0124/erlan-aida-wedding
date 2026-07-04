import { useState } from 'react'
import { data } from '../data'
import Reveal from './Reveal'

export default function Rsvp() {
  const r = data.rsvp
  const [name, setName] = useState('')
  const [attend, setAttend] = useState(null)
  const [guests, setGuests] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const canSend = name.trim() && attend && !busy

  async function submit(e) {
    e.preventDefault()
    if (!canSend) return
    setBusy(true)
    const payload = {
      name,
      attend: attend === 'yes' ? 'Келемін' : 'Келмеймін',
      guests: attend === 'yes' ? guests || '1' : '—',
      // Алматы уақыты (UTC+5) — жауап берілген сәт
      time: new Intl.DateTimeFormat('ru-RU', {
        timeZone: 'Asia/Almaty',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date()),
    }
    try {
      if (r.endpoint) {
        // text/plain → Apps Script веб-аппқа CORS preflight жібермейміз
        await fetch(r.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        })
      } else {
        console.log('RSVP (демо):', payload)
      }
    } catch {
      /* всё равно благодарим гостя */
    } finally {
      setSent(true)
      setBusy(false)
    }
  }

  return (
    <section className="pad center" id="rsvp">
      <Reveal className="center">
        <div className="badge">{r.badge}</div>
        <h2 className="sec-title">{r.title}</h2>
        <div className="fleuron">❦</div>
      </Reveal>

      {sent ? (
        <Reveal>
          <p className="form-thanks">
            {attend === 'yes' ? r.thanksYes : r.thanksNo}
          </p>
        </Reveal>
      ) : (
        <Reveal className="center" style={{ width: '100%' }}>
          <form className="form-card" onSubmit={submit}>
            <div className="field">
              <label>{r.labelName}</label>
              <input
                type="text"
                placeholder={r.phName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>{r.labelAttend}</label>
              <div className="attend-row">
                <button
                  type="button"
                  className={`attend-btn ${attend === 'yes' ? 'sel' : ''}`}
                  onClick={() => setAttend('yes')}
                >
                  {r.yes}
                </button>
                <button
                  type="button"
                  className={`attend-btn ${attend === 'no' ? 'sel' : ''}`}
                  onClick={() => setAttend('no')}
                >
                  {r.no}
                </button>
              </div>
            </div>

            {attend === 'yes' && (
              <div className="field">
                <label>{r.labelGuests}</label>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder={r.phGuests}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            )}

            <button className="submit-btn" type="submit" disabled={!canSend}>
              {busy ? 'Отправляем…' : r.submit}
            </button>
          </form>
        </Reveal>
      )}
    </section>
  )
}
