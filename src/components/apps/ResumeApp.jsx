// ResumeApp.jsx
import React from 'react'

const MONO = "'JetBrains Mono', monospace"
const SANS = "'Inter', sans-serif"

const CONTACTS = [
  { label: 'GitHub', href: 'https://github.com/DevvratSharma026' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devvrat-sharma/' },
  { label: 'devsharma.pcm.2003@gmail.com', href: 'mailto:devsharma.pcm.2003@gmail.com' },
]

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6c8aff' }}>
          {title}
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
      </div>
      {children}
    </div>
  )
}

function Row({ left, right, sub }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: SANS, fontSize: '13px', fontWeight: 500, color: '#e2e4f0' }}>{left}</span>
        <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(226,228,240,0.38)' }}>{right}</span>
      </div>
      {sub && <p style={{ fontFamily: SANS, fontSize: '12px', color: 'rgba(226,228,240,0.50)', marginTop: '3px', lineHeight: '1.6' }}>{sub}</p>}
    </div>
  )
}

export default function ResumeApp() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: 'rgba(4,5,14,0.9)' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '28px 28px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px', paddingBottom: '20px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          <h1 style={{ fontFamily: SANS, fontSize: '26px', fontWeight: 600, color: '#e2e4f0', marginBottom: '4px' }}>
            Devvrat Sharma
          </h1>
          <p style={{ fontFamily: MONO, fontSize: '12px', color: '#6c8aff', marginBottom: '10px' }}>
            AI Full Stack Developer · New Delhi, India
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {CONTACTS.map(function (c) {
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(226,228,240,0.4)', textDecoration: 'none' }}
                >
                  {c.label}
                </a>
              )
            })}
          </div>
        </div>

        <Section title="Education">
          <Row left="Greenfields Public School | New Delhi, India" right="2019 – 2020"
            sub="Class XII | 69.4% " />
          <Row left="Guru Gobind Singh Indraprastha University | New Delhi, India" right="2021 – 2025"
            sub="B.Tech in Information Technology | 8.69 CGPA" />
        </Section>

        <Section title="Experience">
          <Row left="IBM — Data Science Apprenticeship" right="Jun 2023 - Aug 2023"
            sub="Completed a Data Science apprenticeship at IBM, learning Python fundamentals, data analysis, and data visualization. Worked with libraries like Matplotlib to analyze datasets and create basic visual insights." />
          <Row left="Bluestocks — Frontend Developer Intern" right="Jun 2025 - Aug 2025"
            sub="Interned at Bluestock, developing an Upcoming IPO webpage and an Admin Dashboard panel. Built responsive UI components and implemented features for displaying and managing IPO-related data." />
        </Section>

        <Section title="Projects">
          <Row left="RepoLensAI" right="MERN · Groq · AWS"
            sub="AI-powered GitHub repository analyser using LLaMA-3 70B. File upload via Multer/S3, intelligent code analysis via Groq API." />

          <Row left="AI Notes App" right="Full-stack · AI"
            sub="Smart note-taking with AI summarisation, auto-tagging, and full-text search." />
        </Section>

        <Section title="Certifications">
          <Row left="IBM Data Science Professional" right="2023" />
          <Row left="AWS Generative AI" right="2024" />
          <Row left="CareOps Hackathon — Humanity Founders" right="2025" />
        </Section>

        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Node.js', 'Express', 'React', 'MongoDB', 'AWS S3', 'Groq', 'LLaMA-3', 'Tailwind', 'Git', 'Multer', 'Postman', 'Vite','Authentication', 'GenAI'].map(function (sk) {
              return (
                <span key={sk} style={{
                  fontFamily: MONO, fontSize: '11px', padding: '3px 10px',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px', color: 'rgba(226,228,240,0.55)',
                  background: 'rgba(255,255,255,0.03)',
                }}>{sk}</span>
              )
            })}
          </div>
        </Section>
      </div>
    </div>
  )
}
