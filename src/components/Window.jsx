import { useRef, useCallback, useState, useEffect } from 'react'
import { useWindowStore } from '../store/windowStore'

const MIN_W = 320
const MIN_H = 240

export default function Window({ win }) {
  const { closeWindow, minimizeWindow, focusWindow, moveWindow, resizeWindow } = useWindowStore()
  const [mounted, setMounted] = useState(false)

  // Entry animation
  useEffect(function() {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { setMounted(true) })
    })
  }, [])

  const isHidden = win.minimized && win.animState !== 'minimizing'

  // ── Drag title bar ───────────────────────────────────────────
  const onTitleMouseDown = useCallback(function(e) {
    if (e.target.closest('.traffic-btn')) return
    e.preventDefault()
    focusWindow(win.id)

    const startX = e.clientX - win.x
    const startY = e.clientY - win.y

    function onMove(e2) {
      const nx = Math.max(0, e2.clientX - startX)
      const ny = Math.max(0, e2.clientY - startY)
      moveWindow(win.id, nx, ny)
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [win.id, win.x, win.y, focusWindow, moveWindow])

  // ── Resize corner ────────────────────────────────────────────
  const onResizeMouseDown = useCallback(function(e) {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = win.w
    const startH = win.h

    function onMove(e2) {
      const nw = Math.max(MIN_W, startW + (e2.clientX - startX))
      const nh = Math.max(MIN_H, startH + (e2.clientY - startY))
      resizeWindow(win.id, nw, nh)
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [win.id, win.w, win.h, resizeWindow])

  const AppComponent = win.component

  // Compute transform for animations
  let transform = 'scale(1) translateY(0)'
  let opacity = mounted ? 1 : 0
  if (!mounted) transform = 'scale(0.94) translateY(10px)'
  if (win.animState === 'minimizing') { transform = 'scale(0.1) translateY(300px)'; opacity = 0 }
  if (win.animState === 'restoring')  { transform = 'scale(1) translateY(0)'; opacity = 1 }

  return (
    <div
      className="glass absolute rounded-xl overflow-hidden flex flex-col"
      style={{
        left: win.x, top: win.y,
        width: win.w, height: win.h,
        zIndex: win.zIndex,
        display: isHidden ? 'none' : 'flex',
        opacity,
        transform,
        transition: win.animState
          ? 'transform 0.22s ease, opacity 0.22s ease'
          : 'transform 0.2s cubic-bezier(0.34,1.3,0.64,1), opacity 0.2s ease',
        boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.06)',
        willChange: 'transform, opacity',
      }}
      onMouseDown={function() { focusWindow(win.id) }}
    >
      {/* ── Title bar ─────────────────────────────────────── */}
      <div
        className="flex items-center shrink-0 px-4 gap-3 cursor-default select-none"
        style={{
          height: '44px',
          background: 'rgba(255,255,255,0.025)',
          borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        }}
        onMouseDown={onTitleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[6px]">
          {[
            { cls: 'traffic-red',    sym: '×', fn: function() { closeWindow(win.id) } },
            { cls: 'traffic-yellow', sym: '−', fn: function() { minimizeWindow(win.id) } },
            { cls: 'traffic-green',  sym: '+', fn: function() {} },
          ].map(function(btn) {
            return (
              <button
                key={btn.cls}
                className={'traffic-btn ' + btn.cls + ' group'}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
                onClick={btn.fn}
                onMouseDown={function(e) { e.stopPropagation() }}
              >
                <span style={{
                  fontSize: '8px', fontWeight: 700, color: 'rgba(0,0,0,0.55)',
                  opacity: 0, lineHeight: 1, display: 'block',
                  transition: 'opacity 0.1s',
                }}
                className="group-hover:opacity-100"
                >
                  {btn.sym}
                </span>
              </button>
            )
          })}
        </div>

        {/* Title center */}
        <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
          <span style={{ fontSize: '14px', lineHeight: 1 }}>{win.icon}</span>
          <span style={{
            fontSize: '12px', fontWeight: 500,
            color: 'rgba(226,228,240,0.6)',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.015em',
          }}>
            {win.title}
          </span>
        </div>

        {/* Spacer to balance traffic lights */}
        <div style={{ width: '54px', flexShrink: 0 }} />
      </div>

      {/* ── App content ───────────────────────────────────── */}
      <div className="flex-1 overflow-hidden relative">
        <AppComponent />
      </div>

      {/* ── Resize handle ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '20px', height: '20px',
          cursor: 'se-resize', zIndex: 10,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
          padding: '3px',
        }}
        onMouseDown={onResizeMouseDown}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 9L9 2M5.5 9L9 5.5M9 9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
