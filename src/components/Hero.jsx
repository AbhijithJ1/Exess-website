import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PcbLightButton from './PcbLightButton'
import EnergyBus from '../lib/EnergyBus'

/**
 * Hero — "Logo Formation & Typography Power-Up with SVG Circuit Traces"
 *
 * Visual Background: Clean, elegant SVG PCB circuit traces & ambient glow.
 */

const traces = [
  { id: 'L1', d: 'M 50,140 L 220,140 L 245,165 L 340,165', outer: [50, 140] },
  { id: 'L2', d: 'M 50,230 L 240,230 L 260,245 L 350,245', outer: [50, 230] },
  { id: 'L3', d: 'M 50,370 L 240,370 L 260,355 L 350,355', outer: [50, 370] },
  { id: 'L4', d: 'M 50,460 L 220,460 L 245,435 L 340,435', outer: [50, 460] },
]

const Hero = () => {
  const containerRef = useRef(null)
  const [phase, setPhase] = useState(1)
  const { scrollY } = useScroll()

  const heroScale   = useTransform(scrollY, [0, 450], [1, 0.97])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.3])
  const heroY       = useTransform(scrollY, [0, 450], [0, 30])

  useEffect(() => {
    const t2 = setTimeout(() => setPhase(2), 200)
    const t3 = setTimeout(() => setPhase(3), 500)
    const t4 = setTimeout(() => setPhase(4), 900) // Huge visual headline
    const t5 = setTimeout(() => setPhase(5), 1600) // Slow compression
    const t6 = setTimeout(() => setPhase(6), 2200) // Subtext from top
    const t7 = setTimeout(() => setPhase(7), 2800) // CTA
    const t8 = setTimeout(() => {
      setPhase(8)
      EnergyBus.emit('hero:complete', { status: 'stable' })
    }, 3200)

    return () => {
      clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8)
    }
  }, [])

  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      {/* ── PREVIOUS SVG PCB CIRCUIT LINES BACKGROUND ───────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <svg
          className="w-full h-full max-w-7xl overflow-visible pointer-events-none opacity-60"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="hero-cyan-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#32C5E8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient SVG Radial Center Glow */}
          <circle cx="500" cy="300" r="260" fill="url(#hero-cyan-glow)" />

          {/* Left SVG PCB Traces */}
          <g id="hero-left-traces">
            {traces.map((t, idx) => (
              <g key={`L-${t.id}`}>
                <motion.path
                  d={t.d}
                  stroke="#1E6B93"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  opacity="0.35"
                />
                <motion.path
                  d={t.d}
                  stroke="#1E6B93"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={t.outer[0]}
                  cy={t.outer[1]}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#1E6B93"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.08 + 0.3 }}
                />
              </g>
            ))}
          </g>

          {/* Right SVG PCB Traces (Mirrored) */}
          <g id="hero-right-traces" transform="translate(1000, 0) scale(-1, 1)">
            {traces.map((t, idx) => (
              <g key={`R-${t.id}`}>
                <motion.path
                  d={t.d}
                  stroke="#1E6B93"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  opacity="0.35"
                />
                <motion.path
                  d={t.d}
                  stroke="#1E6B93"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={t.outer[0]}
                  cy={t.outer[1]}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#1E6B93"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.08 + 0.3 }}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ── 2. HERO TYPOGRAPHY STAGE ────────────────────────────────────── */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-5xl mx-auto section-padding flex flex-col items-center text-center pt-28 sm:pt-36 pb-20"
      >
        {/* HUGE HEADLINE TRANSFORMATION (Phase 4 → 5 → 6) */}
        <div className="mb-6 flex items-center justify-center select-none overflow-hidden min-h-[160px] sm:min-h-[240px]">
          {phase >= 4 && (
            <motion.div
              initial={{ scale: 1.5, filter: 'blur(16px)', opacity: 0 }}
              animate={phase >= 5
                ? { scale: 1, filter: 'blur(0px)', opacity: 1 }
                : { scale: 1.5, filter: 'blur(8px)', opacity: 0.85 }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="font-brand font-bold text-light-sweep-dark tracking-tight flex">
                <span className="text-[clamp(4.5rem,15vw,12rem)] leading-[0.88] tracking-[-0.04em] flex">
                  {exessLetters.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: -20, filter: 'blur(16px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: index * 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>
          )}
        </div>

        {/* Hairline Divider */}
        {phase >= 5 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="origin-center mb-8"
          >
            <div
              className="h-px"
              style={{
                width: 'clamp(180px, 22vw, 320px)',
                background: 'linear-gradient(90deg, transparent 0%, rgba(30,107,147,0.45) 50%, transparent 100%)',
              }}
            />
          </motion.div>
        )}

        {/* SUBTITLES — ORIGINATE FROM TOP (Phase 6) */}
        <div className="flex flex-col items-center gap-2 mb-12 min-h-[64px]">
          {phase >= 6 && (
            <>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-brand text-xs sm:text-sm uppercase tracking-[0.24em]"
                  style={{ color: '#1E6B93' }}
                >
                  Official Electronics Students Society
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="font-brand text-[10px] sm:text-xs uppercase tracking-[0.20em]"
                  style={{ color: '#6B7280' }}
                >
                  College of Engineering Chengannur
                </motion.p>
              </div>
            </>
          )}
        </div>

        {/* CTA BUTTON (Phase 7) */}
        {phase >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <PcbLightButton onClick={scrollToAbout}>
              Explore ExESS
            </PcbLightButton>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default Hero
