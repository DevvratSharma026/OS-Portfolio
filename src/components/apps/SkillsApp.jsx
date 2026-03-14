import { useState, useEffect } from 'react'

const MONO   = "'JetBrains Mono', monospace"
const SANS   = "'Inter', sans-serif"
const ACCENT = '#6c8aff'

const TABS = [
  {
    id: 'backend', label: 'Backend', icon: '⚙️',
    skills: [
      { name:'Node.js',    level:88, note:'Primary runtime' },
      { name:'Express.js', level:85, note:'REST API framework' },
      { name:'REST APIs',  level:90, note:'Design & implementation' },
      { name:'MongoDB',    level:80, note:'Mongoose ODM' },
      { name:'SQL',        level:68, note:'Queries & schema design' },
    ]
  },
  {
    id: 'frontend', label: 'Frontend', icon: '🎨',
    skills: [
      { name:'ReactJS',      level:85, note:'Hooks, context, state' },
      { name:'Tailwind',   level:82, note:'Utility-first CSS' },
      { name:'JavaScript', level:88, note:'ES6+, async/await' },
      { name:'HTML/CSS',   level:90, note:'Semantic, responsive' },
    ]
  },
  {
    id: 'ai', label: 'AI/ML', icon: '🤖',
    skills: [
      { name:'AI Integration',   level:80, note:'AI integration' },
      { name:'AWS GenAI',  level:72, note:'Certified' },
      { name:'Prompt Eng', level:78, note:'RAG, chain-of-thought' },
    ]
  },
  {
    id: 'tools', label: 'Tools', icon: '🛠️',
    skills: [
      { name:'Git',        level:88, note:'Branching, PR workflow' },
      { name:'Github',     level:82, note:'Coding Library' },
      { name:'Postman',    level:80, note:'API testing & docs' },
    ]
  },
  {
    id: 'courseWork', label: 'CourseWork', icon: '💻',
    skills: [
      { name:'Data Structures & Alogrithms', level:75, note:'DSA' },
      { name:'Computer Networking', level:82, note:'CN' },
      { name:'Object Oriented Programming',    level:80, note:'OOPs' },
    ]
  },
]

function Bar({ level, color, animate }) {
  const [width, setWidth] = useState(0)
  useEffect(function() {
    if (animate) {
      const t = setTimeout(function() { setWidth(level) }, 80)
      return function() { clearTimeout(t) }
    } else {
      setWidth(0)
    }
  }, [level, animate])

  return (
    <div style={{ height:'4px', background:'rgba(255,255,255,0.07)', borderRadius:'2px', overflow:'hidden' }}>
      <div style={{
        width: width + '%', height:'100%',
        background: 'linear-gradient(90deg,' + color + ',' + color + '88)',
        borderRadius:'2px',
        transition:'width 0.7s cubic-bezier(0.34,1.1,0.64,1)',
        boxShadow:'0 0 8px ' + color + '66',
      }} />
    </div>
  )
}

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState('backend')
  const [animate,   setAnimate]   = useState(true)

  const tab = TABS.find(function(t) { return t.id === activeTab })

  function switchTab(id) {
    setAnimate(false)
    setActiveTab(id)
    setTimeout(function() { setAnimate(true) }, 30)
  }

  const COLORS = { backend:'#6c8aff', frontend:'#ff6b9d', ai:'#a78bfa', cloud:'#38bdf8', tools:'#34d399' }
  const color = COLORS[activeTab] || ACCENT

  return (
    <div className="h-full flex flex-col" style={{ background:'rgba(4,5,14,0.9)' }}>
      {/* Tab bar */}
      <div className="flex shrink-0 px-4 pt-4 gap-2" style={{ borderBottom:'0.5px solid rgba(255,255,255,0.07)' }}>
        {TABS.map(function(t) {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              onClick={function() { switchTab(t.id) }}
              className="flex items-center gap-2 px-3 py-2 rounded-t-lg"
              style={{
                fontFamily:MONO, fontSize:'11px',
                color: active ? color : 'rgba(226,228,240,0.38)',
                background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: '0.5px solid ' + (active ? color + '44' : 'transparent'),
                borderBottom: active ? '0.5px solid rgba(4,5,14,0.9)' : '0.5px solid transparent',
                cursor:'pointer', transition:'all 0.2s',
                marginBottom: active ? '-0.5px' : '0',
              }}
            >
              <span style={{fontSize:'14px'}}>{t.icon}</span>
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Skills list */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex flex-col gap-5">
          {tab.skills.map(function(sk) {
            return (
              <div key={sk.name}>
                <div className="flex justify-between items-baseline mb-2">
                  <span style={{ fontFamily:SANS, fontSize:'13px', fontWeight:500, color:'#e2e4f0' }}>
                    {sk.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(226,228,240,0.35)' }}>
                      {sk.note}
                    </span>
                    <span style={{ fontFamily:MONO, fontSize:'11px', color:color, minWidth:'32px', textAlign:'right' }}>
                      {sk.level}%
                    </span>
                  </div>
                </div>
                <Bar level={sk.level} color={color} animate={animate} />
              </div>
            )
          })}
        </div>

        {/* Cert badges */}
        <div style={{ marginTop:'28px', paddingTop:'20px', borderTop:'0.5px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(226,228,240,0.3)', marginBottom:'12px', letterSpacing:'0.08em', textTransform:'uppercase' }}>
            Certifications
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label:'IBM Data Science', color:'#006699' },
              { label:'AWS GenAI',        color:'#ff9900' },
            ].map(function(cert) {
              return (
                <div key={cert.label} style={{
                  padding:'6px 14px', borderRadius:'8px',
                  border:'0.5px solid ' + cert.color + '55',
                  background:cert.color + '11',
                  fontFamily:MONO, fontSize:'11px', color:cert.color,
                }}>
                  ✓ {cert.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
