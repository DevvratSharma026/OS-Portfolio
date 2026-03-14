import { useState, useEffect } from 'react'

export function useClock() {
  const [time, setTime] = useState('')

  useEffect(function() {
    function tick() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      setTime(h + ':' + m + ':' + s)
    }
    tick()
    const id = setInterval(tick, 1000)
    return function() { clearInterval(id) }
  }, [])

  return time
}
