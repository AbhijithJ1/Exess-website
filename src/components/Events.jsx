import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, X, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { eventsData } from '../data/eventsData'

const EVENTS_CHARS = ['E', 'V', 'E', 'N', 'T', 'S']
const AUTOPLAY_INTERVAL = 4000

/**
 * Events — "PREMIUM AUTO-ADVANCING EVENT TIMELINE"
 *
 * Motion & Interaction Architecture:
 *   - Auto-advances through timeline nodes (01 -> 02 -> 03 ...) every 4 seconds.
 *   - Only autoplays when the section is in the viewport (IntersectionObserver).
 *   - Pauses on hover; resumes on leave.
 *   - Manual node selection resets the timer and triggers the electrical signal transition.
 *   - Active node & cyan signal beam travel smoothly across the timeline.
 *   - Filter switching ('all', 'upcoming', 'past') filters events & resets progression safely.
 *   - Responsive mobile view with horizontally scrollable timeline bar.
 */
const Events = () => {
  const [filter, setFilter] = useState('all')
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const sectionRef = useRef(null)
  const autoplayRef = useRef(null)

  // Filtered events calculation
  const filteredEvents = filter === 'all'
    ? eventsData
    : eventsData.filter((e) => e.status === filter)

  // Ensure active index remains in valid bounds
  const validActiveIdx = activeIdx >= filteredEvents.length ? 0 : activeIdx
  const activeEvent = filteredEvents[validActiveIdx] || filteredEvents[0]

  // Viewport Observer — only run autoplay when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance function
  const nextEvent = useCallback(() => {
    if (filteredEvents.length <= 1) return
    setActiveIdx((prev) => (prev + 1) % filteredEvents.length)
  }, [filteredEvents.length])

  // Autoplay Timer Management
  useEffect(() => {
    if (!isInView || isPaused || filteredEvents.length <= 1 || selectedEvent) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }

    autoplayRef.current = setInterval(() => {
      nextEvent()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isInView, isPaused, filteredEvents.length, selectedEvent, nextEvent])

  // Reset autoplay timer on manual node click
  const handleSelectNode = (idx) => {
    if (idx === validActiveIdx) return
    setActiveIdx(idx)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  // Handle filter change cleanly
  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return
    setFilter(newFilter)
    setActiveIdx(0)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative section-gap overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-padding max-w-7xl mx-auto relative z-10 min-h-[85vh]">

        {/* ── 1. SEQUENTIAL CHARACTER ACTIVATION TYPOGRAPHY ───────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-10 border-b border-border/60 pb-8">
          <div className="origin-left">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: '-10%' }}
              className="text-[10px] font-brand uppercase tracking-[0.22em] text-primary font-bold block mb-2"
            >
              EVENTS &amp; HACKATHONS
            </motion.span>

            {/* TEMPORAL SEQUENTIAL CHARACTER ACTIVATION */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-10%' }}
              className="flex items-center gap-1 sm:gap-2 my-2 overflow-hidden py-2"
            >
              {EVENTS_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="font-brand font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="font-inter text-body text-sm sm:text-base text-gray-600 mt-2 max-w-xl"
            >
              Explore our technical lineup, national hackathons, and hardware bootcamps.
            </motion.p>
          </div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex gap-2 p-1.5 rounded-2xl bg-white border border-border/80 shadow-soft w-fit flex-shrink-0 self-start lg:self-end"
          >
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-xl text-[10px] uppercase font-brand tracking-wider font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  filter === f
                    ? 'bg-primary text-white shadow-sm font-bold'
                    : 'text-gray-600 hover:text-heading hover:bg-slate-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── 2. TIMELINE NAV BAR (DESKTOP & MOBILE RESPONSIVE) ──────────── */}
        <div className="relative mb-8 px-4 overflow-x-auto no-scrollbar py-4">
          <div className="relative min-w-[500px]">
            {/* Background Track Line */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 rounded-full z-0" />

            {/* Travelling Active Cyan Signal Beam Line */}
            <div
              className="absolute top-4 left-6 h-1 bg-primary rounded-full z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_12px_#32C5E8]"
              style={{
                width: filteredEvents.length > 1
                  ? `calc(${validActiveIdx / (filteredEvents.length - 1)} * (100% - 48px))`
                  : '0px'
              }}
            />

            {/* Timeline Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {filteredEvents.map((ev, idx) => {
                const isActive = validActiveIdx === idx
                return (
                  <button
                    key={ev.id}
                    onClick={() => handleSelectNode(idx)}
                    className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold transition-all duration-500 ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-[0_0_20px_#32C5E8] scale-110'
                        : 'bg-white text-gray-500 border-slate-300 group-hover:border-primary/50 group-hover:text-primary'
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-brand uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {ev.category}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 3. ACTIVE EVENT CARD STAGE (DESKTOP) ────────────────────────── */}
        <div className="hidden lg:block mb-12">
          {activeEvent && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-white border border-border/80 p-8 sm:p-10 shadow-soft-lg grid grid-cols-12 gap-10 items-center min-h-[420px]"
              >
                {/* Metadata */}
                <div className="col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono font-bold text-primary">
                        EVENT 0{validActiveIdx + 1} / 0{filteredEvents.length}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-brand tracking-wide font-semibold ${
                        activeEvent.status === 'upcoming'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                          : 'text-gray-400 bg-slate-100'
                      }`}>
                        {activeEvent.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-brand text-heading mb-3 tracking-tight leading-tight">
                      {activeEvent.title}
                    </h3>

                    <p className="font-inter text-sm text-body leading-relaxed mb-6">
                      {activeEvent.description}
                    </p>

                    <div className="space-y-2 mb-6 p-4 rounded-2xl bg-slate-50 border border-border/60 font-inter">
                      <div className="flex items-center gap-2.5 text-xs text-heading">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-semibold">{activeEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-heading">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-semibold">{activeEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedEvent(activeEvent)}
                      className="inline-flex items-center gap-2 text-xs font-brand uppercase tracking-wider text-primary hover:text-secondary font-bold cursor-pointer"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectNode((validActiveIdx - 1 + filteredEvents.length) % filteredEvents.length)}
                        className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        aria-label="Previous Event"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSelectNode((validActiveIdx + 1) % filteredEvents.length)}
                        className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        aria-label="Next Event"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Event Image */}
                <div className="col-span-7 h-full">
                  <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm h-full min-h-[340px] relative bg-slate-900">
                    <ImagePlaceholder
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      type="cover"
                      aspectRatio="w-full h-full"
                      badge={activeEvent.category}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── 4. MOBILE ACTIVE EVENT STAGE (SYNCED WITH TIMELINE) ─────────── */}
        <div className="block lg:hidden mb-12">
          {activeEvent && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedEvent(activeEvent)}
                className="relative pl-6 border-l-2 border-primary space-y-4 cursor-pointer group bg-white p-6 rounded-3xl border border-border/70 shadow-soft"
              >
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-[0_0_12px_#32C5E8]" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold">
                    EVENT 0{validActiveIdx + 1} / 0{filteredEvents.length}
                  </span>
                  <span className="text-[9px] font-brand uppercase tracking-wider text-gray-500 font-semibold">
                    {activeEvent.category}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-border/60 bg-slate-900">
                  <ImagePlaceholder
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    type="cover"
                    aspectRatio="aspect-[16/9]"
                    badge={activeEvent.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
                  />
                </div>

                <div>
                  <h4 className="font-brand text-xl text-heading font-bold group-hover:text-primary transition-colors mb-2">
                    {activeEvent.title}
                  </h4>
                  <p className="font-inter text-xs text-gray-600 leading-relaxed mb-4">{activeEvent.description}</p>
                  
                  <div className="space-y-1.5 pt-3 border-t border-border/40 font-inter text-xs text-gray-500">
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {activeEvent.date}
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {activeEvent.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Explore All Modal Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1.0 }}
          className="flex justify-center mt-10"
        >
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL EVENTS ARCHIVE
          </PcbLightButton>
        </motion.div>
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
                {eventsData.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => { setShowAllModal(false); setSelectedEvent(ev) }}
                    className="p-4 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-brand uppercase tracking-wider text-primary block mb-1">{ev.category}</span>
                      <h4 className="font-brand text-sm text-heading font-bold mb-1">{ev.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 font-inter">{ev.description}</p>
                    </div>
                    <span className="text-[10px] font-brand text-primary font-semibold flex items-center gap-1 pt-2">
                      Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="-mt-6">
                <ImagePlaceholder src={selectedEvent.image} alt={selectedEvent.title} type="cover" aspectRatio="aspect-[21/9]" className="mb-6" badge={selectedEvent.category} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-brand bg-primary/10 text-primary uppercase tracking-wider">{selectedEvent.category}</span>
                  <span className="text-xs font-inter text-gray-400">{selectedEvent.status === 'upcoming' ? '• Upcoming' : '• Past Event'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-brand text-heading mb-2">{selectedEvent.title}</h3>
                <p className="text-xs font-brand text-primary uppercase tracking-wider mb-4">{selectedEvent.subtitle}</p>
                <p className="font-inter text-body text-sm leading-relaxed mb-6">{selectedEvent.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Events
