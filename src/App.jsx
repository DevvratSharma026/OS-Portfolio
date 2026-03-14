import { useState, useCallback } from 'react'
import { useWindowStore } from './store/windowStore'
import Desktop      from './components/Desktop'
import Taskbar      from './components/Taskbar'
import Window       from './components/Window'
import BootScreen   from './components/BootScreen'
import ToastContainer, { toast } from './components/Toast'
import TerminalApp  from './components/apps/TerminalApp'
import AboutApp     from './components/apps/AboutApp'
import ProjectsApp  from './components/apps/ProjectsApp'
import SkillsApp    from './components/apps/SkillsApp'
import ResumeApp    from './components/apps/ResumeApp'
import ContactApp   from './components/apps/ContactApp'
import './index.css'

const APPS = [
  { id: 'terminal', title: 'Terminal',   icon: '>_', component: TerminalApp },
  { id: 'about',    title: 'About Me',   icon: '👤', component: AboutApp    },
  { id: 'projects', title: 'Projects',   icon: '📁', component: ProjectsApp },
  { id: 'skills',   title: 'Skills',     icon: '⚡', component: SkillsApp   },
  { id: 'resume',   title: 'Resume',     icon: '📄', component: ResumeApp   },
  { id: 'contact',  title: 'Contact',    icon: '✉️', component: ContactApp  },
]

export default function App() {
  const [booted, setBooted]   = useState(false)
  const { windows, openWindow } = useWindowStore()
  const windowList = Object.values(windows)

  const handleOpenApp = useCallback(function(id, app) {
    openWindow(id, { title: app.title, icon: app.icon, component: app.component })
    toast('Opened ' + app.title, 'info')
  }, [openWindow])

  const handleBoot = useCallback(function() {
    setBooted(true)
    setTimeout(function() {
      toast('Welcome to PortfolioOS, Devvrat!', 'success')
    }, 400)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#06070f' }}>

      {/* Boot sequence */}
      {!booted && <BootScreen onDone={handleBoot} />}

      {/* Desktop */}
      <Desktop apps={APPS} onOpenApp={handleOpenApp} />

      {/* Windows — sorted by zIndex so highest renders last */}
      {windowList
        .slice()
        .sort(function(a, b) { return a.zIndex - b.zIndex })
        .map(function(win) {
          return <Window key={win.id} win={win} />
        })
      }

      {/* Taskbar */}
      <Taskbar apps={APPS} onOpenApp={handleOpenApp} />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
}
