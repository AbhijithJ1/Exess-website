import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PcbLightButton from './PcbLightButton'
import EnergyBus from '../lib/EnergyBus'

/**
 * Hero — "Logo Formation & Typography Power-Up"
 *
 * Sequence:
 *   Stage 1 — LOGO INTRO ANIMATION:
 *     - Dormant PCB system with 16 outer circular endpoints.
 *     - Energy streams inward along 16 PCB traces toward center.
 *     - Central energy burst forms the ExESS emblem logo.
 *
 *   Stage 2 — HERO TYPOGRAPHY POWER-UP:
 *     - Energy bloom triggers huge EXESS headline at oversized scale.
 *     - PCB traces maintain strict negative space clearing (never cross text).
 *     - Headline scale-compresses (scale 1.8 -> 1.0) as ASCII noise resolves.
 *     - Subtext originates from ABOVE with blur->sharp (y: -24px -> 0).
 *     - Signature PcbLightButton CTA illuminates.
 */

const PCB_TRACES_LEFT = [
  { id: 'L1', d: 'M 40,80 H 340 L 390,140 H 430', outer: [40, 80] },
  { id: 'L2', d: 'M 60,120 H 320 L 370,175 H 440', outer: [60, 120] },
  { id: 'L3', d: 'M 30,160 H 300 L 350,210 H 450', outer: [30, 160] },
  { id: 'L4', d: 'M 50,200 H 280 L 330,245 H 460', outer: [50, 200] },
  { id: 'L5', d: 'M 40,240 H 270 L 320,280 H 460', outer: [40, 240] },
  { id: 'L6', d: 'M 70,280 H 290 L 340,315 H 450', outer: [70, 280] },
  { id: 'L7', d: 'M 30,320 H 280 L 330,350 H 440', outer: [30, 320] },
  { id: 'L8', d: 'M 50,370 H 240 L 280,370 H 350', outer: [50, 370] },
]

const PCB_TRACES_RIGHT = [
  { id: 'R1', d: 'M 1160,80 H 860 L 810,140 H 770', outer: [1160, 80] },
  { id: 'R2', d: 'M 1140,120 H 880 L 830,175 H 760', outer: [1140, 120] },
  { id: 'R3', d: 'M 1170,160 H 900 L 850,210 H 750', outer: [1170, 160] },
  { id: 'R4', d: 'M 1150,200 H 920 L 870,245 H 740', outer: [1150, 200] },
  { id: 'R5', d: 'M 1160,240 H 930 L 880,280 H 740', outer: [1160, 240] },
  { id: 'R6', d: 'M 1130,280 H 910 L 860,315 H 750', outer: [1130, 280] },
  { id: 'R7', d: 'M 1170,320 H 920 L 870,350 H 760', outer: [1170, 320] },
  { id: 'R8', d: 'M 1150,370 H 960 L 920,370 H 850', outer: [1150, 370] },
]

const Hero = () => {
  const containerRef = useRef(null)
  const [phase, setPhase] = useState(1)
  const { scrollY } = useScroll()

  const heroScale   = useTransform(scrollY, [0, 450], [1, 0.97])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.3])
  const heroY       = useTransform(scrollY, [0, 450], [0, 30])

  useEffect(() => {
    const t2 = setTimeout(() => setPhase(2), 350)
    const t3 = setTimeout(() => setPhase(3), 1000)
    const t4 = setTimeout(() => setPhase(4), 2000) // Huge visual headline
    const t5 = setTimeout(() => setPhase(5), 3100) // Slow compression
    const t6 = setTimeout(() => setPhase(6), 4000) // Subtext from top
    const t7 = setTimeout(() => setPhase(7), 4800) // CTA
    const t8 = setTimeout(() => {
      setPhase(8)
      EnergyBus.emit('hero:complete', { status: 'stable' })
    }, 5400)

    return () => {
      clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8)
    }
  }, [])

  const scrollToAbout = () =>
    document.querySelector('#circuits')?.scrollIntoView({ behavior: 'smooth' })

  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      {/* ── 1. PCB CANVAS & ENERGY FIELD (Strict Negative Space Around Text) ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="heroHeadlineField" cx="50%" cy="38%" r="52%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity={phase >= 4 ? '0.24' : '0.04'} />
            <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Mask to ensure PCB lines NEVER cross through central headline text */}
          <mask id="headlineClearanceMask">
            <rect x="0" y="0" width="1200" height="700" fill="white" />
            <rect x="360" y="160" width="480" height="260" rx="30" fill="black" />
          </mask>
        </defs>

        <rect x="0" y="0" width="1200" height="700" fill="url(#heroHeadlineField)" />

        {/* Crosshairs */}
        <g stroke="rgba(30,107,147,0.18)" strokeWidth="0.8">
          <path d="M 30 30 H 50 M 40 20 V 40" />
          <path d="M 1170 30 H 1150 M 1160 20 V 40" />
          <path d="M 30 670 H 50 M 40 660 V 680" />
          <path d="M 1170 670 H 1150 M 1160 660 V 680" />
        </g>

        {/* 16 Base PCB Traces (Masked to clear headline zone) */}
        <g mask="url(#headlineClearanceMask)" stroke="rgba(30,107,147,0.22)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {PCB_TRACES_LEFT.map((t) => <path key={t.id} d={t.d} />)}
          {PCB_TRACES_RIGHT.map((t) => <path key={t.id} d={t.d} />)}
        </g>

        {/* 16 Outer Circular Endpoints */}
        <g>
          {PCB_TRACES_LEFT.map((t, idx) => {
            const isNodeActive = phase >= 2
            return (
              <g key={`node-L-${t.id}`}>
                <motion.circle
                  cx={t.outer[0]} cy={t.outer[1]} r="4.5"
                  fill="#FFFFFF" stroke={isNodeActive ? '#32C5E8' : '#1E6B93'}
                  strokeWidth={isNodeActive ? '2.5' : '1.8'}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={isNodeActive ? { scale: [1, 1.25, 1], opacity: 1 } : { opacity: 0.5 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  style={{ filter: isNodeActive ? 'drop-shadow(0 0 6px #32C5E8)' : 'none' }}
                />
                {isNodeActive && <circle cx={t.outer[0]} cy={t.outer[1]} r="2" fill="#32C5E8" />}
              </g>
            )
          })}

          {PCB_TRACES_RIGHT.map((t, idx) => {
            const isNodeActive = phase >= 2
            return (
              <g key={`node-R-${t.id}`}>
                <motion.circle
                  cx={t.outer[0]} cy={t.outer[1]} r="4.5"
                  fill="#FFFFFF" stroke={isNodeActive ? '#32C5E8' : '#1E6B93'}
                  strokeWidth={isNodeActive ? '2.5' : '1.8'}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={isNodeActive ? { scale: [1, 1.25, 1], opacity: 1 } : { opacity: 0.5 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  style={{ filter: isNodeActive ? 'drop-shadow(0 0 6px #32C5E8)' : 'none' }}
                />
                {isNodeActive && <circle cx={t.outer[0]} cy={t.outer[1]} r="2" fill="#32C5E8" />}
              </g>
            )
          })}
        </g>

        {/* Stage 1: Inward Energy Stream & Central Emblem Formation */}
        {phase >= 3 && phase <= 5 && (
          <g mask="url(#headlineClearanceMask)">
            {PCB_TRACES_LEFT.map((t, idx) => (
              <motion.path
                key={`pulse-L-${t.id}`}
                d={t.d} stroke="#32C5E8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                style={{ filter: 'drop-shadow(0 0 8px #32C5E8) drop-shadow(0 0 14px #00F0FF)' }}
                initial={{ pathLength: 0.08, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: 0.92, opacity: [0, 1, 1, 0.4] }}
                transition={{ duration: 1.1, delay: idx * 0.04, ease: 'easeInOut' }}
              />
            ))}
            {PCB_TRACES_RIGHT.map((t, idx) => (
              <motion.path
                key={`pulse-R-${t.id}`}
                d={t.d} stroke="#32C5E8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                style={{ filter: 'drop-shadow(0 0 8px #32C5E8) drop-shadow(0 0 14px #00F0FF)' }}
                initial={{ pathLength: 0.08, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: 0.92, opacity: [0, 1, 1, 0.4] }}
                transition={{ duration: 1.1, delay: idx * 0.04, ease: 'easeInOut' }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* ── 2. HERO TYPOGRAPHY STAGE ────────────────────────────────────── */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-5xl mx-auto section-padding flex flex-col items-center text-center pt-28 sm:pt-36 pb-20"
      >
        {/* HUGE HEADLINE TRANSFORMATION (Phase 4 → 5 → 6) */}
        <div className="mb-6 flex items-center justify-center select-none overflow-hidden min-h-[160px] sm:min-h-[240px]">
          {phase >= 4 && (
            <motion.div
              initial={{ scale: 1.7, filter: 'blur(20px)', opacity: 0 }}
              animate={phase >= 5
                ? { scale: 1, filter: 'blur(0px)', opacity: 1 }
                : { scale: 1.7, filter: 'blur(12px)', opacity: 0.85 }
              }
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Technical Matrix Glyphs behind initial emergence */}
              {phase === 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400/40 font-mono text-xs tracking-widest pointer-events-none">
                  010101 ExESS SYSTEM ONLINE 010101
                </div>
              )}

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
                  className="font-brand text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.24em]"
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
