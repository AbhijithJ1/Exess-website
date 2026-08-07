import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * HeroBackground — Cleaner Engineering Atmosphere
 *
 * Clean, open engineering background with plenty of whitespace:
 * Features subtle PCB traces, blueprint lines, and soft radial background
 * gradients for a high-end engineering feel. No vertical lines crossing navbar.
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
      <radialGradient id="hlg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.05" />
        <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Subtle PCB Copper Routing — Open Whitespace Lines */}
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
 * Premium CTA Button — Minimal, modern engineering micro-interaction
 */
const ElectricalSignalButton = ({ onClick }) => (
  <button
    id="hero-explore-btn"
    onClick={onClick}
    className="group relative inline-flex items-center gap-3.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full font-brand text-xs sm:text-sm text-white tracking-wider overflow-hidden cursor-pointer bg-slate-900 border border-primary/30 hover:border-primary/70 transition-all duration-300 shadow-soft hover:shadow-soft-lg active:scale-95"
  >
    {/* Subtle signal pulse gradient highlight on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <span className="relative z-10 font-semibold">Explore ExESS</span>

    <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-accent group-hover:bg-primary group-hover:text-white transition-all duration-300">
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
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
          className="flex flex-col items-center gap-2 mb-12"
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

        {/* Premium Redesigned CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ElectricalSignalButton onClick={scrollToAbout} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
