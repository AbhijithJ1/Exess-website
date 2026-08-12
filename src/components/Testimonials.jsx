import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const TestimonialsPCBBackground = ({ activeIdx, total }) => {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible opacity-35 z-0"
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="rgba(30, 107, 147, 0.25)" strokeWidth="1.5" strokeLinecap="square">
        <path d="M0 60 H400 L480 160 H960 L1040 60 H1440" />
        <path d="M0 280 H300 L380 200 H1060 L1140 280 H1440" stroke="rgba(50, 197, 232, 0.30)" />
      </g>

      <circle
        cx={480 + (480 * (activeIdx / Math.max(1, total - 1)))}
        cy="160"
        r="5"
        fill="#32C5E8"
        className="transition-all duration-700 ease-out shadow-[0_0_12px_#32C5E8]"
      />
    </svg>
  )
}

const Testimonials = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.15 })
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  // Trigger Section Power-Up Electrical Surge on entry
  useEffect(() => {
    if (sectionVisible) {
      window.dispatchEvent(new CustomEvent('exess-section-powerup'))
    }
  }, [sectionVisible])

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIdx((prev) => (prev + 1) % testimonialsData.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonialsData[activeIdx]

  const handleNext = () => {
    setDirection(1)
    setActiveIdx((prev) => (prev + 1) % testimonialsData.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  return (
    <section ref={sectionRef} id="testimonials" className="relative section-gap overflow-hidden bg-transparent">
      <div id="alumni" className="absolute -top-24" />

      {/* PCB Circuit Traces Flowing Across Full Viewport Width */}
      <TestimonialsPCBBackground activeIdx={activeIdx} total={testimonialsData.length} />

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* ── 1. Section Header ───────────────────────────────────────── */}
        <PowerOnHeader
          badge="COMMUNITY VOICES"
          headline={<>Human <span className="text-light-sweep-dark">Signal</span></>}
          description="Direct experiences from students, faculty mentors, workshop participants, and alumni."
          align="left"
        />

        {/* ── 2. ONE DOMINANT TESTIMONIAL STAGE ───────────────────────── */}
        <div className="relative max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 border border-border/80 shadow-soft-lg min-h-[380px] flex flex-col justify-between overflow-hidden">
          
          <div className="relative">
            <Quote className="w-12 h-12 text-primary/15 mb-6" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -direction * 40, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-inter text-lg sm:text-2xl md:text-3xl text-heading leading-relaxed font-medium italic mb-8">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex-shrink-0">
                      <ImagePlaceholder
                        src={current.image}
                        alt={current.name}
                        type="circle"
                        aspectRatio="aspect-square"
                        initials={current.initials}
                      />
                    </div>
                    <div>
                      <h4 className="font-brand text-base sm:text-lg text-heading font-bold">{current.name}</h4>
                      <p className="font-inter text-xs font-semibold text-primary uppercase tracking-wider">{current.role}</p>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full text-[10px] font-brand uppercase tracking-widest bg-primary/10 text-primary font-bold self-start sm:self-center">
                    {current.category}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage Controls & Index Counter */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/40">
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIdx ? 1 : -1)
                    setActiveIdx(idx)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-8 bg-primary shadow-[0_0_8px_#32C5E8]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-400 font-bold">
                0{activeIdx + 1} / 0{testimonialsData.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Testimonials
