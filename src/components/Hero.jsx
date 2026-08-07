import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HeroBackground — Cleaner Engineering Atmosphere
 *
 * Clean, open engineering background with plenty of whitespace:
 * Removed grid layout lines. Features subtle PCB traces, blueprint lines,
 * and soft radial background gradients for a high-end engineering feel.
 */
const HeroBackground = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Soft radial center gradient for depth */}
      <radialGradient id="hlg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.05" />
        <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ── 1. Continuous Central Main Power Bus Line ──────────────────────── */}
    <path
      d="M720 0 V240"
      stroke="rgba(30,107,147,0.15)"
      strokeWidth="1.8"
      strokeDasharray="4 4"
    />
    <circle cx="720" cy="240" r="3.5" fill="#32C5E8" opacity="0.6" />

    {/* ── 2. Subtle PCB Copper Routing — Open Whitespace Lines ───────────── */}
    <g stroke="rgba(30,107,147,0.10)" strokeWidth="1.2" fill="none" strokeLinecap="square">
      <path d="M0 140 H160 V90 H320" />
      <path d="M0 240 H100 V180 H280" stroke="rgba(50,197,232,0.15)" />

      <path d="M1440 140 H1280 V90 H1120" />
      <path d="M1440 240 H1340 V180 H1160" stroke="rgba(50,197,232,0.15)" />

      <path d="M0 760 H160 V810 H320" />
      <path d="M1440 760 H1280 V810 H1120" />
    </g>

    {/* Via Pads at Trace Ends */}
    <g fill="rgba(30,107,147,0.20)">
      <circle cx="320" cy="90" r="3" />
      <circle cx="280" cy="180" r="2.5" />
      <circle cx="1120" cy="90" r="3" />
      <circle cx="1160" cy="180" r="2.5" />
      <circle cx="320" cy="810" r="3" />
      <circle cx="1120" cy="810" r="3" />
    </g>

    {/* Corner technical crosshairs */}
    <g stroke="rgba(30,107,147,0.15)" strokeWidth="0.8">
      <path d="M24 40 H40 M32 32 V48" />
      <path d="M1416 40 H1400 M1408 32 V48" />
      <path d="M24 860 H40 M32 852 V868" />
      <path d="M1416 860 H1400 M1408 852 V868" />
    </g>

    <rect x="0" y="0" width="1440" height="900" fill="url(#hlg)" />
  </svg>
)

/**
 * ElectricalSignalButton — Micro-interaction with Michroma typography and exact ExESS case
 */
const ElectricalSignalButton = ({ onClick }) => (
  <button
    id="hero-explore-btn"
    onClick={onClick}
    className="group relative inline-flex items-center gap-4 px-9 py-4 rounded-full font-brand text-xs sm:text-sm text-white tracking-wider overflow-hidden cursor-pointer"
    style={{
      background: 'linear-gradient(135deg, #1E6B93 0%, #187AA3 100%)',
      boxShadow: '0 4px 20px rgba(30, 107, 147, 0.22)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #187AA3 0%, #156689 100%)'
      e.currentTarget.style.boxShadow = '0 8px 30px rgba(30, 107, 147, 0.35)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #1E6B93 0%, #187AA3 100%)'
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(30, 107, 147, 0.22)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
  >
    <span>Explore ExESS</span>

    <div className="relative flex items-center justify-center ml-1" aria-hidden="true">
      <svg className="w-10 h-4 overflow-visible pointer-events-none" viewBox="0 0 44 16" fill="none">
        <path d="M 2 8 H 28" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2.5" />
        <path
          d="M 28 4 L 35 8 L 28 12"
          stroke="#32C5E8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
        <circle r="2.5" fill="#32C5E8">
          <animateMotion dur="1.1s" repeatCount="indefinite" path="M 2 8 L 32 8" />
        </circle>
      </svg>
    </div>
  </button>
)

/**
 * PCBScrollIndicator
 */
const PCBScrollIndicator = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Scroll down to explore"
    className="flex flex-col items-center gap-2.5 transition-colors duration-300 cursor-pointer group"
  >
    <span
      className="font-brand uppercase text-slate-400 group-hover:text-primary transition-colors text-[9px] tracking-[0.25em]"
    >
      Scroll to explore
    </span>

    <div className="relative w-4 h-12 flex items-center justify-center">
      <svg className="w-4 h-12 overflow-visible pointer-events-none" viewBox="0 0 16 48" fill="none">
        <line x1="8" y1="2" x2="8" y2="40" stroke="rgba(30, 107, 147, 0.25)" strokeWidth="1.6" strokeDasharray="3 3" />
        <circle cx="8" cy="42" r="3" fill="#1E6B93" opacity="0.6" />
        <circle cx="8" cy="42" r="1.2" fill="#FFFFFF" />

        <circle r="2.5" fill="#32C5E8">
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M 8 2 L 8 40" />
        </circle>
      </svg>
    </div>
  </button>
)

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  const heroScale   = useTransform(scrollY, [0, 450], [1, 0.97])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.3])
  const heroY       = useTransform(scrollY, [0, 450], [0, 30])

  const scrollToAbout = () =>
    document.querySelector('#circuits')?.scrollIntoView({ behavior: 'smooth' })

  const D = 0.1

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      <HeroBackground />

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-4xl mx-auto section-padding flex flex-col items-center text-center pt-28 sm:pt-36 pb-20"
      >
        {/* Large ExESS Branding Title in Michroma */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight select-none"
            style={{
              fontSize: 'clamp(4.5rem, 15vw, 12rem)',
              lineHeight: '0.9',
              letterSpacing: '-0.04em',
            }}
          >
            ExESS
          </h1>
        </motion.div>

        {/* Precision hairline divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: D + 0.15, duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="origin-center mb-8"
        >
          <div
            className="h-px"
            style={{
              width: 'clamp(160px, 20vw, 280px)',
              background: 'linear-gradient(90deg, transparent 0%, rgba(30,107,147,0.40) 50%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Subtitles: Society & Institution in Michroma */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2 mb-14"
        >
          <p
            className="font-brand text-xs sm:text-sm uppercase tracking-[0.22em]"
            style={{ color: '#1E6B93' }}
          >
            Official Electronics Students Society
          </p>
          <p
            className="font-brand text-[10px] sm:text-xs uppercase tracking-[0.18em]"
            style={{ color: '#6B7280' }}
          >
            College of Engineering Chengannur
          </p>
        </motion.div>

        {/* Explore ExESS Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ElectricalSignalButton onClick={scrollToAbout} />
        </motion.div>
      </motion.div>

      {/* PCB Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 0.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <PCBScrollIndicator onClick={scrollToAbout} />
      </motion.div>
    </section>
  )
}

export default Hero
