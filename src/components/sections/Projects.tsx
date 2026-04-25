import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const },
}

const BARENTS_BG =
  'radial-gradient(ellipse at 70% 40%, rgba(255,170,100,.4), transparent 55%), linear-gradient(135deg,#2a1a10 0%, #0f0a07 70%)'

const MERK_BG =
  'radial-gradient(ellipse at 30% 70%, rgba(70,90,120,.55), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(200,180,150,.25), transparent 60%), linear-gradient(135deg,#181a1c 0%, #0a0a0b 70%)'

function ProjectCard({
  caseLabel,
  year,
  name,
  bg,
}: {
  caseLabel: string
  year: string
  name: string
  bg: string
}) {
  return (
    <a
      href="#"
      className="group project-card relative block max-w-[1060px] mx-auto mb-7 rounded-[18px] overflow-hidden bg-[#1a1a1a]"
      style={{ aspectRatio: '16/9' }}
    >
      <div
        className="absolute inset-0 transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05] group-hover:brightness-[.55] group-hover:saturate-100"
        style={{ background: bg, filter: 'brightness(.7) saturate(.9)' }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.6) 100%)',
        }}
      />
      <div className="absolute top-5 left-5 z-[3] font-mono text-[11px] tracking-[.16em] uppercase text-white/75 flex items-center gap-[10px]">
        <span className="w-2 h-2 rounded-full bg-white" />
        {caseLabel}
      </div>
      <div className="absolute top-5 right-5 z-[3] font-mono text-[11px] tracking-[.16em] uppercase text-white/75">
        {year}
      </div>
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center text-white p-10">
        <motion.div
          {...fadeIn}
          className="font-sans font-bold leading-none tracking-[-.03em]"
          style={{ fontSize: 'clamp(42px,5.6vw,84px)' }}
        >
          {name}
        </motion.div>
      </div>
      <div className="absolute bottom-[22px] right-[22px] z-[3] w-[54px] h-[54px] border border-white/40 rounded-full flex items-center justify-center font-mono text-[16px] text-white transition-[background,border-color,transform] duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45">
        ↗
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="projects-section px-4 sm:px-6 pt-[clamp(80px,12vw,140px)] pb-[60px] bg-white" id="work">
      <motion.div
        {...fadeIn}
        className="text-center font-mono text-[12px] tracking-[.28em] uppercase text-black-80 mb-14"
      >
        — Projects —
      </motion.div>
      <ProjectCard caseLabel="CASE · 01" year="2025 / NO" name="Barents Gallery" bg={BARENTS_BG} />
      <ProjectCard caseLabel="CASE · 02" year="2025 / NO" name="Merk Barents" bg={MERK_BG} />
    </section>
  )
}
