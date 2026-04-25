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

const ROWS = [
  { num: '01', name: 'Barents Gallery', desc: 'Shopify OS 2.0 — custom theme, room visualiser, upsell, filtering.', year: '2025', bg: BARENTS_BG },
  { num: '02', name: 'Merk Barents', desc: 'WordPress / WooCommerce — identity, editorial templates, commerce.', year: '2025', bg: MERK_BG },
  { num: '03', name: 'Damping AS', desc: 'Own practice — digital design & production for independent briefs.', year: '2013 — 2019', bg: 'linear-gradient(135deg,#232323,#0a0a0a)' },
  { num: '04', name: 'Gan / 07 Media', desc: 'Web design & implementation for Norwegian media houses.', year: '2005 — 2013', bg: 'linear-gradient(135deg,#3a2c1c,#14100a)' },
  { num: '05', name: 'Brandhouse', desc: 'Web lead / designer for digital agency, Oslo.', year: '2000 — 2002', bg: 'linear-gradient(135deg,#2b2b2b,#0e0e0e)' },
  { num: '06', name: 'Telenor Media', desc: 'Graphic production & early web design.', year: '1994 — 1999', bg: 'linear-gradient(135deg,#1e2430,#0a0e14)' },
]

export default function Selected() {
  return (
    <section className="selected pt-[100px] pb-[120px] bg-white border-t border-black-10" id="about">
      <div className="max-w-[1060px] mx-auto px-6">
        <motion.div
          {...fadeIn}
          className="text-center font-mono text-[12px] tracking-[.28em] uppercase text-black-60 mb-12"
        >
          — Selected Projects —
        </motion.div>
        <div>
          {ROWS.map((r, i) => (
            <div
              key={r.num}
              className={`sel-row group grid grid-cols-[40px_1fr_80px] md:grid-cols-[80px_1fr_2fr_140px_100px] gap-5 items-center py-[22px] px-3 border-t border-black-10 relative overflow-hidden ${
                i === ROWS.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="font-mono text-[12px] text-black-50">{r.num}</div>
              <div className="font-sans font-semibold text-[20px] tracking-[-.01em] text-black-90">
                {r.name}
              </div>
              <div className="hidden md:block font-sans text-[14px] text-black-60 leading-[1.45]">
                {r.desc}
              </div>
              <div className="font-mono text-[12px] text-black-60 md:text-right">{r.year}</div>
              <div className="hidden md:block w-[100px] h-[60px] rounded-md bg-[#1a1a1a] relative overflow-hidden justify-self-end">
                <div
                  className="absolute inset-0 opacity-80 transition-[opacity,transform] duration-[600ms] group-hover:opacity-100 group-hover:scale-110"
                  style={{ background: r.bg }}
                />
              </div>
              <span
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 font-mono text-[20px] text-black-90 opacity-0 -right-10 transition-[opacity,right] duration-300 group-hover:opacity-100 group-hover:right-5"
              >
                →
              </span>
            </div>
          ))}
        </div>

        <div
          id="contact"
          className="cta-banner max-w-[1060px] mx-auto mt-20 rounded-[14px] bg-black-90 text-white flex flex-col md:flex-row md:flex-wrap md:justify-between md:items-center gap-6 px-6 sm:px-8 py-7"
        >
          <div className="font-sans font-semibold text-[22px] tracking-[-.015em]">
            Have a project?
          </div>
          <div className="font-sans text-[15px] text-white/70 leading-[1.45] max-w-[340px]">
            Available for new projects from{' '}
            <b className="text-white">4th August 2026</b> — Shopify themes, WooCommerce builds,
            full identity → frontend.
          </div>
          <a
            className="inline-flex items-center gap-[14px] px-[22px] py-4 rounded-full bg-white text-black-90 font-sans font-medium text-[15px] tracking-[-.01em] transition-[transform,background] duration-300 hover:-translate-y-[2px] hover:bg-[#f5f5f5]"
            href="mailto:ramzy.zaher@gmail.com"
          >
            <span>GET IN TOUCH</span>
            <span className="w-[30px] h-[30px] rounded-full bg-black-90 text-white inline-flex items-center justify-center font-mono text-[14px]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
