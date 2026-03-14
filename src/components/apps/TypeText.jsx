import { useState, useEffect } from "react"

const lines = [
  "Hi, I'm Devvrat Sharma.",
  "An AI Full Stack Developer • MERN + AI Stack",
  "Explore my projects, skills and experience in this interactive terminal-inspired portfolio.",
  "Let's connect and build the future with AI! 🚀",
]

export default function TypeIntro() {
  const [text, setText] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    const currentLine = lines[lineIndex]

    const timer = setTimeout(() => {

      // wait 0.5s before deleting
      if (delay) {
        setDelay(false)
        setDeleting(true)
        return
      }

      if (!deleting) {
        // typing
        setText(currentLine.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)

        if (charIndex + 1 === currentLine.length) {
          setDelay(true) // trigger pause
        }

      } else {
        // deleting
        setText(currentLine.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)

        if (charIndex === 0) {
          setDeleting(false)
          setLineIndex((lineIndex + 1) % lines.length)
        }
      }

    }, delay ? 500 : deleting ? 25 : 60)

    return () => clearTimeout(timer)

  }, [charIndex, deleting, lineIndex, delay])

  return (
    <>
      <style>
        {`
        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          50% { opacity: 0 }
        }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "2%",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "25px",
          color: "rgba(226,228,240,0.75)",
          textAlign: "left",
          maxWidth: "650px",
          lineHeight: "1.6",
          pointerEvents: "none"
        }}
      >
        {text}
        <span className="cursor">▋</span>
      </div>
    </>
  )
}