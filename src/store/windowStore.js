import { create } from 'zustand'

let zCounter = 100

const INITIAL_POSITIONS = {
  terminal: { x: 60,  y: 40,  w: 680, h: 440 },
  about:    { x: 140, y: 70,  w: 620, h: 500 },
  projects: { x: 100, y: 60,  w: 780, h: 540 },
  skills:   { x: 160, y: 80,  w: 660, h: 480 },
  resume:   { x: 120, y: 50,  w: 700, h: 560 },
  contact:  { x: 180, y: 90,  w: 580, h: 480 },
}

export const useWindowStore = create((set, get) => ({
  windows: {},

  openWindow: function(id, config) {
    const existing = get().windows[id]
    if (existing) {
      // Already open — restore + focus
      set(state => ({
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], minimized: false, zIndex: ++zCounter, animState: 'restoring' }
        }
      }))
      setTimeout(() => {
        set(state => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], animState: null } }
        }))
      }, 240)
      return
    }
    const pos = INITIAL_POSITIONS[id] || { x: 100 + Math.random()*80, y: 60 + Math.random()*60, w: 640, h: 480 }
    set(state => ({
      windows: {
        ...state.windows,
        [id]: {
          id,
          title:     config.title,
          icon:      config.icon,
          component: config.component,
          x: pos.x, y: pos.y, w: pos.w, h: pos.h,
          minimized: false,
          zIndex:    ++zCounter,
          animState: null,
        }
      }
    }))
  },

  closeWindow: function(id) {
    set(state => {
      const next = { ...state.windows }
      delete next[id]
      return { windows: next }
    })
  },

  minimizeWindow: function(id) {
    set(state => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], minimized: true, animState: 'minimizing' } }
    }))
    setTimeout(() => {
      set(state => ({
        windows: { ...state.windows, [id]: { ...state.windows[id], animState: null } }
      }))
    }, 240)
  },

  restoreWindow: function(id) {
    set(state => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], minimized: false, zIndex: ++zCounter, animState: 'restoring' }
      }
    }))
    setTimeout(() => {
      set(state => ({
        windows: { ...state.windows, [id]: { ...state.windows[id], animState: null } }
      }))
    }, 240)
  },

  focusWindow: function(id) {
    set(state => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: ++zCounter } }
    }))
  },

  moveWindow: function(id, x, y) {
    set(state => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], x, y } }
    }))
  },

  resizeWindow: function(id, w, h) {
    set(state => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], w, h } }
    }))
  },
}))
