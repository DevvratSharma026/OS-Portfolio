import { useState, useRef, useEffect, useCallback } from 'react'
import { useWindowStore } from '../../store/windowStore'
import AboutApp    from './AboutApp'
import ProjectsApp from './ProjectsApp'
import SkillsApp   from './SkillsApp'
import ResumeApp   from './ResumeApp'
import ContactApp  from './ContactApp'

const MONO = "'JetBrains Mono', 'Courier New', monospace"

const PROMPT = <span>
  <span style={{color:'#6c8aff'}}>devvrat</span>
  <span style={{color:'rgba(226,228,240,0.4)'}}>@</span>
  <span style={{color:'#28c840'}}>portfolioOS</span>
  <span style={{color:'rgba(226,228,240,0.4)'}}>:~$ </span>
</span>

const NEOFETCH = `
    ██████╗ ███████╗██╗   ██╗██╗   ██╗██████╗  █████╗ ████████╗
    ██╔══██╗██╔════╝██║   ██║██║   ██║██╔══██╗██╔══██╗╚══██╔══╝
    ██║  ██║█████╗  ██║   ██║██║   ██║██████╔╝███████║   ██║   
    ██║  ██║██╔══╝  ╚██╗ ██╔╝╚██╗ ██╔╝██╔══██╗██╔══██║   ██║   
    ██████╔╝███████╗ ╚████╔╝  ╚████╔╝ ██║  ██║██║  ██║   ██║   
    ╚═════╝ ╚══════╝  ╚═══╝    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  

    OS:        PortfolioOS 1.0.0
    Host:      Devvrat Sharma's Brain
    Kernel:    react-18.3.1
    Shell:     devsh 2.0
    Resolution: 1920×1080
    WM:        WindowManager.js
    Terminal:  TerminalApp.jsx
    CPU:       Curiosity × 8 cores
    Memory:    ∞ MB / ∞ MB
    Uptime:    Since 2021`

const COMMANDS = {
  help: function() {
    return [
      { type:'accent', text:'Available commands:' },
      { type:'dim',    text:'  whoami       — who am I?' },
      { type:'dim',    text:'  ls           — list files' },
      { type:'dim',    text:'  cat resume.txt — print resume' },
      { type:'dim',    text:'  skills       — list skills' },
      { type:'dim',    text:'  neofetch     — system info' },
      { type:'dim',    text:'  open <app>   — open app window' },
      { type:'dim',    text:'  clear        — clear terminal' },
      { type:'dim',    text:'  help         — this menu' },
    ]
  },
  whoami: function() {
    return [
      { type:'accent', text:'Devvrat Sharma' },
      { type:'text',   text:'Role      → Software Engineer' },
      { type:'text',   text:'Location  → New Delhi, India' },
      { type:'text',   text:'Education → B.Tech IT, GGSIPU' },
      { type:'text',   text:'Focus     → Backend · AI · Full-stack' },
      { type:'dim',    text:'Certified → IBM Data Science · AWS GenAI' },
    ]
  },
  ls: function() {
    return [
      { type:'accent', text:'drwxr-xr-x  projects/' },
      { type:'text',   text:'-rw-r--r--  resume.txt' },
      { type:'text',   text:'-rw-r--r--  skills.json' },
      { type:'text',   text:'-rw-r--r--  about.md' },
      { type:'dim',    text:'-rwxr-xr-x  contact.sh' },
    ]
  },
  'cat resume.txt': function() {
    return [
      { type:'accent', text:'=== DEVVRAT SHARMA — RESUME ===' },
      { type:'text',   text:'Education: B.Tech IT · GGSIPU · 2021–2025' },
      { type:'text',   text:'' },
      { type:'accent', text:'Experience:' },
      { type:'text',   text:'  → IBM        Data Science Apprenticeship (Certified)' },
      { type:'text',   text:'  → BlueStocks    Frontend Developer Intern' },
      { type:'dim',    text:'  → AWS        Generative AI Certified' },
      { type:'text',   text:'' },
      { type:'accent', text:'Projects:' },
      { type:'text',   text:'  → RepoLensAI      MERN · AWS S3 · Groq LLaMA-3 70B' },
      { type:'dim',    text:'  → AI Notes App    Full-stack AI integration' },
    ]
  },
  skills: function() {
    return [
      { type:'accent', text:'skills.json' },
      { type:'text',   text:'  backend:  Node.js, ExpressJS, REST APIs' },
      { type:'text',   text:'  frontend: React, JavaScript, Tailwind CSS' },
      { type:'text',   text:'  ai/ml:    AI Integration, AWS GenAI' },
      { type:'dim',    text:'  database: MongoDB, SQL, Mongoose' },
      { type:'dim',    text:'  tools:    Git, Postman, GitHub' },
    ]
  },
  neofetch: function() {
    return NEOFETCH.split('\n').map(function(line) {
      return { type: line.includes('OS:') || line.includes('Shell:') ? 'accent' : 'text', text: line }
    })
  },
}

function processCommand(raw, openWindow) {
  const cmd = raw.trim().toLowerCase()
  if (!cmd) return []
  if (cmd === 'clear') return '__clear__'
  if (COMMANDS[cmd]) return COMMANDS[cmd]()
  if (cmd.startsWith('open ')) {
    const app = cmd.slice(5).trim()
    const MAP = {
      about:    { title:'About Me',  icon:'👤', component: AboutApp },
      projects: { title:'Projects',  icon:'📁', component: ProjectsApp },
      skills:   { title:'Skills',    icon:'⚡', component: SkillsApp },
      resume:   { title:'Resume',    icon:'📄', component: ResumeApp },
      contact:  { title:'Contact',   icon:'✉️', component: ContactApp },
    }
    if (MAP[app]) {
      openWindow(app, MAP[app])
      return [{ type:'accent', text:'Opening ' + app + '...' }]
    }
    return [{ type:'err', text:'open: unknown app "' + app + '". Try: about, projects, skills, resume, contact' }]
  }
  return [{ type:'err', text:'command not found: ' + raw + '. Type "help" for commands.' }]
}

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { type:'accent', text:'PortfolioOS Terminal v2.0.0' },
    { type:'dim',    text:'Type "help" for available commands.' },
    { type:'text',   text:'' },
  ])
  const [input,   setInput]   = useState('')
  const [cmdHist, setCmdHist] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef  = useRef(null)
  const bottomRef = useRef(null)
  const openWindow = useWindowStore(function(s) { return s.openWindow })

  useEffect(function() {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [history])

  useEffect(function() {
    inputRef.current?.focus()
  }, [])

  const submit = useCallback(function() {
    const raw = input.trim()
    const result = processCommand(raw, openWindow)
    if (result === '__clear__') {
      setHistory([])
      setInput('')
      setHistIdx(-1)
      return
    }
    setHistory(function(prev) {
      return [...prev, { type:'prompt', text: raw }].concat(result)
    })
    if (raw) {
      setCmdHist(function(prev) { return [raw, ...prev] })
    }
    setInput('')
    setHistIdx(-1)
  }, [input, openWindow])

  function onKey(e) {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHist.length - 1)
      setHistIdx(next)
      setInput(cmdHist[next] || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : cmdHist[next])
    }
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  function colorForType(type) {
    if (type === 'accent') return '#6c8aff'
    if (type === 'dim')    return 'rgba(226,228,240,0.4)'
    if (type === 'err')    return '#ff6b9d'
    return '#e2e4f0'
  }

  return (
    <div
      className="h-full flex flex-col p-4 overflow-hidden"
      style={{ background:'rgba(4,5,14,0.95)', fontFamily: MONO }}
      onClick={function() { inputRef.current?.focus() }}
    >
      {/* Output */}
      <div className="flex-1 overflow-y-auto" style={{ fontSize:'13px', lineHeight:'1.7' }}>
        {history.map(function(line, i) {
          if (line.type === 'prompt') {
            return (
              <div key={i} className="flex gap-1">
                {PROMPT}
                <span style={{ color:'#e2e4f0' }}>{line.text}</span>
              </div>
            )
          }
          return (
            <div key={i} style={{ color: colorForType(line.type), whiteSpace:'pre' }}>
              {line.text}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-1 mt-2 shrink-0" style={{ fontSize:'13px' }}>
        {PROMPT}
        <input
          ref={inputRef}
          value={input}
          onChange={function(e) { setInput(e.target.value) }}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none"
          style={{ color:'#e2e4f0', fontFamily: MONO, fontSize:'13px', caretColor:'#6c8aff' }}
          spellCheck={false}
          autoComplete="off"
        />
        <span className="cursor-blink" style={{ color:'#6c8aff', fontSize:'14px' }}>▋</span>
      </div>
    </div>
  )
}
