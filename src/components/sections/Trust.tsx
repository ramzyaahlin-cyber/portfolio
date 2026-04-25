import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const },
}

const LOGOS = [
  { name: 'Prodata', period: '2025 — Present' },
  { name: 'Damping', period: '2013 — 2019' },
  { name: 'Gan/07 Media', period: '2005 — 2013' },
  { name: 'Telenor Media', period: '1994 — 1999' },
]

export default function Trust() {
  return (
    <section className="trust py-[100px] bg-white border-t border-black-10">
      <div className="max-w-[1060px] mx-auto px-6 text-center">
        <motion.div
          {...fadeIn}
          className="font-mono text-[12px] tracking-[.28em] uppercase text-black-60 mb-10"
        >
          — About —
        </motion.div>
        <motion.h2
          {...fadeIn}
          className="font-sans font-semibold leading-[1.2] tracking-[-.02em] max-w-[820px] mx-auto mb-16 text-black-90"
          style={{ fontSize: 'clamp(28px,3vw,44px)' }}
        >
          I've had the privilege of collaborating with independent brands and operators across
          twenty-five years of practice — bringing considered ideas to life in visual identity,
          interface, and working code.
        </motion.h2>
        <motion.div
          {...fadeIn}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center"
        >
          {LOGOS.map((l) => (
            <div
              key={l.name}
              className="font-sans font-bold text-[22px] tracking-[-.02em] text-black-30 hover:text-black-90 transition-colors duration-300 text-center"
            >
              {l.name}
              <span className="block font-mono text-[10px] tracking-[.2em] uppercase text-black-30 mt-1">
                {l.period}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
