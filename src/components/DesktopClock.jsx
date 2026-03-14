import { useClock } from '../hooks/useClock'

const MONO    = "'JetBrains Mono', monospace"
const DISPLAY = "'Inter', sans-serif"

export default function DesktopClock() {
  const time = useClock()
  const now  = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <div style={{
      position: 'absolute',
      top: '32px', left: '32px',
      pointerEvents: 'none', userSelect: 'none',
    }}>
      {/* Time */}
      <div style={{
        fontFamily: MONO,
        fontSize: 'clamp(42px, 4vw, 58px)',
        fontWeight: 300,
        color: 'rgba(226,228,240,0.85)',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        marginBottom: '6px',
        textShadow: '0 2px 20px rgba(0,0,0,0.6)',
      }}>
        {time}
      </div>
      {/* Date */}
      <div style={{
        fontFamily: DISPLAY,
        fontSize: '13px',
        color: 'rgba(226,228,240,0.35)',
        fontWeight: 400,
        letterSpacing: '0.03em',
      }}>
        {dateStr}
      </div>
    </div>
  )
}
