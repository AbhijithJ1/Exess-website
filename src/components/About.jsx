import { motion } from 'framer-motion'
import { Target, Compass, Zap, Cpu } from 'lucide-react'
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
    />
    <path
      d="M10 60 H50 L80 90 H150 L170 110 H230"
      stroke="rgba(50, 197, 232, 0.18)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="80" cy="20" r="3" fill="rgba(30, 107, 147, 0.25)" />
    <circle cx="110" cy="50" r="3" fill="#32C5E8" />
  </svg>
)

const About = () => {
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation()
  const { ref: mvRef, isVisible: mvVisible } = useScrollAnimation()

  return (
    <section id="circuits" className="relative section-gap overflow-hidden bg-background">
      <div id="about" className="absolute -top-24" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">

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

        {/* ── 2. Premium Two-Column Editorial Layout ─────────────────────── */}
        <motion.div
          ref={overviewRef}
          initial="hidden"
          animate={overviewVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-16 sm:mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="relative py-8 lg:py-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center border-y border-border/60"
          >
            {/* Subtle background PCB illustration */}
            <PCBLineArt className="absolute top-0 right-0 w-64 h-44 opacity-40 pointer-events-none" />

            <div className="relative z-10 lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] border border-primary/15 mb-4">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-brand uppercase tracking-[0.20em] text-primary font-semibold">
                  Engineering Ecosystem
                </span>
              </div>

              <h3 className="font-brand text-heading text-xl sm:text-2xl lg:text-3xl mb-6 tracking-tight leading-snug">
                Pioneering <span className="text-primary font-semibold">Hardware</span> &amp;{' '}
                <span className="text-primary font-semibold">Embedded Systems</span> Excellence at CEC
              </h3>

              <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-600 mb-5">
                Electronics Students Society (ExESS) is the premier technical body of the Department of Electronics and Communication Engineering at College of Engineering Chengannur.
              </p>

              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-500">
                Driven by student <span className="text-primary font-semibold">Leadership</span> and faculty mentorship, ExESS unites electronics enthusiasts to foster <span className="text-primary font-semibold">Innovation</span> through hands-on <span className="text-primary font-semibold">Workshops</span>, multi-layer PCB design, microcontroller debugging, and collaborative <span className="text-primary font-semibold">Community</span> projects.
              </p>
            </div>

            {/* Reserved Hardware / Lab Facilities Media Frame */}
            <div className="relative z-10 lg:col-span-5 w-full">
              <ImagePlaceholder
                src={null}
                alt="ExESS Electronics Lab & Department"
                type="cover"
                aspectRatio="aspect-[16/10]"
                badge="LAB_FACILITIES_CAD"
                className="shadow-soft"
              />
              <span className="block text-[10px] font-mono text-gray-400 text-center mt-2.5">
                Electronics Lab &amp; Hardware Prototyping Space &bull; CEC
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── 3. Mission & Vision — Premium Glass Feature Panels ──────────── */}
        <motion.div
          ref={mvRef}
          initial="hidden"
          animate={mvVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 sm:gap-10 pt-2"
        >
          {/* OUR MISSION */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/[0.08] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Target className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-[10px] font-brand uppercase tracking-[0.20em] text-primary mb-2 block font-semibold">
                Purpose &amp; Focus
              </span>
              <h3 className="font-brand text-heading text-xl sm:text-2xl mb-4 tracking-tight">
                Our Mission
              </h3>
              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                To empower students through hands-on <span className="text-primary font-semibold">Workshops</span>, technical bootcamps, competitions, and <span className="text-primary font-semibold">Embedded Systems</span> learning that bridge textbook circuit theory with industry-grade hardware engineering.
              </p>
            </div>
          </motion.div>

          {/* OUR VISION */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-accent/[0.12] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Compass className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-[10px] font-brand uppercase tracking-[0.20em] text-secondary mb-2 block font-semibold">
                Aspiration &amp; Legacy
              </span>
              <h3 className="font-brand text-heading text-xl sm:text-2xl mb-4 tracking-tight">
                Our Vision
              </h3>
              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                To establish ExESS as a benchmark departmental society that nurtures inquisitive minds, inspires continuous <span className="text-primary font-semibold">Hardware</span> <span className="text-primary font-semibold">Innovation</span>, and equips undergraduates to become technical leaders in electronics.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default About
