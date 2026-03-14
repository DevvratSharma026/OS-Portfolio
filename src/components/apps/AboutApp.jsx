import { useState, useEffect } from 'react'

const MONO    = "'JetBrains Mono', monospace"
const SANS    = "'Inter', sans-serif"
const ACCENT  = '#6c8aff'
const ACCENT2 = '#ff6b9d'

const LINES = [
  { label: 'name',      value: 'Devvrat Sharma' },
  { label: 'role',      value: 'AI Full Stack Developer' },
  { label: 'location',  value: 'New Delhi, India' },
  { label: 'education', value: 'B.Tech IT · GGSIPU · 2021–2025' },
  { label: 'certified', value: 'IBM Data Science · AWS GenAI' },
  { label: 'focus',     value: 'Backend · AI · Full-stack' },
]

const BIO = [
  "I'm a AI FullStack Developer from New Delhi who obsesses over two things equally — systems that scale and interfaces that feel alive. I build full-stack products where the backend is tight, the AI is actually useful, and the frontend makes people stop scrolling.",

"At IBM, I went deep on data science — pipelines, models, and the messy reality of production data. I left with a certification and a healthy respect for how hard \"simple\" insights are to extract. At a fintech startup, I shipped customer-facing React features under real deadlines, real traffic, and a real PM who had opinions.",

"My recent work lives at the intersection of LLMs and developer tooling. RepoLensAI lets you drop a GitHub repository and get an intelligent breakdown of the entire codebase — powered by Groq's LLaMA-3 70B. It's the tool I wished existed when I was reading someone else's spaghetti code at 2am.",

"Currently looking for a team that ships fast, argues about architecture, and actually uses the things they build. If that's you — let's talk.",
]

function TypedLine({ text, delay }) {
  const [shown, setShown] = useState('')
  useEffect(function() {
    const t = setTimeout(function() {
      let i = 0
      const id = setInterval(function() {
        setShown(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(id)
      }, 22)
      return function() { clearInterval(id) }
    }, delay)
    return function() { clearTimeout(t) }
  }, [text, delay])
  return <span>{shown}</span>
}

export default function AboutApp() {
  const [phase, setPhase] = useState(0)

  useEffect(function() {
    const t = setTimeout(function() { setPhase(1) }, LINES.length * 120 + 400)
    return function() { clearTimeout(t) }
  }, [])

  return (
    <div className="h-full overflow-y-auto p-6" style={{ background:'rgba(4,5,14,0.9)' }}>

      {/* Avatar + name */}
      <div className="flex items-center gap-5 mb-8">
        <div className="shrink-0 flex items-center justify-center rounded-full font-bold"
          style={{
            width:'72px', height:'72px',
            background: 'linear-gradient(135deg, #6c8aff22, #ff6b9d22)',
            border: '1.5px solid rgba(108,138,255,0.4)',
            fontSize:'22px', color: ACCENT, fontFamily: MONO,
          }}>
          DS
        </div>
        <div>
          <h1 style={{ fontFamily:SANS, fontSize:'22px', fontWeight:600, color:'#e2e4f0' }}>
            Devvrat Sharma
          </h1>
          <p style={{ fontFamily:MONO, fontSize:'12px', color:'rgba(226,228,240,0.45)', marginTop:'3px' }}>
            AI Fullstack Developer · New Delhi
          </p>
          <div className="flex gap-2 mt-2">
            {['React','Node.js','GenAI','ExpressJS','MongoDB'].map(function(tag) {
              return (
                <span key={tag} style={{
                  fontFamily:MONO, fontSize:'10px', padding:'2px 8px',
                  border:'0.5px solid rgba(108,138,255,0.4)',
                  borderRadius:'4px', color:ACCENT,
                }}>{tag}</span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Typed info lines */}
      <div className="mb-8" style={{ fontFamily:MONO, fontSize:'13px' }}>
        {LINES.map(function(line, i) {
          return (
            <div key={i} className="flex gap-3 mb-1">
              <span style={{ color:'rgba(226,228,240,0.35)', minWidth:'80px' }}>{line.label}</span>
              <span style={{ color:'rgba(226,228,240,0.2)' }}>→</span>
              <span style={{ color:'#e2e4f0' }}>
                <TypedLine text={line.value} delay={i * 120} />
              </span>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ height:'0.5px', background:'rgba(255,255,255,0.07)', marginBottom:'24px' }} />

      {/* Bio paragraphs */}
      <div style={{ fontFamily:SANS, fontSize:'13px', lineHeight:'1.8', color:'rgba(226,228,240,0.65)' }}>
        {BIO.map(function(para, i) {
          return (
            <p key={i} style={{
              marginBottom:'14px',
              opacity: phase === 1 ? 1 : 0,
              transform: phase === 1 ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.5s ease ' + (i*0.1) + 's, transform 0.5s ease ' + (i*0.1) + 's',
            }}>
              {para}
            </p>
          )
        })}
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 mt-4">
        <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#28c840', display:'inline-block', boxShadow:'0 0 6px #28c840' }} />
        <span style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(226,228,240,0.5)' }}>
          Open to opportunities
        </span>
      </div>
    </div>
  )
}
