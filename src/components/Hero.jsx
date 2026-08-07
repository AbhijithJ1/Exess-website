import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HeroBackground — Light Blueprint Theme
 *
 * Ultra-subtle engineering blueprint background on white field:
 * Continuous top-to-bottom central PCB trace connecting from Intro,
 * 90° PCB traces, via pads, blueprint grid lines, corner crosshairs.
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
      {/* Subtle radial center highlight */}
      <radialGradient id="hlg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.06" />
        <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ── 1. Light Blueprint Grid ───────────────────────────────────────── */}
    <g stroke="rgba(30,107,147,0.04)" strokeWidth="1">
      {Array.from({ length: 25 }, (_, i) => (
        <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="900" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 60} x2="1440" y2={i * 60} />
      ))}
    </g>

    {/* ── 2. Continuous Central Main Power Bus (Connecting from Intro) ──── */}
    <path
      d="M720 0 V240"
      stroke="rgba(30,107,147,0.18)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <circle cx="720" cy="240" r="4" fill="#32C5E8" opacity="0.6" />

    {/* ── 3. PCB Copper Routing — Precise 90° Light Traces ──────────────── */}
    <g stroke="rgba(30,107,147,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="square" strokeLinejoin="miter">
      {/* Top-left bus */}
      <path d="M0 120 H120 V80 H300 V60 H480" />
      <path d="M0 200 H80 V160 H260 V140 H440" stroke="rgba(50,197,232,0.18)" />
      <path d="M0 290 H60 V260 H180" />
      <path d="M120 0 V90 H180 V130" />
      <path d="M240 0 V50 H380 V80" />

      {/* Top-right bus */}
      <path d="M1440 120 H1320 V80 H1140 V60 H960" />
      <path d="M1440 200 H1360 V160 H1180 V140 H1000" stroke="rgba(50,197,232,0.18)" />
      <path d="M1440 290 H1380 V260 H1260" />
      <path d="M1320 0 V90 H1260 V130" />
      <path d="M1200 0 V50 H1060 V80" />

      {/* Bottom-left bus */}
      <path d="M0 780 H120 V820 H300 V840 H480" />
      <path d="M0 700 H80 V740 H260 V760 H440" stroke="rgba(50,197,232,0.18)" />
      <path d="M0 610 H60 V640 H180" />
      <path d="M120 900 V810 H180 V770" />
      <path d="M240 900 V850 H380 V820" />

      {/* Bottom-right bus */}
      <path d="M1440 780 H1320 V820 H1140 V840 H960" />
      <path d="M1440 700 H1360 V740 H1180 V760 H1000" stroke="rgba(50,197,232,0.18)" />
      <path d="M1440 610 H1380 V640 H1260" />
      <path d="M1320 900 V810 H1260 V770" />
      <path d="M1200 900 V850 H1060 V820" />
    </g>

    {/* ── 4. Via Pads at Trace Junctions ───────────────────────────────── */}
    <g fill="rgba(30,107,147,0.22)">
      <circle cx="120" cy="120" r="3.5" /><circle cx="300" cy="80" r="3" />
      <circle cx="80" cy="200" r="3" /><circle cx="260" cy="160" r="2.5" />
      <circle cx="60" cy="290" r="3" /><circle cx="120" cy="90" r="2.5" />
      <circle cx="240" cy="50" r="2.5" />

      <circle cx="1320" cy="120" r="3.5" /><circle cx="1140" cy="80" r="3" />
      <circle cx="1360" cy="200" r="3" /><circle cx="1180" cy="160" r="2.5" />
      <circle cx="1380" cy="290" r="3" /><circle cx="1320" cy="90" r="2.5" />
      <circle cx="1200" cy="50" r="2.5" />

      <circle cx="120" cy="780" r="3.5" /><circle cx="300" cy="820" r="3" />
      <circle cx="80" cy="700" r="3" /><circle cx="260" cy="740" r="2.5" />
      <circle cx="60" cy="610" r="3" /><circle cx="120" cy="810" r="2.5" />
      <circle cx="240" cy="850" r="2.5" />

      <circle cx="1320" cy="780" r="3.5" /><circle cx="1140" cy="820" r="3" />
      <circle cx="1360" cy="700" r="3" /><circle cx="1180" cy="740" r="2.5" />
      <circle cx="1380" cy="610" r="3" /><circle cx="1320" cy="810" r="2.5" />
      <circle cx="1200" cy="850" r="2.5" />
    </g>

    {/* ── 5. Engineering Reference Labels (Light) ───────────────────────── */}
    <g fill="rgba(30,107,147,0.25)" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="0.08em">
      <text x="24" y="32">REV-2.4 // CEC</text>
      <text x="24" y="868">LAYER: TOP_COPPER</text>
      <text x="1310" y="32">GND_PLANE</text>
      <text x="1320" y="868">VCC_3V3</text>
    </g>

    {/* Corner registration crosshairs */}
    <g stroke="rgba(30,107,147,0.18)" strokeWidth="0.8">
      <path d="M18 38 H34 M26 30 V46" />
      <path d="M1422 38 H1406 M1414 30 V46" />
      <path d="M18 862 H34 M26 854 V870" />
      <path d="M1422 862 H1406 M1414 854 V870" />
    </g>

    <rect x="0" y="0" width="1440" height="900" fill="url(#hlg)" />
  </svg>
)

/**
 * ElectricalSignalButton — Micro-interaction
 * Glowing cyan electrical pulse travels smoothly from left to right through the button into the arrow tip.
 */
const ElectricalSignalButton = ({ onClick }) => (
  <button
    id="hero-explore-btn"
    onClick={onClick}
    className="group relative inline-flex items-center gap-4 px-9 py-4 rounded-full font-semibold text-sm sm:text-base text-white overflow-hidden cursor-pointer"
    style={{
      background: 'linear-gradient(135deg, #1E6B93 0%, #187AA3 100%)',
      boxShadow: '0 4px 20px rgba(30, 107, 147, 0.25), 0 1px 2px rgba(0, 0, 0, 0.05)',
      letterSpacing: '0.04em',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #187AA3 0%, #156689 100%)'
      e.currentTarget.style.boxShadow = '0 8px 30px rgba(30, 107, 147, 0.38), 0 2px 4px rgba(0, 0, 0, 0.08)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #1E6B93 0%, #187AA3 100%)'
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(30, 107, 147, 0.25), 0 1px 2px rgba(0, 0, 0, 0.05)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
  >
    <span>Explore ExESS</span>

    {/* Micro PCB trace SVG inside button */}
    <div className="relative flex items-center justify-center ml-1" aria-hidden="true">
      <svg className="w-11 h-4 overflow-visible pointer-events-none" viewBox="0 0 44 16" fill="none">
        {/* Micro PCB trace guide line */}
        <path d="M 2 8 H 28" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2.5" />
        {/* Arrow tip at terminal of trace */}
        <path
          d="M 28 4 L 35 8 L 28 12"
          stroke="#32C5E8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
        {/* Glowing cyan electrical signal pulse traveling from left to right */}
        <circle r="2.5" fill="#32C5E8" style={{ filter: 'drop-shadow(0 0 4px #32C5E8)' }}>
          <animateMotion dur="1.1s" repeatCount="indefinite" path="M 2 8 L 32 8" />
        </circle>
      </svg>
    </div>
  </button>
)

/**
 * PCBScrollIndicator — PCB-Inspired Scroll Indicator
 * Vertical PCB trace line with glowing cyan electrical pulse traveling downward continuously.
 */
const PCBScrollIndicator = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Scroll down to explore"
    className="flex flex-col items-center gap-2.5 transition-colors duration-300 cursor-pointer group"
  >
    <span
      className="font-inter font-semibold uppercase text-slate-400 group-hover:text-primary transition-colors"
      style={{ fontSize: '0.62rem', letterSpacing: '0.28em' }}
    >
      Scroll to explore
    </span>

    {/* Vertical PCB Trace with Traveling Cyan Electrical Pulse */}
    <div className="relative w-4 h-12 flex items-center justify-center">
      <svg className="w-4 h-12 overflow-visible pointer-events-none" viewBox="0 0 16 48" fill="none">
        {/* Ghost vertical PCB trace line */}
        <line x1="8" y1="2" x2="8" y2="40" stroke="rgba(30, 107, 147, 0.25)" strokeWidth="1.6" strokeDasharray="3 3" />
        {/* Via pad at bottom */}
        <circle cx="8" cy="42" r="3" fill="#1E6B93" opacity="0.6" />
        <circle cx="8" cy="42" r="1.2" fill="#FFFFFF" />

        {/* Traveling cyan electrical signal pulse dot */}
        <circle r="2.5" fill="#32C5E8" style={{ filter: 'drop-shadow(0 0 5px #32C5E8)' }}>
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M 8 2 L 8 40" />
        </circle>
      </svg>
    </div>
  </button>
)

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  const heroScale   = useTransform(scrollY, [0, 450], [1, 0.96])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.25])
  const heroY       = useTransform(scrollY, [0, 450], [0, 40])

  const scrollToAbout = () =>
    document.querySelector('#circuits')?.scrollIntoView({ behavior: 'smooth' })

  const D = 0.1

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900"
    >
      {/* Light Blueprint Background */}
      <HeroBackground />

      {/* Hero Content — Minimal & High Impact */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-4xl mx-auto section-padding flex flex-col items-center text-center pt-28 sm:pt-36 pb-20"
      >
        {/* Large EXESS Typography — Light Metal Sweep */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: D, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1
            className="font-grotesk font-black text-light-sweep-dark tracking-tight select-none"
            style={{
              fontSize: 'clamp(5rem, 16vw, 13rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.05em',
            }}
          >
            EXESS
          </h1>
        </motion.div>

        {/* Precision divider hairline */}
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

        {/* Subtitles: Society & Institution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2 mb-14"
        >
          <p
            className="font-inter font-bold uppercase tracking-[0.24em]"
            style={{ fontSize: 'clamp(0.72rem, 1.4vw, 0.9rem)', color: '#1E6B93' }}
          >
            Official Electronics Students Society
          </p>
          <p
            className="font-inter font-medium tracking-[0.16em]"
            style={{ fontSize: 'clamp(0.64rem, 1.2vw, 0.8rem)', color: '#6B7280' }}
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

      {/* PCB-Inspired Scroll Indicator */}
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
