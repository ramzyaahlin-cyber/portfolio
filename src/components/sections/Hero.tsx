import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const INTRO_WORDS = [
  ['Digital', 'Designer', '&', 'Frontend', 'Developer'],
  ['Twenty-five', 'years', 'of', 'brand,', 'interface'],
  ['and', 'the', 'code', 'underneath', '—', 'based', 'in'],
  ['Kirkenes,', 'Norway.'],
]
const FLAT_WORD_COUNT = INTRO_WORDS.reduce((n, l) => n + l.length, 0)

function SplitText({
  text,
  baseMs,
  stepMs,
  className,
}: {
  text: string
  baseMs: number
  stepMs: number
  className?: string
}) {
  return (
    <span className={className}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(14px)', y: '0.3em' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 0.7, 0.2, 1],
            delay: (baseMs + i * stepMs) / 1000,
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<HTMLHeadingElement>(null)
  const brRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const [litCount, setLitCount] = useState(0)
  const [swept, setSwept] = useState(false)
  const [tlOpacity, setTlOpacity] = useState(1)
  const [brOpacity, setBrOpacity] = useState(1)

  useEffect(() => {
    const edgeFade = (el: Element | null, startY = 60, endPad = 20) => {
      if (!el) return 1
      const r = el.getBoundingClientRect()
      if (r.top >= startY) return 1
      const end = -r.height + endPad
      if (r.top <= end) return 0
      return (r.top - end) / (startY - end)
    }

    const onScroll = () => {
      setSwept(window.scrollY > 10)
      setTlOpacity(edgeFade(tlRef.current))
      setBrOpacity(edgeFade(brRef.current))

      const intro = introRef.current
      if (intro) {
        const r = intro.getBoundingClientRect()
        const vh = window.innerHeight
        const start = r.top - vh * 0.7
        const end = r.bottom - vh * 0.5
        const total = end - start
        const p = Math.max(0, Math.min(1, -start / total))
        setLitCount(Math.round(p * FLAT_WORD_COUNT))
      }
    }

    let pmx = 0
    let pmy = 0
    const onMouse = (e: MouseEvent) => {
      pmx = (e.clientX / window.innerWidth - 0.5) * 10
      pmy = (e.clientY / window.innerHeight - 0.5) * 10
    }
    let raf = 0
    const tick = () => {
      const p = portraitRef.current
      if (p) {
        const s = window.scrollY * 0.18
        p.style.transform = `translate3d(${pmx}px, ${-s + pmy}px, 0) scale(1.06)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  let wordIdx = 0

  return (
    <header className="relative min-h-screen overflow-hidden text-white bg-[#0a0a0a]" id="top">
      <div className="relative w-full h-screen min-h-[720px] overflow-hidden">
        <div
          ref={portraitRef}
          className="absolute inset-0 z-0 bg-cover"
          style={{
            backgroundImage: "url('/portrait.jpeg')",
            backgroundPosition: 'center 15%',
            transition: 'transform 1.4s cubic-bezier(.2,.8,.2,1)',
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,.25) 100%)',
          }}
        />

        <h1
          ref={tlRef}
          className="absolute z-[5] left-4 sm:left-8 top-[56px] sm:top-[72px] font-sans font-bold leading-[.95] tracking-[-.035em] text-white will-change-[opacity]"
          style={{ fontSize: 'clamp(36px,10vw,80px)', opacity: tlOpacity, transition: 'color .35s ease' }}
        >
          <SplitText text="RAMZY AAHLIN" baseMs={300} stepMs={50} />
        </h1>

        <motion.div
          className="absolute z-[5] left-4 sm:left-8 font-mono text-[12px] sm:text-[14px] tracking-[.1em] text-white"
          style={{ top: 'clamp(120px,20vw,170px)' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{
            opacity: swept ? 0 : 1,
            filter: 'blur(0px)',
            y: swept ? -50 : 0,
          }}
          transition={{ duration: 1, delay: 2, ease: [0.22, 0.7, 0.2, 1] }}
        >
          2K26
        </motion.div>

        <motion.div
          className="hidden md:flex absolute z-[5] left-10 top-1/2 flex-col items-center gap-[18px]"
          initial={{ opacity: 0, y: '-50%' }}
          animate={{
            opacity: swept ? 0 : 1,
            y: swept ? 'calc(-50% - 50px)' : '-50%',
          }}
          transition={{ duration: 1, delay: 2.1, ease: [0.22, 0.7, 0.2, 1] }}
        >
          <div className="w-px h-20 bg-white/55" />
          <div
            className="font-mono text-[11px] tracking-[.24em] text-white/80 uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            ./ PORTFOLIO
          </div>
        </motion.div>

        <div
          ref={brRef}
          className="absolute z-[5] right-4 sm:right-8 bottom-8 sm:bottom-12 font-sans font-bold leading-[.95] tracking-[-.035em] text-white"
          style={{ fontSize: 'clamp(36px,10vw,80px)', opacity: brOpacity, transition: 'color .35s ease' }}
        >
          <SplitText text="ZAHER" baseMs={1400} stepMs={70} />
        </div>

        <motion.div
          className="absolute z-[5] left-4 sm:left-8 bottom-[110px] md:bottom-12 right-4 sm:right-auto font-mono tracking-[.14em] uppercase leading-[1.35] max-w-[560px] text-white"
          style={{ fontSize: 'clamp(14px,3.2vw,24px)' }}
          animate={{
            opacity: swept ? 0 : 1,
            y: swept ? -50 : 0,
            pointerEvents: swept ? 'none' : 'auto',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="block">
            <SplitText text="TIMELESS VISUAL STORIES FOR" baseMs={600} stepMs={22} />
          </span>
          <span className="block">
            <SplitText text="LEGENDARY BRANDS" baseMs={1200} stepMs={22} />
          </span>
          <motion.span
            className="mt-[14px] inline-block font-mono text-[14px]"
            animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      <div
        ref={introRef}
        className="bg-[#0a0a0a] text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-[clamp(80px,15vw,200px)]"
      >
        <p
          className="font-sans font-semibold tracking-[-.025em]"
          style={{ fontSize: 'clamp(32px,5.2vw,82px)', lineHeight: 1.08 }}
        >
          {INTRO_WORDS.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => {
                const idx = wordIdx++
                const lit = idx < litCount
                return (
                  <span
                    key={wi}
                    className="inline-block transition-colors duration-[400ms]"
                    style={{ color: lit ? '#FFFFFF' : 'rgba(255,255,255,.12)' }}
                  >
                    {w}
                    {wi < line.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </span>
          ))}
        </p>
      </div>
    </header>
  )
}
