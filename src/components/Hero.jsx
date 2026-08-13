import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PcbLightButton from './PcbLightButton'
import EnergyBus from '../lib/EnergyBus'
import Antigravity from './Antigravity'

/**
 * Hero — "Logo Formation & Typography Power-Up with Antigravity Background"
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
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      {/* ── ANTIGRAVITY THREE.JS DYNAMIC HERO BACKGROUND ────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color={'#32C5E8'}
          autoAnimate={true}
          particleVariance={1}
        />
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
