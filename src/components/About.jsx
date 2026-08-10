import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ImagePlaceholder from './ImagePlaceholder'

// Animated PCB Signal Lines that activate when Mission & Vision enter view
const PCBSignalTraces = ({ isVisible }) => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible z-0"
    viewBox="0 0 1200 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base Trace Paths */}
    <path
      d="M0 40 H450 L520 120 H680 L750 200 H1200"
      stroke="rgba(30, 107, 147, 0.15)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M1200 40 H750 L680 120 H520 L450 200 H0"
      stroke="rgba(50, 197, 232, 0.18)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Animated Signal Pulse when visible */}
    {isVisible && (
      <>
        <circle r="4" fill="#32C5E8">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M0 40 H450 L520 120 H680 L750 200 H1200" />
        </circle>
        <circle r="4" fill="#1E6B93">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M1200 40 H750 L680 120 H520 L450 200 H0" />
        </circle>
      </>
    )}
  </svg>
)

const About = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.15 })
  const { ref: mvRef, isVisible: mvVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section id="circuits" className="relative section-gap overflow-hidden bg-transparent">
      <div id="about" className="absolute -top-24" />

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* ── 1. EDITORIAL STORY HEADLINE ────────────────────────────────── */}
        <div ref={storyRef} className="mb-16 sm:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-border/60 pb-12 sm:pb-16">
            {/* Left Eyebrow Column */}
            <div className="lg:col-span-3">
              <span className="section-label font-brand inline-flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="section-label-text font-brand uppercase tracking-[0.22em] text-[10px] font-bold text-primary">
                  ABOUT ExESS
                </span>
              </span>
            </div>

            {/* Center/Right Very Large Editorial Statement */}
            <div className="lg:col-span-9">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={storyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-brand text-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.14] mb-8"
              >
                Pioneering <span className="text-primary">Hardware</span> &amp;{' '}
                <span className="text-primary">Embedded Systems</span> Excellence at College of Engineering Chengannur.
              </motion.h2>

              {/* Editorial Split Paragraphs */}
              <div className="grid md:grid-cols-12 gap-8 items-start pt-4 border-t border-border/40">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={storyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                  className="md:col-span-7 space-y-4"
                >
                  <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-800 font-normal">
                    Electronics Students Society (ExESS) is the official departmental forum at CEC. Our mission is to transform theoretical understanding into real-world hardware engineering mastery.
                  </p>
                  <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                    Throughout the academic calendar, ExESS organizes hands-on PCB fabrication bootcamps, synthesizable Verilog/FPGA workshops, national hackathons, and guest lecture series from silicon industry specialists.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={storyVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.65, delay: 0.35 }}
                  className="md:col-span-5 w-full"
                >
                  <div className="rounded-3xl overflow-hidden border border-border/80 shadow-soft bg-white p-2">
                    <ImagePlaceholder
                      src={null}
                      alt="ExESS Electronics Lab & CAD Facilities"
                      type="cover"
                      aspectRatio="aspect-[16/10]"
                      badge="LAB_FACILITIES_CAD"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. MISSION & VISION EDITORIAL STATEMENTS ("Powered into view") ── */}
        <div ref={mvRef} className="relative pt-6">
          <PCBSignalTraces isVisible={mvVisible} />

          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 relative z-10">
            
            {/* VISION EDITORIAL STATEMENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border border-border/80 shadow-soft hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-brand uppercase tracking-[0.22em] text-secondary font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    ASPIRATION &amp; LEGACY
                  </span>
                  <Compass className="w-6 h-6 text-secondary" />
                </div>

                <h3 className="font-brand text-heading text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
                  OUR VISION
                </h3>

                <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
                  To serve as a benchmark student engineering body that nurtures inquisitive minds, inspires hardware innovation, and empowers electronics undergraduates to become competent, industry-ready technology leaders.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-border/40 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>SYSTEM_VISION // CEC</span>
                <span className="w-2 h-2 rounded-full bg-secondary/50" />
              </div>
            </motion.div>

            {/* MISSION EDITORIAL STATEMENT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border border-border/80 shadow-soft hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-brand uppercase tracking-[0.22em] text-primary font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    PURPOSE &amp; ACTION
                  </span>
                  <Target className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-brand text-heading text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
                  OUR MISSION
                </h3>

                <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
                  Our mission is to strengthen students&apos; technical knowledge through workshops, technical talks, hands-on sessions, hackathons, competitions, PCB design activities, embedded systems learning, and industry-oriented skill development.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-border/40 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>SYSTEM_MISSION // CEC</span>
                <span className="w-2 h-2 rounded-full bg-primary/50" />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About
