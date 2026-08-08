import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ImagePlaceholder from './ImagePlaceholder'

// Handcrafted PCB Vector Lines Connecting Vision & Mission Across Wide Viewport
const PCBConvergenceLines = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible opacity-30"
    viewBox="0 0 1200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 100 H550 L600 50 L650 100 H1150"
      stroke="rgba(30, 107, 147, 0.35)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
    />
    <circle cx="600" cy="50" r="4" fill="#32C5E8" />
  </svg>
)

const About = () => {
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation()
  const { ref: mvRef, isVisible: mvVisible } = useScrollAnimation()

  return (
    <section id="circuits" className="relative section-gap overflow-hidden bg-transparent">
      <div id="about" className="absolute -top-24" />

      <div className="section-padding relative z-10">

        {/* ── 1. Asymmetric Storytelling Layout (Left 60% / Right 40%) ─────── */}
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, y: 30 }}
          animate={overviewVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28"
        >
          <div className="relative py-8 lg:py-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center border-y border-border/60">
            {/* Left Column (60%): Editorial Story & Large Typography */}
            <div className="relative z-10 lg:col-span-7 text-left">
              <span className="text-xs font-brand uppercase tracking-[0.22em] text-primary mb-3 block font-bold">
                ABOUT ExESS
              </span>

              {/* Large Oversized Storytelling Headline */}
              <h2 className="font-brand text-heading text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
                Pioneering <span className="text-primary font-bold">Hardware</span> &amp;{' '}
                <span className="text-primary font-bold">Embedded Systems</span> Excellence at CEC
              </h2>

              <p className="font-inter text-body text-base sm:text-xl leading-relaxed text-gray-700 mb-6 max-w-2xl font-normal">
                Electronics Students Society (ExESS) is the premier technical body of the Department of Electronics and Communication Engineering at College of Engineering Chengannur.
              </p>

              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-500 max-w-2xl">
                Driven by student <span className="text-primary font-semibold">Leadership</span> and faculty mentorship, ExESS unites electronics enthusiasts to foster <span className="text-primary font-semibold">Innovation</span> through hands-on <span className="text-primary font-semibold">Workshops</span>, multi-layer PCB design, microcontroller debugging, and collaborative <span className="text-primary font-semibold">Community</span> research projects.
              </p>
            </div>

            {/* Right Column (40%): Clean Engineering Visual Module (NO location card under image) */}
            <div className="relative z-10 lg:col-span-5 w-full">
              <div className="rounded-3xl overflow-hidden border border-border/70 shadow-soft bg-white p-2.5">
                <ImagePlaceholder
                  src={null}
                  alt="ExESS Electronics Lab & Department"
                  type="cover"
                  aspectRatio="aspect-[16/11]"
                  badge="LAB_FACILITIES_CAD"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. Mission & Vision — Opposing Directional Convergence (Full Screen Width) ── */}
        <div ref={mvRef} className="relative pt-6">
          <PCBConvergenceLines />

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* VISION — Enters / Translates from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-accent/[0.12] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Compass className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[11px] font-brand uppercase tracking-[0.20em] text-secondary mb-2 block font-semibold">
                  Aspiration &amp; Legacy
                </span>
                <h3 className="font-brand text-heading text-2xl sm:text-3xl mb-4 tracking-tight">
                  Our Vision
                </h3>
                <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                  To establish ExESS as a benchmark departmental society that nurtures inquisitive minds, inspires continuous <span className="text-primary font-semibold">Hardware</span> <span className="text-primary font-semibold">Innovation</span>, and equips undergraduates to become technical leaders in electronics.
                </p>
              </div>
            </motion.div>

            {/* MISSION — Enters / Translates from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Target className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[11px] font-brand uppercase tracking-[0.20em] text-primary mb-2 block font-semibold">
                  Purpose &amp; Focus
                </span>
                <h3 className="font-brand text-heading text-2xl sm:text-3xl mb-4 tracking-tight">
                  Our Mission
                </h3>
                <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                  To empower students through hands-on <span className="text-primary font-semibold">Workshops</span>, technical bootcamps, competitions, and <span className="text-primary font-semibold">Embedded Systems</span> learning that bridge textbook circuit theory with industry-grade hardware engineering.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
