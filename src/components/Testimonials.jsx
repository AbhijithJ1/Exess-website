import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'

/**
 * Testimonials — "HUGE QUOTE -> RETRACT -> SIGNAL CORE -> NEXT QUOTE EMERGES"
 *
 * Motion Grammar:
 *   - HUGE QUOTE symbol dominates.
 *   - Upon entering view, quote retracts into central glowing signal core.
 *   - Core expands into testimonial stage.
 *   - Replayable: plays on enter, resets on leave.
 *   - Auto-cycles every 5 seconds using the same signal-core transition.
 *   - Autoplay pauses when section is out of view or on hover.
 *   - Arrow controls reset the autoplay timer.
 */
const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [transmitting, setTransmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)
  const autoplayRef = useRef(null)

  // Intersection Observer — only autoplay when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const triggerQuoteSwap = useCallback((dir, resetTimer = true) => {
    if (transmitting) return
    setTransmitting(true)
    setDirection(dir)
    setTimeout(() => {
      setActiveIdx((prev) => (prev + dir + testimonialsData.length) % testimonialsData.length)
      setTransmitting(false)
    }, 450)
    // Reset autoplay timer after manual interaction
    if (resetTimer) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [transmitting])

  // Autoplay loop — runs only when visible and not paused
  useEffect(() => {
    if (!isVisible || isPaused) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
      return
    }

    autoplayRef.current = setInterval(() => {
      triggerQuoteSwap(1, false)
    }, 2000)

    return () => clearInterval(autoplayRef.current)
  }, [isVisible, isPaused, activeIdx, triggerQuoteSwap])

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const current = testimonialsData[activeIdx]

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative section-gap overflow-hidden bg-transparent"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div id="alumni" className="absolute -top-24" />

      <div className="section-padding max-w-7xl mx-auto relative z-10 min-h-[85vh] flex flex-col items-center justify-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="w-full relative flex flex-col items-center justify-center min-h-[500px]"
        >

          {/* Phase 1: HUGE QUOTE */}
          {!prefersReducedMotion && (
            <motion.div
              variants={{
                hidden: { scale: 3, opacity: 1 },
                visible: { scale: 0, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
              }}
              className="absolute inset-0 flex items-center justify-center text-[20rem] sm:text-[30rem] font-serif text-cyan-500/20 leading-none z-20 pointer-events-none origin-center"
            >
              &ldquo;
            </motion.div>
          )}

          {/* Phase 3: TESTIMONIAL STAGE REVEAL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scaleY: prefersReducedMotion ? 1 : 0.1, filter: prefersReducedMotion ? "none" : "blur(20px)" },
              visible: {
                opacity: 1,
                scaleY: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8, delay: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="w-full max-w-4xl relative z-10"
          >
            <div className="text-center mb-8">
              <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2">
                COMMUNITY VOICES &amp; ALUMNI TESTIMONIALS
              </span>
              <h2 className="font-brand text-heading text-4xl sm:text-5xl font-bold tracking-tight leading-[1.0] text-light-sweep-dark">
                TESTIMONIALS
              </h2>
            </div>

            <div
              className="bg-white/80 border border-border/80 p-5 sm:p-8 lg:p-12 rounded-3xl shadow-soft-lg backdrop-blur-sm relative"
            >

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  initial={{ scaleY: prefersReducedMotion ? 1 : 1.6, opacity: 0, filter: prefersReducedMotion ? 'none' : 'blur(10px)', y: direction * 16 }}
                  animate={{ scaleY: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ scaleY: prefersReducedMotion ? 1 : 0.2, opacity: 0, filter: prefersReducedMotion ? 'none' : 'blur(10px)', y: -direction * 16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center center' }}
                >
                  <blockquote className="font-inter text-base sm:text-xl md:text-2xl lg:text-3xl text-heading leading-relaxed font-medium italic mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border/60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border/80 bg-slate-100 flex-shrink-0">
                        <ImagePlaceholder
                          src={current.image}
                          alt={current.name}
                          type="avatar"
                          aspectRatio="w-full h-full"
                          initials={current.initials}
                        />
                      </div>
                      <div>
                        <h4 className="font-brand font-bold text-heading text-base">{current.name}</h4>
                        <p className="font-inter text-xs text-primary font-semibold">{current.role} &bull; {current.company}</p>
                        <span className="font-mono text-[10px] text-gray-400">Batch of {current.batch}</span>
                      </div>
                    </div>

                    {/* Progress dots + controls */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3">
                      {/* Dot indicators */}
                      <div className="flex gap-1.5">
                        {testimonialsData.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (i !== activeIdx) triggerQuoteSwap(i > activeIdx ? 1 : -1)
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIdx ? 'bg-primary scale-125' : 'bg-border/60'}`}
                            aria-label={`Go to testimonial ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Arrow controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => triggerQuoteSwap(-1)}
                          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => triggerQuoteSwap(1)}
                          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default Testimonials
