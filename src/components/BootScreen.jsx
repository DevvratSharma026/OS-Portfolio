import { useState, useEffect } from 'react'

const MONO = "'JetBrains Mono', monospace"
const SANS = "'Inter', sans-serif"

const BOOT_LINES = [
  { text: 'PortfolioOS v1.0.0 — Devvrat Sharma', delay: 0,    color: '#6c8aff' },
  { text: 'Initializing kernel...', delay: 300,  color: 'rgba(226,228,240,0.5)' },
  { text: 'Loading window manager...', delay: 600,  color: 'rgba(226,228,240,0.5)' },
  { text: 'Mounting apps...', delay: 900,  color: 'rgba(226,228,240,0.5)' },
  { text: '  ✓ Terminal', delay: 1050, color: '#28c840' },
  { text: '  ✓ About', delay: 1150, color: '#28c840' },
  { text: '  ✓ Projects', delay: 1250, color: '#28c840' },
  { text: '  ✓ Skills', delay: 1350, color: '#28c840' },
  { text: '  ✓ Resume', delay: 1450, color: '#28c840' },
  { text: '  ✓ Contact', delay: 1550, color: '#28c840' },
  { text: 'Starting desktop environment...', delay: 1750, color: 'rgba(226,228,240,0.5)' },
  { text: 'Welcome to my Portfolio.', delay: 2100, color: '#ff6b9d' },
]

const TOTAL_BOOT = 2800

export default function BootScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress,     setProgress]     = useState(0)
  const [fadeOut,      setFadeOut]       = useState(false)

  useEffect(function() {
    const timers = BOOT_LINES.map(function(line) {
      return setTimeout(function() {
        setVisibleLines(function(prev) { return [...prev, line] })
      }, line.delay)
    })

    // Progress bar
    const start = Date.now()
    const tick = setInterval(function() {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / TOTAL_BOOT) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(tick)
    }, 30)

    // Fade out and call onDone
    const doneTimer = setTimeout(function() {
      setFadeOut(true)
      setTimeout(onDone, 600)
    }, TOTAL_BOOT)

    return function() {
      timers.forEach(clearTimeout)
      clearInterval(tick)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#04040c',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{
          fontFamily: MONO, fontSize: '11px',
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#6c8aff', marginBottom: '10px', opacity: 0.8,
        }}>
          PortfolioOS
        </div>
        {/* Simple logo mark */}
        <div style={{
          width: '48px', height: '48px', margin: '0 auto',
          border: '1.5px solid rgba(108,138,255,0.6)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
          background: 'rgba(108,138,255,0.08)',
        }}>
          {'>'}_
        </div>
      </div>

      {/* Terminal boot log */}
      <div style={{
        width: '480px', fontFamily: MONO, fontSize: '12px',
        lineHeight: '1.8', marginBottom: '36px',
        minHeight: '220px',
      }}>
        {visibleLines.map(function(line, i) {
          return (
            <div key={i} style={{ color: line.color, opacity: 0.9 }}>
              {line.text}
            </div>
          )
        })}
        {visibleLines.length < BOOT_LINES.length && (
          <span style={{ color: '#6c8aff' }}>▋</span>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        width: '480px', height: '2px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: progress + '%',
          background: 'linear-gradient(90deg, #6c8aff, #a78bfa)',
          borderRadius: '2px',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px rgba(108,138,255,0.6)',
        }} />
      </div>

      <p style={{
        fontFamily: MONO, fontSize: '10px',
        color: 'rgba(226,228,240,0.25)', marginTop: '12px',
        letterSpacing: '0.06em',
      }}>
        {Math.round(progress)}%
      </p>
    </div>
  )
}
