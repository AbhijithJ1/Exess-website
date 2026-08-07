import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Handcrafted PCB Vector Illustration (Subtle SVG Line-Art) ────────────
const PCBLineArt = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
    viewBox="0 0 240 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20 H80 L110 50 H180 L200 70 H230"
      stroke="rgba(30, 107, 147, 0.12)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 60 H50 L80 90 H150 L170 110 H230"
      stroke="rgba(50, 197, 232, 0.18)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 100 H100 L130 130 H230"
      stroke="rgba(30, 107, 147, 0.12)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="80" cy="20" r="3.5" fill="rgba(30, 107, 147, 0.25)" />
    <circle cx="110" cy="50" r="3.5" fill="#32C5E8" />
    <circle cx="80" cy="90" r="3.5" fill="rgba(30, 107, 147, 0.25)" />
    <circle cx="170" cy="110" r="3.5" fill="#32C5E8" />
  </svg>
)

const About = () => {
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation()
  const { ref: mvRef, isVisible: mvVisible } = useScrollAnimation()

  return (
    <section id="circuits" className="relative section-gap overflow-hidden bg-background">
      <div id="about" className="absolute -top-24" />

      <div className="section-padding relative z-10 max-w-6xl mx-auto">

        {/* ── 1. Power-On Section Header ───────────────────────────────── */}
        <PowerOnHeader
          badge="Departmental Technical Forum"
          headline={
            <>
              Electronics Students Society{' '}
              <span className="text-light-sweep-dark">(ExESS)</span>
            </>
          }
          description="The official technical forum of the Department of Electronics and Communication Engineering at College of Engineering Chengannur."
          maxW="max-w-3xl"
        />

        {/* ── 2. About ExESS Overview Card + Reserved Media Area ──── */}
        <motion.div
          ref={overviewRef}
          initial="hidden"
          animate={overviewVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-16 sm:mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="relative p-8 sm:p-12 lg:p-14 rounded-3xl bg-white border border-border/70 shadow-soft overflow-hidden grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Corner PCB illustration */}
            <PCBLineArt className="absolute top-0 right-0 w-64 h-44 opacity-80" />

            <div className="relative z-10 lg:col-span-7">
              <span className="text-xs font-grotesk font-bold uppercase tracking-[0.22em] text-primary mb-3 block">
                About ExESS
              </span>
              <h3 className="font-grotesk font-bold text-heading text-2xl sm:text-3xl lg:text-4xl mb-6 tracking-tight leading-tight">
                Pioneering Hardware &amp; Embedded Systems Excellence at CEC
              </h3>
              <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-600 mb-6">
                Electronics Students Society (ExESS) is the technical forum of the Department of Electronics and Communication Engineering, College of Engineering Chengannur.
              </p>
              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-500">
                Driven by student leadership and faculty mentorship, ExESS brings together electronics enthusiasts to explore real-world engineering through hardware prototyping, embedded programming, technical workshops, and skill development.
              </p>
            </div>

            {/* Reserved Media Container for Future Lab / Workshop Photographs */}
            <div className="relative z-10 lg:col-span-5 w-full">
              <ImagePlaceholder
                src={null}
                alt="ExESS Electronics Lab & Department"
                type="cover"
                aspectRatio="aspect-[16/9]"
                badge="LAB_FACILITIES"
                className="shadow-soft border border-border/80"
              />
              <span className="block text-[11px] font-mono text-gray-400 text-center mt-2.5">
                Electronics Lab &amp; Workshop Space &bull; College of Engineering Chengannur
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── 3. Dual Mission & Vision Cards ────────────────────────────── */}
        <motion.div
          ref={mvRef}
          initial="hidden"
          animate={mvVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* OUR MISSION */}
          <motion.div
            variants={itemVariants}
            className="relative group p-8 sm:p-10 rounded-3xl bg-white border border-border/70 shadow-soft transition-all duration-400 hover:shadow-soft-lg hover:border-primary/30 overflow-hidden flex flex-col justify-between"
          >
            <PCBLineArt className="absolute bottom-0 right-0 w-52 h-36 opacity-40 group-hover:opacity-75 transition-opacity duration-400" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/[0.08] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Target className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-xs font-grotesk font-bold uppercase tracking-[0.22em] text-primary mb-2 block">
                Purpose &amp; Focus
              </span>
              <h3 className="font-grotesk font-bold text-heading text-2xl sm:text-3xl mb-4 tracking-tight">
                Our Mission
              </h3>
              <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-600">
                Our mission is to strengthen students&apos; technical knowledge through workshops, technical talks, hands-on sessions, hackathons, competitions, PCB design activities, embedded systems learning, and industry-oriented skill development.
              </p>
            </div>
          </motion.div>

          {/* OUR VISION */}
          <motion.div
            variants={itemVariants}
            className="relative group p-8 sm:p-10 rounded-3xl bg-white border border-border/70 shadow-soft transition-all duration-400 hover:shadow-soft-lg hover:border-accent/40 overflow-hidden flex flex-col justify-between"
          >
            <PCBLineArt className="absolute bottom-0 right-0 w-52 h-36 opacity-40 group-hover:opacity-75 transition-opacity duration-400" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-accent/[0.12] flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <Compass className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-xs font-grotesk font-bold uppercase tracking-[0.22em] text-secondary mb-2 block">
                Aspiration &amp; Legacy
              </span>
              <h3 className="font-grotesk font-bold text-heading text-2xl sm:text-3xl mb-4 tracking-tight">
                Our Vision
              </h3>
              <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-600">
                To serve as a benchmark student engineering body that nurtures inquisitive minds, inspires hardware innovation, and empowers electronics undergraduates to become competent, industry-ready technology leaders.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default About
