import { useState, useEffect, useCallback, useRef } from 'react'

const MONO = "'JetBrains Mono', monospace"
const SANS = "'Inter', sans-serif"

// Singleton toast emitter
const listeners = []
export function toast(message, type) {
  listeners.forEach(function(fn) { fn(message, type || 'info') })
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])
  const counterRef = useRef(0)

  useEffect(function() {
    function handler(message, type) {
      const id = ++counterRef.current
      setToasts(function(prev) { return [...prev, { id, message, type, exiting: false }] })
      setTimeout(function() {
        setToasts(function(prev) {
          return prev.map(function(t) { return t.id === id ? { ...t, exiting: true } : t })
        })
        setTimeout(function() {
          setToasts(function(prev) { return prev.filter(function(t) { return t.id !== id }) })
        }, 350)
      }, 3000)
    }
    listeners.push(handler)
    return function() {
      const idx = listeners.indexOf(handler)
      if (idx !== -1) listeners.splice(idx, 1)
    }
  }, [])

  if (!toasts.length) return null

  return (
    <div style={{
      position: 'fixed', top: '18px', right: '18px',
      zIndex: 99997, display: 'flex', flexDirection: 'column', gap: '8px',
      pointerEvents: 'none',
    }}>
      {toasts.map(function(t) {
        const color = t.type === 'success' ? '#28c840'
                    : t.type === 'error'   ? '#ff5f57'
                    : '#6c8aff'
        return (
          <div key={t.id} style={{
            background: 'rgba(13,14,26,0.96)',
            backdropFilter: 'blur(20px)',
            border: '0.5px solid ' + color + '55',
            borderRadius: '10px',
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            opacity: t.exiting ? 0 : 1,
            transform: t.exiting ? 'translateX(20px)' : 'translateX(0)',
            transition: 'all 0.35s ease',
            pointerEvents: 'auto',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0, boxShadow: '0 0 6px ' + color }} />
            <span style={{ fontFamily: MONO, fontSize: '12px', color: 'rgba(226,228,240,0.85)' }}>
              {t.message}
            </span>
          </div>
        )
      })}
    </div>
  )
}
