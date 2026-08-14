import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { eventsData } from '../data/eventsData'

const EVENTS_CHARS = ['E', 'V', 'E', 'N', 'T', 'S']
const AUTOPLAY_INTERVAL = 4500

/**
 * Pixel Reveal Image Component
 * Reveals the underlying image through a staggered sweep of pixel blocks
 */
const PixelRevealImage = ({ src, alt, className = '', activeKey = '' }) => {
  const [pixelKey, setPixelKey] = useState(0)

  useEffect(() => {
    setPixelKey((prev) => prev + 1)
  }, [src, activeKey])

  const cols = 8
  const rows = 5
  const totalBlocks = cols * rows

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-900 ${className}`}>
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-none transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />

      {/* Staggered Pixel Grid Overlay Sweep */}
      <div key={pixelKey} className="absolute inset-0 grid grid-cols-8 grid-rows-5 z-20 pointer-events-none">
        {Array.from({ length: totalBlocks }).map((_, i) => {
          const r = Math.floor(i / cols)
          const c = i % cols
          const delay = (r + c) * 0.035

          return (
            <motion.div
              key={`px-${i}`}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay, ease: 'easeOut' }}
              className="bg-[#071826] border border-cyan-500/10"
            />
          )
        })}
      </div>
    </div>
  )
}

/**
 * Events — 3D TUMBLE AUTO-ADVANCING CAROUSEL + PIXEL REVEAL
 *
 * Single-Page Viewport Layout:
 *   - Cards tumble end-over-end (3D rotateX/rotateY flip) as the carousel advances.
 *   - Image reveals through a sweep of pixel blocks (Pixel Reveal).
 *   - Auto-advances every 4.5 seconds so events cycle continuously.
 *   - Fits completely within a single viewport experience (No long scrolling list).
 *   - Clean detail modal lightbox.
 */
const Events = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)
  const [tumbleDirection, setTumbleDirection] = useState(1) // 1 = Next, -1 = Prev
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const sectionRef = useRef(null)
  const autoplayRef = useRef(null)

  const totalEvents = eventsData.length
  const activeEvent = eventsData[activeIdx]

  const handleNext = useCallback(() => {
    setTumbleDirection(1)
    setActiveIdx((prev) => (prev + 1) % totalEvents)
  }, [totalEvents])

  const handlePrev = useCallback(() => {
    setTumbleDirection(-1)
    setActiveIdx((prev) => (prev - 1 + totalEvents) % totalEvents)
  }, [totalEvents])

  // Viewport Observer — only run autoplay when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance Autoplay Timer
  useEffect(() => {
    if (!isInView || isPaused || selectedEvent || showAllModal) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }

    autoplayRef.current = setInterval(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isInView, isPaused, selectedEvent, showAllModal, handleNext])

  // Keybindings / Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedEvent || showAllModal) return
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, selectedEvent, showAllModal])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const charVariants = {
    hidden: { opacity: 0.2, color: '#94A3B8', filter: 'drop-shadow(0 0 0px rgba(50,197,232,0))' },
    visible: { 
      opacity: 1, 
      color: '#1E6B93', 
      filter: 'drop-shadow(0 0 12px rgba(50,197,232,0.6))',
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  // 3D Tumble Variants (Cards tumble end-over-end around 3D axes)
  const tumbleVariants = {
    initial: (dir) => ({
      rotateX: dir > 0 ? 80 : -80,
      rotateY: dir > 0 ? -15 : 15,
      y: dir > 0 ? 90 : -90,
      scale: 0.8,
      opacity: 0
    }),
    animate: {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      rotateX: dir > 0 ? -80 : 80,
      rotateY: dir > 0 ? 15 : -15,
      y: dir > 0 ? -90 : 90,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0]
      }
    })
  }

  return (
    <section
      id="events"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative section-gap overflow-hidden bg-slate-50/40 py-10 sm:py-16 min-h-[100svh] flex flex-col justify-center select-none"
    >
      <div className="section-padding max-w-7xl mx-auto relative z-10 w-full">

        {/* ── 1. SECTION HEADING — NO FILTER TOGGLE BUTTONS ───────────────── */}
        <div className="mb-6 border-b border-border/60 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: '-10%' }}
              className="text-[10px] font-brand uppercase tracking-[0.22em] text-primary font-bold block mb-0.5"
            >
              EVENTS &amp; HACKATHONS
            </motion.span>

            {/* TEMPORAL SEQUENTIAL CHARACTER ACTIVATION */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-10%' }}
              className="flex items-center gap-0.5 sm:gap-1 my-0.5"
            >
              {EVENTS_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="font-brand font-bold tracking-tight leading-none inline-block"
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Tumble Navigation Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
              {String(activeIdx + 1).padStart(2, '0')} / {String(totalEvents).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Previous Event"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Next Event"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 2. SINGLE-VIEWPORT 3D TUMBLE AUTO-ADVANCING CAROUSEL ─────────── */}
        <div className="relative max-w-4xl mx-auto min-h-[360px] sm:min-h-[420px] flex items-center justify-center py-2" style={{ perspective: '1200px' }}>
          <AnimatePresence custom={tumbleDirection} mode="wait">
            <motion.div
              key={activeEvent.id}
              custom={tumbleDirection}
              variants={tumbleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setSelectedEvent(activeEvent)}
              className="relative w-full group cursor-pointer rounded-none border border-border/80 border-t-2 border-t-primary bg-white p-5 sm:p-7 shadow-2xl hover:border-primary/60 transition-colors duration-300 overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-8 items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Left: Event Photo Cover with Pixel Reveal Sweep */}
              <div className="relative w-full md:w-5/12 aspect-[16/10] overflow-hidden border border-border/60 bg-slate-900 flex-shrink-0">
                <PixelRevealImage
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  activeKey={activeEvent.id}
                  className="w-full h-full"
                />
                <div className="absolute top-3 right-3 z-30">
                  <span className={`px-2.5 py-1 rounded-none text-[10px] font-brand tracking-wider font-semibold ${
                    activeEvent.status === 'upcoming'
                      ? 'bg-emerald-500 text-white border border-emerald-400/40 shadow-sm'
                      : 'bg-slate-700/90 text-white border border-slate-600/40'
                  }`}>
                    {activeEvent.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
              </div>

              {/* Right: Event Details */}
              <div className="w-full md:w-7/12 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-brand uppercase tracking-wider font-bold text-primary">
                      {activeEvent.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-inter text-gray-500 truncate">{activeEvent.subtitle}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-brand text-heading mb-3 group-hover:text-primary transition-colors leading-tight">
                    {activeEvent.title}
                  </h3>

                  <p className="font-inter text-xs sm:text-sm text-body leading-relaxed mb-4 line-clamp-3">
                    {activeEvent.description}
                  </p>

                  {/* Date & Location Box */}
                  <div className="grid sm:grid-cols-2 gap-2 mb-4 p-3.5 rounded-none bg-slate-50 border border-border/60 font-inter border-l-2 border-l-primary text-xs text-heading">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-semibold">{activeEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-semibold truncate">{activeEvent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-border/40 flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-2 text-xs font-brand uppercase tracking-wider text-primary group-hover:text-cyan-600 font-bold">
                    View Event Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 3. TIMELINE DOTS & DIRECTORY MODAL BUTTON ───────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          {/* Timeline Nodes Bar */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {eventsData.map((ev, idx) => (
              <button
                key={ev.id}
                onClick={() => {
                  setTumbleDirection(idx > activeIdx ? 1 : -1)
                  setActiveIdx(idx)
                }}
                className={`h-2 transition-all duration-300 rounded-none cursor-pointer ${
                  idx === activeIdx
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to event ${idx + 1}`}
              />
            ))}
          </div>

          {/* Explore All Modal Button */}
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL EVENTS ARCHIVE
          </PcbLightButton>
        </div>

      </div>

      {/* Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ALL ExESS EVENTS ARCHIVE</h3>
                  <p className="text-xs font-inter text-gray-500">Complete directory of workshops, hackathons and technical webinars</p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.map((ev, idx) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      setShowAllModal(false)
                      setActiveIdx(idx)
                    }}
                    className="p-4 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-brand uppercase tracking-wider text-primary block mb-1">{ev.category}</span>
                      <h4 className="font-brand text-sm text-heading font-bold mb-1">{ev.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 font-inter">{ev.description}</p>
                    </div>
                    <span className="text-[10px] font-brand text-primary font-semibold flex items-center gap-1 pt-2">
                      View Event <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Lightbox — Full-Bleed Image with Overlapping Text (0 Wasted Space) */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-24 sm:pt-28 pb-8 sm:pb-12 bg-slate-950/40 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-[16/11] sm:aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 my-auto text-white"
            >
              {/* Full-Bleed Photograph */}
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="absolute inset-0 size-full object-cover"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white transition-colors flex items-center justify-center cursor-pointer border border-white/20 backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gradient Backdrop & Overlapping Text */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent text-white z-10 flex flex-col justify-end pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-brand bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider font-bold">
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs font-inter text-slate-300">
                    {selectedEvent.date} &bull; {selectedEvent.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-brand text-white font-bold mb-1.5 tracking-tight">
                  {selectedEvent.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-slate-200 leading-relaxed opacity-95 max-w-2xl">
                  {selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Events
