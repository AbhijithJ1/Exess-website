import { motion } from 'framer-motion'
import { Target, Compass, Cpu, MapPin } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'

// Handcrafted PCB Vector Lines Connecting Vision & Mission
const PCBConvergenceLines = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
    viewBox="0 0 800 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 100 H350 L400 50 L450 100 H750"
      stroke="rgba(30, 107, 147, 0.20)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
    />
    <circle cx="400" cy="50" r="4" fill="#32C5E8" />
  </svg>
)

const About = () => {
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation()
  const { ref: mvRef, isVisible: mvVisible } = useScrollAnimation()

  return (
    <section id="circuits" className="relative section-gap overflow-hidden bg-background">
      <div id="about" className="absolute -top-24" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">

        {/* ── 1. Storytelling Header (No "Departmental Technical Forum" Badge) ── */}
        <PowerOnHeader
          headline={
            <>
              Electronics Students Society{' '}
              <span className="text-light-sweep-dark">(ExESS)</span>
            </>
          }
          description="The official technical body of the Department of Electronics and Communication Engineering at College of Engineering Chengannur."
          maxW="max-w-3xl"
        />

        {/* ── 2. Asymmetric Storytelling Layout & Location Module ─────── */}
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, y: 24 }}
          animate={overviewVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24"
        >
          <div className="relative py-8 lg:py-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center border-y border-border/60">
            <div className="relative z-10 lg:col-span-7">
              <span className="text-xs font-brand uppercase tracking-[0.20em] text-primary mb-3 block font-semibold">
                ABOUT ExESS
              </span>

              {/* Large Typographic Headline */}
              <h3 className="font-brand text-heading text-2xl sm:text-3xl lg:text-4xl mb-6 tracking-tight leading-snug">
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

            {/* Reserved Hardware Media Frame + Styled Location Badge */}
            <div className="relative z-10 lg:col-span-5 w-full space-y-3">
              <div className="rounded-3xl overflow-hidden border border-border/70 shadow-soft bg-white p-2">
                <ImagePlaceholder
                  src={null}
                  alt="ExESS Electronics Lab & Department"
                  type="cover"
                  aspectRatio="aspect-[16/10]"
                  badge="LAB_FACILITIES_CAD"
                />
              </div>

              {/* Integrated Campus Location Card */}
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-brand text-xs text-heading font-semibold">College of Engineering Chengannur</h5>
                    <p className="text-[10px] font-mono text-gray-400">Lat 9.3174° N &bull; Long 76.6175° E</p>
                  </div>
                </div>
                <span className="text-[9px] font-brand uppercase tracking-wider text-primary font-bold px-2 py-1 rounded bg-primary/10">
                  CEC
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 3. Mission & Vision — Opposing Directional Convergence ────────── */}
        <div ref={mvRef} className="relative pt-4">
          <PCBConvergenceLines />

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {/* VISION — Reveals from Left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

            {/* MISSION — Reveals from Right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
