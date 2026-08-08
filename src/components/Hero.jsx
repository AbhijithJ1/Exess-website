import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PcbLightButton from './PcbLightButton'

/**
 * HeroBackground — Continuous PCB Infrastructure & Signal Beam
 * PCB traces remain visible and connect towards the central ExESS logo area.
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
        <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.06" />
        <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>

      {/* Signal Light Beam Path Animation */}
      <linearGradient id="signalPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#32C5E8" stopOpacity="0" />
        <stop offset="50%" stopColor="#32C5E8" stopOpacity="1" />
        <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Continuous PCB Copper Routing Lines Connecting Towards Central Logo */}
    <g stroke="rgba(30,107,147,0.12)" strokeWidth="1.2" fill="none" strokeLinecap="square">
      <path d="M0 140 H220 L380 280 H620" />
      <path d="M0 240 H160 L300 360 H580" stroke="rgba(50,197,232,0.18)" />

      <path d="M1440 140 H1220 L1060 280 H820" />
      <path d="M1440 240 H1280 L1140 360 H860" stroke="rgba(50,197,232,0.18)" />

      <path d="M0 760 H220 L380 620 H620" />
      <path d="M1440 760 H1220 L1060 620 H820" />
    </g>

    {/* Via Pads at Trace Ends near Central Logo */}
    <g fill="rgba(30,107,147,0.30)">
      <circle cx="620" cy="280" r="3.5" />
      <circle cx="580" cy="360" r="3" fill="#32C5E8" />
      <circle cx="820" cy="280" r="3.5" />
      <circle cx="860" cy="360" r="3" fill="#32C5E8" />
      <circle cx="620" cy="620" r="3" />
      <circle cx="820" cy="620" r="3" />
    </g>

    {/* Technical Crosshairs */}
    <g stroke="rgba(30,107,147,0.15)" strokeWidth="0.8">
      <path d="M24 40 H40 M32 32 V48" />
      <path d="M1416 40 H1400 M1408 32 V48" />
      <path d="M24 860 H40 M32 852 V868" />
      <path d="M1416 860 H1400 M1408 852 V868" />
    </g>

    <rect x="0" y="0" width="1440" height="900" fill="url(#hlg)" />
  </svg>
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
  const exessLetters = ['E', 'x', 'E', 'S', 'S']

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
        {/* "Expand" Entrance Animation — Letter-by-Letter Reveal */}
        <motion.div className="mb-6 flex items-center justify-center select-none overflow-hidden">
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight flex"
            style={{
              fontSize: 'clamp(4.5rem, 15vw, 12rem)',
              lineHeight: '0.9',
              letterSpacing: '-0.04em',
            }}
          >
            {exessLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: D + index * 0.08,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Precision Hairline Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: D + 0.45, duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
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
          transition={{ delay: D + 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Signature PcbLightButton CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <PcbLightButton onClick={scrollToAbout}>
            Explore ExESS
          </PcbLightButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
