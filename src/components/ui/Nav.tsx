import { useEffect, useState } from 'react'

const LIGHT_SECTIONS = ['.projects-section', '.trust', '.selected', '.big-name']

export default function Nav() {
  const [light, setLight] = useState(false)
  const [swept, setSwept] = useState(false)

  useEffect(() => {
    const update = () => {
      setSwept(window.scrollY > 10)
      setLight(
        LIGHT_SECTIONS.some((sel) => {
          const el = document.querySelector(sel)
          if (!el) return false
          const r = el.getBoundingClientRect()
          return r.top <= 60 && r.bottom > 60
        }),
      )
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-4 sm:px-8 py-5 sm:py-6 font-mono text-[10px] sm:text-[12px] uppercase tracking-[.14em] transition-[color,opacity,transform] duration-300 ease-[cubic-bezier(.4,0,.2,1)] pointer-events-none"
      style={{
        color: light ? '#1A1A1A' : '#FFFFFF',
        opacity: swept ? 0 : 1,
        transform: swept ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="flex gap-5 sm:gap-14 pointer-events-auto">
        <a href="#work" className="link">WORK</a>
        <a href="#about" className="link">ABOUT</a>
        <a href="#thoughts" className="link">THOUGHTS</a>
      </div>
      <div className="flex gap-3 sm:gap-5 pointer-events-auto">
        <a href="mailto:ramzy.zaher@gmail.com" className="link">MAIL</a>
        <a href="#" className="hidden sm:inline link">TW</a>
        <a href="#" className="hidden sm:inline link">IG</a>
        <a href="#" className="link">LI</a>
      </div>
    </nav>
  )
}
