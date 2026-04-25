import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      setW((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div
      className="fixed left-0 top-0 h-[2px] bg-black-90 z-[200] transition-[width] duration-100 linear"
      style={{ width: `${w}%` }}
    />
  )
}
