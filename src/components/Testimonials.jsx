import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'

/**
 * Testimonials — Clean Editorial Presentation with "Human Signal" Animation
 *
 * Key Refinements:
 *   - Removed heavy card container, heavy borders, and dashboard widget look.
 *   - Generous whitespace with centered editorial layout.
 *   - Preserved initial "Human Signal" quote retraction & emergence animation.
 *   - Preserved continuous auto-rotation carousel & manual controls.
 *   - Preserved all original content and metadata.
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

  // Autoplay loop — runs only when visible and not paused (every 4.5 seconds)
  useEffect(() => {
    if (!isVisible || isPaused) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
      return
    }

    autoplayRef.current = setInterval(() => {
      triggerQuoteSwap(1, false)
    }, 4500)

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
      className="relative section-gap overflow-hidden bg-transparent py-16 sm:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div id="alumni" className="absolute -top-24" />

      <div className="section-padding max-w-4xl mx-auto relative z-10">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="w-full relative flex flex-col items-center justify-center min-h-[420px]"
        >

          {/* Phase 1: HUGE QUOTE RETRACTION */}
          {!prefersReducedMotion && (
            <motion.div
              variants={{
                hidden: { scale: 3, opacity: 1 },
                visible: { scale: 0, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
              }}
              className="absolute inset-0 flex items-center justify-center text-[18rem] sm:text-[26rem] font-serif text-cyan-500/15 leading-none z-20 pointer-events-none origin-center"
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
            className="w-full relative z-10"
          >
            {/* Section Header */}
            <div className="text-center mb-10">
              <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2">
                COMMUNITY VOICES &amp; ALUMNI TESTIMONIALS
              </span>
              <h2
                className="font-brand text-heading font-bold tracking-tight leading-[1.0] text-light-sweep-dark"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
              >
                TESTIMONIALS
              </h2>
            </div>

            {/* Clean Editorial Testimonial Body (No heavy card, no border box) */}
            <div className="relative py-2 px-2 sm:px-6">

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  initial={{ scaleY: prefersReducedMotion ? 1 : 1.4, opacity: 0, filter: prefersReducedMotion ? 'none' : 'blur(8px)', y: direction * 14 }}
                  animate={{ scaleY: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ scaleY: prefersReducedMotion ? 1 : 0.3, opacity: 0, filter: prefersReducedMotion ? 'none' : 'blur(8px)', y: -direction * 14 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center center' }}
                  className="flex flex-col"
                >
                  {/* Large Editorial Quotation */}
                  <blockquote className="font-inter text-lg sm:text-2xl lg:text-3xl text-heading leading-relaxed font-normal italic mb-8 max-w-3xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  {/* Subtle Divider */}
                  <div className="w-full border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    
                    {/* Compact Profile */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                        <ImagePlaceholder
                          src={current.image}
                          alt={current.name}
                          type="avatar"
                          aspectRatio="w-full h-full"
                          initials={current.initials}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-brand font-bold text-heading text-sm sm:text-base leading-tight">
                          {current.name}
                        </h4>
                        <p className="font-inter text-xs text-primary font-medium mt-0.5">
                          {current.role} &bull; {current.company} <span className="text-slate-400 font-mono text-[10px] ml-1">(Batch of {current.batch})</span>
                        </p>
                      </div>
                    </div>

                    {/* Pagination Dots + Minimal Navigation Arrows */}
                    <div className="flex items-center gap-4">
                      {/* Pagination Dots */}
                      <div className="flex gap-1.5 items-center">
                        {testimonialsData.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (i !== activeIdx) triggerQuoteSwap(i > activeIdx ? 1 : -1)
                            }}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              i === activeIdx ? 'bg-primary w-5' : 'bg-slate-300 hover:bg-slate-400 w-1.5'
                            }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Minimal Navigation Arrows */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => triggerQuoteSwap(-1)}
                          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => triggerQuoteSwap(1)}
                          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
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
