import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PcbLightButton from './PcbLightButton'
import EnergyBus from '../lib/EnergyBus'

/**
 * Hero — Sequential PCB Energy Flow & Headline Ignition
 *
 * Sequence Choreography (Starts when Intro finishes):
 *   1. PHASE 2 (200ms -> 1400ms): Electric cyan PCB energy pulses travel inward along circuit traces toward center.
 *   2. PHASE 3 (1400ms): The moment PCB energy reaches the inner trace tips, the EXESS headline & glaze bloom ignite and glow!
 *   3. PHASE 4 -> 6: Hairline divider, subtitle, and CTA button illuminate.
 */

// Desktop PCB Traces (viewBox="0 0 1440 700") — Inner tips at x: 410 (left) and x: 1030 (right) clearing central wordmark
const desktopLeftTraces = [
  { id: 'DL1', d: 'M 40,160 H 280 L 325,205 H 410', terminal: [40, 160], tip: [410, 205] },
  { id: 'DL2', d: 'M 40,270 H 240 L 285,315 H 390', terminal: [40, 270], tip: [390, 315] },
  { id: 'DL3', d: 'M 40,430 H 240 L 285,385 H 390', terminal: [40, 430], tip: [390, 385] },
  { id: 'DL4', d: 'M 40,540 H 280 L 325,495 H 410', terminal: [40, 540], tip: [410, 495] },
]

const desktopRightTraces = [
  { id: 'DR1', d: 'M 1400,160 H 1160 L 1115,205 H 1030', terminal: [1400, 160], tip: [1030, 205] },
  { id: 'DR2', d: 'M 1400,270 H 1200 L 1155,315 H 1050', terminal: [1400, 270], tip: [1050, 315] },
  { id: 'DR3', d: 'M 1400,430 H 1200 L 1155,385 H 1050', terminal: [1400, 430], tip: [1050, 385] },
  { id: 'DR4', d: 'M 1400,540 H 1160 L 1115,495 H 1030', terminal: [1400, 540], tip: [1030, 495] },
]

// Mobile PCB Traces (viewBox="0 0 400 700")
const mobileLeftTraces = [
  { id: 'ML1', d: 'M 15,160 H 75 L 95,180 H 110', terminal: [15, 160], tip: [110, 180] },
  { id: 'ML2', d: 'M 15,520 H 75 L 95,500 H 110', terminal: [15, 520], tip: [110, 500] },
]

const mobileRightTraces = [
  { id: 'MR1', d: 'M 385,160 H 325 L 305,180 H 290', terminal: [385, 160], tip: [290, 180] },
  { id: 'MR2', d: 'M 385,520 H 325 L 305,500 H 290', terminal: [385, 520], tip: [290, 500] },
]

const Hero = ({ isIntroComplete = true }) => {
  const containerRef = useRef(null)
  const [phase, setPhase] = useState(1)
  const { scrollY } = useScroll()

  const heroScale   = useTransform(scrollY, [0, 450], [1, 0.97])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.3])
  const heroY       = useTransform(scrollY, [0, 450], [0, 30])

  useEffect(() => {
    if (!isIntroComplete) {
      setPhase(1)
      return
    }

    // STEP 1: Energy travels inward along PCB traces right when intro finishes
    const t2 = setTimeout(() => setPhase(2), 200)

    // STEP 2: When energy reaches the inner trace tips (~1400ms), ignite EXESS headline & glaze bloom!
    const t3 = setTimeout(() => setPhase(3), 1400)

    const t4 = setTimeout(() => setPhase(4), 2100) // Hairline divider
    const t5 = setTimeout(() => setPhase(5), 2600) // Subtitle reveal
    const t6 = setTimeout(() => setPhase(6), 3100) // CTA button
    const t7 = setTimeout(() => {
      setPhase(7)
      EnergyBus.emit('hero:complete', { status: 'stable' })
    }, 3500)

    return () => {
      clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7)
    }
  }, [isIntroComplete])

  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      {/* ── 1. RESPONSIVE SVG PCB CIRCUIT SYSTEM (DESKTOP) ────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Ambient Radial Light Bloom Matching Headline Glaze Gradient */}
            <radialGradient id="hero-glaze-glow-desktop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#96EBF8" stopOpacity="0.38" />
              <stop offset="35%" stopColor="#5ED8F2" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#1E6B93" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
            </radialGradient>

            {/* High-Visibility Electric Cyan PCB Energy Gradients */}
            <linearGradient id="hero-pulse-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E6B93" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#5ED8F2" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#96EBF8" stopOpacity="1.0" />
            </linearGradient>

            <linearGradient id="hero-pulse-grad-right" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1E6B93" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#5ED8F2" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#96EBF8" stopOpacity="1.0" />
            </linearGradient>
          </defs>

          {/* Central Ambient Radial Glaze Bloom — Ignites at Phase 3 when energy arrives */}
          <motion.circle
            cx="720"
            cy="350"
            r="320"
            fill="url(#hero-glaze-glow-desktop)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Desktop Left PCB Traces */}
          {desktopLeftTraces.map((t, idx) => (
            <g key={t.id}>
              {/* Dashed Guide Path */}
              <path
                d={t.d} stroke="#1E6B93" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.25"
              />

              {/* Solid Base Trace */}
              <motion.path
                d={t.d} stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
              />

              {/* STEP 1: High-Visibility Inward PCB Energy Pulse */}
              {phase >= 2 && (
                <motion.path
                  d={t.d}
                  stroke="url(#hero-pulse-grad-left)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 0 8px #96EBF8) drop-shadow(0 0 16px #5ED8F2)' }}
                  initial={{ pathLength: 0.25, pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.75], opacity: [0, 1, 1, 0.3] }}
                  transition={{
                    duration: 1.1,
                    ease: [0.4, 0, 0.2, 1],
                    delay: idx * 0.08,
                    repeat: phase >= 3 ? Infinity : 0,
                    repeatDelay: 3.4,
                  }}
                />
              )}

              {/* Outer Terminal Node */}
              <motion.circle
                cx={t.terminal[0]} cy={t.terminal[1]} r="5" fill="#FFFFFF" stroke="#1E6B93" strokeWidth="2.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.06 + 0.1 }}
              />
            </g>
          ))}

          {/* Desktop Right PCB Traces */}
          {desktopRightTraces.map((t, idx) => (
            <g key={t.id}>
              {/* Dashed Guide Path */}
              <path
                d={t.d} stroke="#1E6B93" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.25"
              />

              {/* Solid Base Trace */}
              <motion.path
                d={t.d} stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
              />

              {/* STEP 1: High-Visibility Inward PCB Energy Pulse */}
              {phase >= 2 && (
                <motion.path
                  d={t.d}
                  stroke="url(#hero-pulse-grad-right)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 0 8px #96EBF8) drop-shadow(0 0 16px #5ED8F2)' }}
                  initial={{ pathLength: 0.25, pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.75], opacity: [0, 1, 1, 0.3] }}
                  transition={{
                    duration: 1.1,
                    ease: [0.4, 0, 0.2, 1],
                    delay: idx * 0.08 + 0.12,
                    repeat: phase >= 3 ? Infinity : 0,
                    repeatDelay: 3.4,
                  }}
                />
              )}

              {/* Outer Terminal Node */}
              <motion.circle
                cx={t.terminal[0]} cy={t.terminal[1]} r="5" fill="#FFFFFF" stroke="#1E6B93" strokeWidth="2.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.06 + 0.1 }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* ── 2. RESPONSIVE SVG PCB CIRCUIT SYSTEM (MOBILE) ─────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block md:hidden overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="hero-glaze-glow-mobile" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#96EBF8" stopOpacity="0.32" />
              <stop offset="40%" stopColor="#5ED8F2" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Glaze Light Bloom */}
          <motion.circle
            cx="200"
            cy="350"
            r="160"
            fill="url(#hero-glaze-glow-mobile)"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Mobile Restrained Left PCB Traces */}
          {mobileLeftTraces.map((t, idx) => (
            <g key={t.id}>
              <path
                d={t.d} stroke="#1E6B93" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.25"
              />
              <motion.path
                d={t.d} stroke="#1E6B93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
              />
              <motion.circle
                cx={t.terminal[0]} cy={t.terminal[1]} r="4" fill="#FFFFFF" stroke="#1E6B93" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.08 + 0.1 }}
              />
            </g>
          ))}

          {/* Mobile Restrained Right PCB Traces */}
          {mobileRightTraces.map((t, idx) => (
            <g key={t.id}>
              <path
                d={t.d} stroke="#1E6B93" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.25"
              />
              <motion.path
                d={t.d} stroke="#1E6B93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.0, delay: idx * 0.08, ease: 'easeOut' }}
              />
              <motion.circle
                cx={t.terminal[0]} cy={t.terminal[1]} r="4" fill="#FFFFFF" stroke="#1E6B93" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.08 + 0.1 }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* ── 3. HERO TYPOGRAPHY STAGE (IGNITES AT PHASE 3 WHEN PCB ENERGY ARRIVES) ─ */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-24 sm:pt-36 pb-16"
      >
        {/* STEP 2: EXESS HEADLINE IGNITES & GLOWS WHEN PCB ENERGY REACHES END */}
        <div className="mb-6 flex items-center justify-center select-none min-h-[120px] sm:min-h-[220px]">
          {phase >= 3 && (
            <motion.div
              initial={{ scale: 1.4, filter: 'blur(16px)', opacity: 0 }}
              animate={phase >= 4
                ? { scale: 1, filter: 'blur(0px)', opacity: 1 }
                : { scale: 1.4, filter: 'blur(8px)', opacity: 0.9 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="font-brand font-bold text-light-sweep-dark tracking-tight flex">
                <span className="text-[clamp(3.2rem,14vw,11rem)] leading-[0.88] tracking-[-0.04em] flex">
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
        {phase >= 4 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="origin-center mb-6 sm:mb-8"
          >
            <div
              className="h-px"
              style={{
                width: 'clamp(140px, 22vw, 320px)',
                background: 'linear-gradient(90deg, transparent 0%, rgba(30,107,147,0.45) 50%, transparent 100%)',
              }}
            />
          </motion.div>
        )}

        {/* SUBTITLES */}
        <div className="flex flex-col items-center gap-2 mb-10 sm:mb-12 min-h-[56px]">
          {phase >= 5 && (
            <>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-brand text-[11px] sm:text-sm uppercase tracking-[0.20em] sm:tracking-[0.24em]"
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
                  className="font-brand text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.20em]"
                  style={{ color: '#6B7280' }}
                >
                  College of Engineering Chengannur
                </motion.p>
              </div>
            </>
          )}
        </div>

        {/* CTA BUTTON */}
        {phase >= 6 && (
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
