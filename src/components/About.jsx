import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
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

        {/* ── 1. Storytelling Header ───────────────────────────────────── */}
        <PowerOnHeader
          headline={
            <>
              Electronics Students Society{' '}
              <span className="text-light-sweep-dark">(ExESS)</span>
            </>
          }
          description="The official technical forum of the Department of Electronics and Communication Engineering at College of Engineering Chengannur."
          maxW="max-w-3xl"
        />

        {/* ── 2. Editorial Layout with Scroll Scale & Reveal Animation ── */}
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          animate={overviewVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28"
        >
          <div className="relative py-8 lg:py-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center border-y border-border/60">
            {/* Left Column (60%): Exact Official ExESS Narrative Content */}
            <div className="relative z-10 lg:col-span-7 text-left">
              <span className="text-xs font-brand uppercase tracking-[0.22em] text-primary mb-3 block font-bold">
                ABOUT ExESS
              </span>

              <h2 className="font-brand text-heading text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-[1.15]">
                Pioneering <span className="text-primary font-bold">Hardware</span> &amp;{' '}
                <span className="text-primary font-bold">Embedded Systems</span> Excellence at CEC
              </h2>

              <p className="font-inter text-body text-base sm:text-lg leading-relaxed text-gray-700 mb-5 font-normal">
                Electronics Students Society (ExESS) is a technical forum for students in the electronics department of College of Engineering Chengannur. The primary goal of ExESS is to explore and strengthen the technical knowledge and practical skills of our students and make them industry-ready. We also intend to highlight what’s new and coming in the realm of electronics to help students comprehend technology and push it beyond what the world has seen.
              </p>

              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600 mb-5">
                ExESS arranges a variety of activities for students throughout the year. Its workshops to gain hands-on experience, hackathons for practical problem solving, and quiz programmes were marked by active participation of our students. Webinar series on some of the most relevant topics by eminent personnel were also conducted.
              </p>

              <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                ExESS constantly encourages and motivates students to take on challenging tasks and engage in practical problem solving.
              </p>
            </div>

            {/* Right Column (40%): Hardware Visual Frame */}
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

        {/* ── 3. Mission & Vision — Opposing Directional Convergence ────────── */}
        <div ref={mvRef} className="relative pt-6">
          <PCBConvergenceLines />

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* VISION — Enters from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
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
                  OUR VISION
                </h3>
                <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                  To serve as a benchmark student engineering body that nurtures inquisitive minds, inspires hardware innovation, and empowers electronics undergraduates to become competent, industry-ready technology leaders.
                </p>
              </div>
            </motion.div>

            {/* MISSION — Enters from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={mvVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
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
                  OUR MISSION
                </h3>
                <p className="font-inter text-body text-sm sm:text-base leading-relaxed text-gray-600">
                  Our mission is to strengthen students&apos; technical knowledge through workshops, technical talks, hands-on sessions, hackathons, competitions, PCB design activities, embedded systems learning, and industry-oriented skill development.
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
