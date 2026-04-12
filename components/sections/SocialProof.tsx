'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'CAs on waitlist', icon: '👥' },
  { value: 50, suffix: '+', label: 'Legal documents indexed', icon: '📄' },
  { value: 99.9, suffix: '%', label: 'Extraction accuracy', icon: '🎯' },
  { value: 2081, suffix: '', label: 'Finance Act coverage', icon: '📅' },
]

function AnimatedNumber({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    const stepTime = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [started, target, duration])

  const display = target % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)

  return <span ref={ref}>{display}{suffix}</span>
}

export function SocialProof() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-[1620px] px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-200">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 lg:justify-center lg:px-8">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: 'rgba(9,56,62,0.08)' }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold leading-none" style={{ color: '#09383e' }}>
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
