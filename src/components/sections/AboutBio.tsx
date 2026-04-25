import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function useOsloClock() {
  const [time, setTime] = useState('00:00')
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Oslo',
        }),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] },
}

export default function AboutBio() {
  const time = useOsloClock()
  return (
    <section className="about-bio bg-[#0a0a0a] text-white px-4 sm:px-8 pt-[clamp(80px,15vw,120px)] pb-16 sm:pb-20" id="about-bio">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-20 items-start">
        <motion.div {...fadeIn}>
          <img
            src="/ramzy02.jpeg"
            alt="Ramzy Aahlin Zaher"
            className="w-full rounded-[14px] block"
            style={{ filter: 'grayscale(100%) contrast(1.05)' }}
          />
        </motion.div>
        <div className="pt-5">
          <motion.p
            {...fadeIn}
            className="font-sans leading-[1.45] tracking-[-.02em] mb-11 text-white/40"
            style={{ fontSize: 'clamp(20px,2.2vw,30px)' }}
          >
            Renowned for my <strong className="text-white font-bold">innovative approach</strong>{' '}
            to creativity, I began my career twenty-five years ago building brand, interface, and
            the code underneath —{' '}
            <em className="italic text-white/60">end-to-end</em>, from first sketch to final ship,
            swiftly establishing my{' '}
            <strong className="text-white font-bold">distinctive design</strong> style.
          </motion.p>
          <motion.p
            {...fadeIn}
            className="font-sans leading-[1.45] tracking-[-.02em] mb-11 text-white/40"
            style={{ fontSize: 'clamp(20px,2.2vw,30px)' }}
          >
            Currently, I continue to innovate and work with brands through{' '}
            <strong className="text-white font-bold">contract-based work</strong>, consistently
            pushing the boundaries of{' '}
            <strong className="text-white font-bold">digital design</strong>.
          </motion.p>
          <motion.p
            {...fadeIn}
            className="font-sans text-white/45 mb-4"
            style={{ fontSize: 'clamp(14px,1.2vw,18px)' }}
          >
            Based and work in Norway
          </motion.p>
          <motion.div {...fadeIn} className="flex items-baseline gap-[14px] mt-1">
            <span
              className="font-sans font-bold leading-none tracking-[-.04em] text-white"
              style={{ fontSize: 'clamp(56px,8vw,110px)' }}
            >
              {time}
            </span>
            <span
              className="font-mono text-white/50 tracking-[.08em]"
              style={{ fontSize: 'clamp(14px,1.2vw,20px)' }}
            >
              (GMT+1)
            </span>
          </motion.div>
        </div>
      </div>
      <hr className="max-w-[1280px] mx-auto mt-20 border-t border-white/10" />
    </section>
  )
}
