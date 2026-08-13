import { data } from '../data'
import Reveal from './Reveal'
import Stamp from './Stamp'
import Countdown from './Countdown'

export default function Venue() {
  const v = data.venue
  const ed = v.eventDate
  return (
    <section className="pad center">
      {/* күн блогы (ай · апта күні · сан · уақыт · жыл) */}
      <Reveal className="event-date">
        <div className="event-date__month">{ed.label}</div>
        <div className="event-date__row">
          <span className="event-date__rule" />
          <span className="event-date__side">{ed.fullDate}</span>
          <span className="event-date__rule" />
        </div>
        <div className="event-date__year">{ed.timeLabel}</div>
      </Reveal>

      <Reveal>
        <div className="pre">{v.pre}</div>
        <div className="fleuron">❦</div>
      </Reveal>

      <Reveal className="venue-stamp">
        <Stamp postmark={{ label: v.stampLabel, style: { right: '-18px', top: '-22px' } }}>
          <div className="center">
            <h2 className="venue-name">{v.name}</h2>
            {v.address.map((a, i) => (
              <p className="venue-addr" key={i}>{a}</p>
            ))}
            <a className="venue-link" href={v.mapLink} target="_blank" rel="noreferrer">
              2GIS картасынан қарау
            </a>

            <div className="map-frame">
              <iframe src={v.mapEmbed} title={v.name} loading="lazy" allowFullScreen />
            </div>
          </div>
        </Stamp>
      </Reveal>

      {/* карта астындағы кері санақ */}
      <Reveal>
        <Countdown />
      </Reveal>
    </section>
  )
}
