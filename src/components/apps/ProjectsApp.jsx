import { useState } from 'react'

const MONO   = "'JetBrains Mono', monospace"
const SANS   = "'Inter', sans-serif"
const ACCENT = '#6c8aff'

const PROJECTS = [
  {
    id: 'repolens',
    name: 'RepoLensAI',
    emoji: '🔍',
    tagline: 'AI-powered GitHub repository analyser',
    desc: 'Upload any zip file or public GitHub repo and get an intelligent breakdown of the codebase — architecture, patterns, complexity and suggestions. Built on MERN stack with Groq LLaMA-3 70B for analysis.',
    tags: ['MERN', 'AWS S3', 'Groq', 'LLaMA-3 70B', 'Multer', 'Express'],
    color: '#6c8aff',
    status: 'Shipped',
    liveLink: 'https://repolenslive.netlify.app/',
    gitLink: 'https://github.com/DevvratSharma026/RepoLens',
  },

  {
    id: 'ainotes',
    name: 'AI Notes App',
    emoji: '📝',
    tagline: 'Smart note-taking with AI summarisation',
    desc: 'A full-stack notes application with AI-powered summarisation, tagging, and search. Users can paste any content and get concise AI summaries and auto-generated tags.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI API', 'REST', 'JWT'],
    color: '#28c840',
    status: 'Shipped',
    liveLink: 'https://ai-notes-app-jet.vercel.app/',
    gitLink: 'https://github.com/DevvratSharma026/AI-Notes-App',
  },
]

function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: hovered
          ? '0.5px solid ' + project.color + '55'
          : '0.5px solid rgba(255,255,255,0.07)',
        transition: 'all 0.25s ease',
        opacity: 1,
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={function() { setHovered(true) }}
      onMouseLeave={function() { setHovered(false) }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span style={{ fontSize:'26px' }}>{project.emoji}</span>
          <div>
            <h3 style={{ fontFamily:SANS, fontSize:'15px', fontWeight:600, color:'#e2e4f0' }}>
              {project.name}
            </h3>
            <p style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(226,228,240,0.4)', marginTop:'2px' }}>
              {project.tagline}
            </p>
          </div>
        </div>
        <span style={{
          fontFamily:MONO, fontSize:'10px', padding:'3px 10px',
          borderRadius:'20px',
          background: project.status === 'Shipped' ? 'rgba(40,200,64,0.12)' : 'rgba(200,150,90,0.12)',
          color: project.status === 'Shipped' ? '#28c840' : '#c8965a',
          border: '0.5px solid currentColor',
          whiteSpace:'nowrap',
        }}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontFamily:SANS, fontSize:'12px', lineHeight:'1.7', color:'rgba(226,228,240,0.55)' }}>
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(function(tag) {
          return (
            <span key={tag} style={{
              fontFamily:MONO, fontSize:'10px', padding:'2px 8px',
              borderRadius:'4px',
              background:'rgba(255,255,255,0.04)',
              border:'0.5px solid rgba(255,255,255,0.1)',
              color:'rgba(226,228,240,0.5)',
            }}>
              {tag}
            </span>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-1">
        <button style={{
          fontFamily:MONO, fontSize:'11px', padding:'5px 14px',
          borderRadius:'6px', border:'0.5px solid rgba(108,138,255,0.4)',
          color:ACCENT, background:'transparent', cursor:'pointer',
          transition:'all 0.2s',
        }}
        onMouseEnter={function(e){ e.currentTarget.style.background='rgba(108,138,255,0.1)' }}
        onMouseLeave={function(e){ e.currentTarget.style.background='transparent' }}
        onClick={function() { window.open(project.gitLink, '_blank') }}
        >
          GitHub ↗
        </button>

        <button style={{
          fontFamily:MONO, fontSize:'11px', padding:'5px 14px',
          borderRadius:'6px', border:'0.5px solid rgba(108,138,255,0.4)',
          color:ACCENT, background:'transparent', cursor:'pointer',
          transition:'all 0.2s',
        }}
        onMouseEnter={function(e){ e.currentTarget.style.background='rgba(108,138,255,0.1)' }}
        onMouseLeave={function(e){ e.currentTarget.style.background='transparent' }}
        onClick={function() { window.open(project.liveLink, '_blank') }}
        >
          Live ↗
        </button>
      </div>
    </div>
  )
}

export default function ProjectsApp() {
  return (
    <div className="h-full overflow-y-auto p-5" style={{ background:'rgba(4,5,14,0.9)' }}>
      <div className="mb-5">
        <h2 style={{ fontFamily:SANS, fontSize:'18px', fontWeight:600, color:'#e2e4f0', marginBottom:'4px' }}>
          Projects
        </h2>
        <p style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(226,228,240,0.38)' }}>
          2 projects · Built and shipped
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {PROJECTS.map(function(proj, i) {
          return <ProjectCard key={proj.id} project={proj} idx={i} />
        })}
      </div>
    </div>
  )
}
