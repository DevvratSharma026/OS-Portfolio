import { useWindowStore } from '../store/windowStore'
import { useClock } from '../hooks/useClock'

const MONO = "'JetBrains Mono', monospace"
const SANS = "'Inter', sans-serif"

// App launcher dock icon
function DockIcon({ app, onClick, hasWindow, isMinimized }) {
  return (
    <button
      onClick={function() { onClick(app.id, app) }}
      title={app.title}
      style={{
        position: 'relative',
        width: '38px', height: '38px',
        background: hasWindow ? 'rgba(108,138,255,0.12)' : 'rgba(255,255,255,0.05)',
        border: '0.5px solid ' + (hasWindow ? 'rgba(108,138,255,0.3)' : 'rgba(255,255,255,0.08)'),
        borderRadius: '10px',
        cursor: 'pointer', fontSize: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s ease',
        flexShrink: 0,
      }}
      onMouseEnter={function(e) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform  = 'scale(1.1)'
      }}
      onMouseLeave={function(e) {
        e.currentTarget.style.background = hasWindow ? 'rgba(108,138,255,0.12)' : 'rgba(255,255,255,0.05)'
        e.currentTarget.style.transform  = 'scale(1)'
      }}
    >
      {app.icon}
      {/* Active indicator dot */}
      {hasWindow && (
        <span style={{
          position: 'absolute', bottom: '2px', left: '50%',
          transform: 'translateX(-50%)',
          width: '3px', height: '3px', borderRadius: '50%',
          background: isMinimized ? 'rgba(108,138,255,0.5)' : '#6c8aff',
          boxShadow: isMinimized ? 'none' : '0 0 4px #6c8aff',
        }} />
      )}
    </button>
  )
}

// Open window tab
function WindowTab({ win, onClick }) {
  return (
    <button
      onClick={function() { onClick(win.id) }}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '5px 12px', borderRadius: '7px',
        background: win.minimized ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
        border: '0.5px solid ' + (win.minimized ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)'),
        cursor: 'pointer', whiteSpace: 'nowrap',
        fontFamily: MONO, fontSize: '11px',
        color: win.minimized ? 'rgba(226,228,240,0.35)' : 'rgba(226,228,240,0.78)',
        transition: 'all 0.15s',
        maxWidth: '140px',
      }}
      onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
      onMouseLeave={function(e) { e.currentTarget.style.background = win.minimized ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)' }}
    >
      <span style={{ fontSize: '13px', flexShrink: 0 }}>{win.icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
      {!win.minimized && (
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6c8aff', flexShrink: 0 }} />
      )}
    </button>
  )
}

export default function Taskbar({ apps, onOpenApp }) {
  const { windows, restoreWindow, focusWindow, minimizeWindow } = useWindowStore()
  const winList = Object.values(windows)
  const time = useClock()

  // Map of open window ids
  const openIds = {}
  winList.forEach(function(w) { openIds[w.id] = w })

  function handleWindowTab(id) {
    const win = openIds[id]
    if (!win) return
    if (win.minimized) restoreWindow(id)
    else focusWindow(id)
  }

  return (
    <div
      className="taskbar-glass absolute bottom-0 left-0 right-0"
      style={{
        height: '52px', zIndex: 9999,
        display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: '0',
      }}
    >
      {/* ── Left: dock icons ──────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {apps.map(function(app) {
          const winEntry = openIds[app.id]
          return (
            <DockIcon
              key={app.id}
              app={app}
              hasWindow={!!winEntry}
              isMinimized={winEntry && winEntry.minimized}
              onClick={onOpenApp}
            />
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ width: '0.5px', height: '22px', background: 'rgba(255,255,255,0.08)', margin: '0 10px', flexShrink: 0 }} />

      {/* ── Center: open window tabs ───────────────────── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
        {winList.map(function(win) {
          return <WindowTab key={win.id} win={win} onClick={handleWindowTab} />
        })}
      </div>

      {/* ── Right: system tray ────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        {/* Wifi mock */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ opacity: 0.4 }}>
          <path d="M8 10.5a1 1 0 100-2 1 1 0 000 2z" fill="rgba(226,228,240,0.8)"/>
          <path d="M5 8C5.8 7.1 6.8 6.5 8 6.5s2.2.6 3 1.5" stroke="rgba(226,228,240,0.8)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M2.5 5.5C4 4 5.9 3 8 3s4 1 5.5 2.5" stroke="rgba(226,228,240,0.8)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>

        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ position: 'relative', width: '22px', height: '11px' }}>
            <div style={{
              position: 'absolute', inset: 0,
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: '2px',
              padding: '1.5px',
              display: 'flex', alignItems: 'stretch',
            }}>
              <div style={{ width: '76%', background: '#28c840', borderRadius: '1px' }} />
            </div>
            <div style={{
              position: 'absolute', right: '-4px', top: '50%',
              transform: 'translateY(-50%)',
              width: '3px', height: '6px',
              background: 'rgba(255,255,255,0.2)', borderRadius: '0 1px 1px 0',
            }} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(226,228,240,0.35)' }}>
            87%
          </span>
        </div>

        {/* Clock */}
        <span style={{
          fontFamily: MONO, fontSize: '12px',
          color: 'rgba(226,228,240,0.65)',
          letterSpacing: '0.04em', minWidth: '70px',
          textAlign: 'right',
        }}>
          {time}
        </span>
      </div>
    </div>
  )
}
