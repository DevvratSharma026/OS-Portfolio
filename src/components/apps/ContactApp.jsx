import { useState } from 'react'
import emailjs from '@emailjs/browser'

const MONO   = "'JetBrains Mono', monospace"
const SANS   = "'Inter', sans-serif"
const ACCENT = '#6c8aff'

const LINKS = [
  { label:'GitHub',   icon:'⌥', href:'https://github.com/DevvratSharma026', color:'#e2e4f0' },
  { label:'LinkedIn', icon:'in', href:'https://www.linkedin.com/in/devvrat-sharma/', color:'#0a66c2' },
  { label:'Email', icon:'@', href:'https://mail.google.com/mail/?view=cm&to=devsharma.pcm.2003@gmail.com', color:'#ff6b9d' },
]

export default function ContactApp() {
  const [form, setForm]     = useState({ name:'', email:'', message:'' })
  const [sent, setSent]     = useState(false)
  const [focused, setFocused] = useState(null)

  function handleSubmit(e) {
  e.preventDefault()

  emailjs.send(
    'service_9iad9y5',    // your Service ID
    'template_gv1vuin',   // your Template ID
    {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      reply_to:   form.email,
    },
    'vUhrMRNv5jU94y5yB'      // your Public Key
  )
  .then(function() {
    setSent(true)
    setTimeout(function() {
      setSent(false)
      setForm({ name:'', email:'', message:'' })
    }, 3000)
  })
  .catch(function(err) {
    console.error('EmailJS error:', err)
    alert('Failed to send. Try emailing directly.')
  })
}

  function inputStyle(field) {
    return {
      width:'100%', padding:'10px 14px',
      background: focused === field ? 'rgba(108,138,255,0.06)' : 'rgba(255,255,255,0.03)',
      border: '0.5px solid ' + (focused === field ? 'rgba(108,138,255,0.5)' : 'rgba(255,255,255,0.09)'),
      borderRadius:'8px', outline:'none',
      fontFamily:MONO, fontSize:'12px', color:'#e2e4f0',
      transition:'all 0.2s',
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6" style={{ background:'rgba(4,5,14,0.9)' }}>

      <h2 style={{ fontFamily:SANS, fontSize:'18px', fontWeight:600, color:'#e2e4f0', marginBottom:'4px' }}>
        Get in Touch
      </h2>
      <p style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(226,228,240,0.38)', marginBottom:'24px' }}>
        Open to full-time roles · collaborations · conversations
      </p>

      {/* Social links */}
      <div className="flex gap-3 mb-8">
        {LINKS.map(function(link) {
          return (
            <a key={link.label} href={link.href} target='_blank' rel='noreferrer'
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'8px 16px', borderRadius:'8px',
                border:'0.5px solid rgba(255,255,255,0.09)',
                background:'rgba(255,255,255,0.03)',
                fontFamily:MONO, fontSize:'12px',
                color:'rgba(226,228,240,0.65)',
                textDecoration:'none', transition:'all 0.2s',
              }}
              onMouseEnter={function(e){ e.currentTarget.style.borderColor = link.color + '66'; e.currentTarget.style.color='#e2e4f0' }}
              onMouseLeave={function(e){ e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color='rgba(226,228,240,0.65)' }}
            >
              <span style={{ fontSize:'13px' }}>{link.icon}</span>
              {link.label}
            </a>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ height:'0.5px', background:'rgba(255,255,255,0.06)', marginBottom:'24px' }} />

      {/* Form */}
      {sent ? (
        <div style={{
          padding:'24px', borderRadius:'12px',
          border:'0.5px solid rgba(40,200,64,0.4)',
          background:'rgba(40,200,64,0.06)',
          textAlign:'center',
        }}>
          <div style={{ fontSize:'28px', marginBottom:'10px' }}>✓</div>
          <p style={{ fontFamily:SANS, fontSize:'14px', color:'#28c840' }}>Message sent!</p>
          <p style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(226,228,240,0.4)', marginTop:'6px' }}>
            I'll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div>
            <label style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(226,228,240,0.38)', display:'block', marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }}>
              Name
            </label>
            <input
              type="text" required value={form.name}
              onChange={function(e){ setForm(function(f){ return {...f, name:e.target.value} }) }}
              onFocus={function(){ setFocused('name') }}
              onBlur={function(){ setFocused(null) }}
              style={inputStyle('name')}
              placeholder="Your name"
            />
          </div>
          <div>
            <label style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(226,228,240,0.38)', display:'block', marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }}>
              Email
            </label>
            <input
              type="email" required value={form.email}
              onChange={function(e){ setForm(function(f){ return {...f, email:e.target.value} }) }}
              onFocus={function(){ setFocused('email') }}
              onBlur={function(){ setFocused(null) }}
              style={inputStyle('email')}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(226,228,240,0.38)', display:'block', marginBottom:'6px', letterSpacing:'0.06em', textTransform:'uppercase' }}>
              Message
            </label>
            <textarea
              required value={form.message} rows={4}
              onChange={function(e){ setForm(function(f){ return {...f, message:e.target.value} }) }}
              onFocus={function(){ setFocused('message') }}
              onBlur={function(){ setFocused(null) }}
              style={{ ...inputStyle('message'), resize:'vertical', minHeight:'100px' }}
              placeholder="What's on your mind?"
            />
          </div>
          <button type="submit" style={{
            padding:'10px 24px', borderRadius:'8px',
            background:'rgba(108,138,255,0.15)',
            border:'0.5px solid rgba(108,138,255,0.5)',
            color:ACCENT, fontFamily:MONO, fontSize:'12px',
            cursor:'pointer', transition:'all 0.2s',
            alignSelf:'flex-start',
          }}
          onMouseEnter={function(e){ e.currentTarget.style.background='rgba(108,138,255,0.25)' }}
          onMouseLeave={function(e){ e.currentTarget.style.background='rgba(108,138,255,0.15)' }}
          
          >
            Send Message →
          </button>
        </form>
      )}
    </div>
  )
}
