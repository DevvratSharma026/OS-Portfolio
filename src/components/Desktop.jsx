import { useState, useEffect, useMemo } from 'react'
import DesktopClock from './DesktopClock'
import TypeIntro from "./apps/TypeText"
import AuroraBackground from "./apps/AuroraBackground"

const SANS = "'Inter', sans-serif"
const MONO = "'JetBrains Mono', monospace"

// Generate star field as box-shadow on a tiny element
function StarField() {
  const shadow = useMemo(function() {
    const stars = []
    for (let i = 0; i < 260; i++) {
      const x = Math.floor(Math.random() * window.innerWidth)
      const y = Math.floor(Math.random() * window.innerHeight)
      const size  = Math.random() < 0.12 ? 1.5 : 1
      const alpha = (0.15 + Math.random() * 0.65).toFixed(2)
      stars.push(x + 'px ' + y + 'px 0 ' + (size - 1) + 'px rgba(255,255,255,' + alpha + ')')
    }
    return stars.join(',')
  }, [])

  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '1px', height: '1px',
        boxShadow: shadow,
        borderRadius: '50%',
      }} />
    </div>
  )
}

// Nebula glows
function NebulaLayer() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `
        radial-gradient(ellipse 55% 40% at 15% 50%, rgba(26,16,64,0.7) 0%, transparent 100%),
        radial-gradient(ellipse 45% 50% at 82% 20%, rgba(13,32,64,0.6) 0%, transparent 100%),
        radial-gradient(ellipse 40% 35% at 65% 85%, rgba(26,8,48,0.5) 0%, transparent 100%),
        radial-gradient(ellipse 30% 30% at 45% 45%, rgba(10,20,68,0.4) 0%, transparent 100%)
      `,
    }} />
  )
}

function DesktopIcon({ app, onDoubleClick, selected, onSelect }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="flex flex-col items-center gap-[6px] cursor-default select-none"
      style={{ width: '72px' }}
      onClick={function(e) { e.stopPropagation(); onSelect(app.id) }}
      onDoubleClick={function() { onDoubleClick(app.id, app) }}
      onMouseEnter={function() { setHover(true) }}
      onMouseLeave={function() { setHover(false) }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '26px',
        background: selected
          ? 'rgba(108,138,255,0.25)'
          : hover
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0.06)',
        border: selected
          ? '1px solid rgba(108,138,255,0.6)'
          : '0.5px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.18s ease',
        transform: hover && !selected ? 'scale(1.08)' : 'scale(1)',
        boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.4)' : 'none',
      }}>
        {app.icon}
      </div>
      <span style={{
        fontFamily: SANS, fontSize: '11px', fontWeight: 400,
        color: 'rgba(226,228,240,0.92)',
        textShadow: '0 1px 6px rgba(0,0,0,0.9)',
        background: selected ? 'rgba(108,138,255,0.35)' : 'transparent',
        borderRadius: '3px', padding: '1px 5px',
        textAlign: 'center', lineHeight: '1.3',
        transition: 'background 0.15s',
      }}>
        {app.title}
      </span>
    </div>
  )
}

function ContextMenu({ x, y, onClose, onOpenTerminal }) {
  useEffect(function() {
    function hide() { onClose() }
    window.addEventListener('click', hide)
    return function() { window.removeEventListener('click', hide) }
  }, [onClose])

  const items = [
    { label: 'Open Terminal', icon: '>_', action: onOpenTerminal },
    { label: 'Refresh Desktop', icon: '↺', action: onClose },
    null,
    { label: 'About PortfolioOS', icon: 'ℹ', action: onClose },
  ]

  return (
    <div
      style={{
        position: 'fixed', left: x, top: y, zIndex: 99998,
        background: 'rgba(12,13,24,0.97)',
        backdropFilter: 'blur(24px)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', padding: '5px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        minWidth: '190px',
      }}
      onClick={function(e) { e.stopPropagation() }}
    >
      {items.map(function(item, i) {
        if (!item) return (
          <div key={i} style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', margin: '4px 10px' }} />
        )
        return (
          <button
            key={i}
            onClick={function() { item.action(); onClose() }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '8px 12px',
              textAlign: 'left', background: 'transparent', border: 'none',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: SANS, fontSize: '12px',
              color: 'rgba(226,228,240,0.75)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={function(e) {
              e.currentTarget.style.background = 'rgba(108,138,255,0.15)'
              e.currentTarget.style.color = '#e2e4f0'
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'rgba(226,228,240,0.75)'
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: '12px', width: '16px', textAlign: 'center', color: '#6c8aff' }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default function Desktop({ apps, onOpenApp }) {
  const [selected, setSelected] = useState(null)
  const [ctxMenu,  setCtxMenu]  = useState(null)

  const terminalApp = apps.find(function(a) { return a.id === 'terminal' })

  function onContextMenu(e) {
    e.preventDefault()
    setCtxMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="absolute inset-0"
      style={{ background: '#06070f', overflow: 'hidden' }}
      onClick={function() { setSelected(null); setCtxMenu(null) }}
      onContextMenu={onContextMenu}
    >
      <NebulaLayer />
      <AuroraBackground />
      <StarField />

      <TypeIntro />

      {/* Desktop clock top-left */}
      <DesktopClock />

      {/* Icon column — top right, above taskbar */}
      <div style={{
        position: 'absolute', top: '24px', right: '20px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        paddingBottom: '68px',
      }}>
        {apps.map(function(app) {
          return (
            <DesktopIcon
              key={app.id}
              app={app}
              selected={selected === app.id}
              onSelect={setSelected}
              onDoubleClick={onOpenApp}
            />
          )
        })}
      </div>

      {/* Subtle center hint */}
      <div style={{
        position: 'absolute', bottom: '72px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: MONO, fontSize: '10px',
        color: 'rgba(226,228,240,0.1)',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        Double-click icon to open · Right-click for menu
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x} y={ctxMenu.y}
          onClose={function() { setCtxMenu(null) }}
          onOpenTerminal={function() {
            if (terminalApp) onOpenApp('terminal', terminalApp)
          }}
        />
      )}
    </div>
  )
}
