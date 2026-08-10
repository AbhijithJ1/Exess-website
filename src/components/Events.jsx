import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, X, Sparkles, CheckCircle2, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { eventsData } from '../data/eventsData'

const Events = () => {
  const [filter, setFilter] = useState('all')
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)

  const filteredEvents = filter === 'all'
    ? eventsData
    : eventsData.filter((e) => e.status === filter)

  // Reset active index if filter changes
  useEffect(() => {
    setActiveIdx(0)
  }, [filter])

  const activeEvent = filteredEvents[activeIdx] || filteredEvents[0]

  // Lock body scroll when event detail modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null)
        setShowAllModal(false)
      }
    }
    if (selectedEvent || showAllModal) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedEvent, showAllModal])

  return (
    <section id="events" className="relative section-gap overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* ── 1. Header Control Bar ────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-10 border-b border-border/60 pb-6">
          <PowerOnHeader
            badge="EVENTS & HACKATHONS"
            headline={<>The Event <span className="text-light-sweep-dark">Journey</span></>}
            description="Explore our chronological technical lineup, hackathons, and hardware bootcamps."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="flex gap-2 p-1.5 rounded-2xl bg-white border border-border/80 shadow-soft w-fit flex-shrink-0 self-start lg:self-end">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-[10px] uppercase font-brand tracking-wider font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  filter === f
                    ? 'bg-primary text-white shadow-sm font-bold'
                    : 'text-gray-600 hover:text-heading hover:bg-slate-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── 2. DESKTOP HORIZONTAL EVENT JOURNEY (Interactive Timeline) ── */}
        <div className="hidden lg:block mb-12">
          {/* PCB Progression Connecting Timeline */}
          <div className="relative mb-8 px-4">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/60 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -translate-y-1/2 z-0"
              style={{ width: `${((activeIdx + 1) / filteredEvents.length) * 100}%` }}
            />

            <div className="relative z-10 flex items-center justify-between">
              {filteredEvents.map((ev, idx) => (
                <button
                  key={ev.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
                    activeIdx === idx ? 'scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    activeIdx === idx
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-gray-500 border-border group-hover:border-primary/50'
                  }`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-brand uppercase tracking-wider ${
                    activeIdx === idx ? 'text-primary font-bold' : 'text-gray-500'
                  }`}>
                    {ev.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Event Horizontal Stage Panel */}
          {activeEvent && (
            <div className="relative rounded-3xl bg-white border border-border/80 p-8 sm:p-10 shadow-soft-lg grid grid-cols-12 gap-10 items-center min-h-[420px]">
              {/* Left Column (5 Cols): Metadata & Action */}
              <div className="col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold text-primary">EVENT 0{activeIdx + 1} / 0{filteredEvents.length}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-brand tracking-wide font-semibold ${
                      activeEvent.status === 'upcoming'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                        : 'text-gray-400 bg-slate-100'
                    }`}>
                      {activeEvent.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-brand text-heading mb-3 tracking-tight">
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

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <button
                    onClick={() => setSelectedEvent(activeEvent)}
                    className="inline-flex items-center gap-2 text-xs font-brand uppercase tracking-wider text-primary hover:text-secondary font-bold"
                  >
                    View Full Details <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={activeIdx === 0}
                      onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      disabled={activeIdx === filteredEvents.length - 1}
                      onClick={() => setActiveIdx((prev) => Math.min(filteredEvents.length - 1, prev + 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (7 Cols): Visual Frame */}
              <div className="col-span-7 h-full">
                <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm h-full min-h-[340px] relative">
                  <ImagePlaceholder
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    type="cover"
                    aspectRatio="w-full h-full"
                    badge={activeEvent.category}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 3. MOBILE VERTICAL EVENT TIMELINE ──────────────────────────── */}
        <div className="block lg:hidden space-y-6 mb-12">
          {filteredEvents.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="relative pl-6 border-l-2 border-primary/40 space-y-3 cursor-pointer group"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary group-hover:bg-primary transition-colors" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-primary font-bold">EVENT 0{idx + 1}</span>
                <span className="text-[9px] font-brand uppercase tracking-wider text-gray-500">{ev.category}</span>
              </div>
              <h4 className="font-brand text-base text-heading font-bold group-hover:text-primary transition-colors">
                {ev.title}
              </h4>
              <p className="font-inter text-xs text-gray-600 line-clamp-2">{ev.description}</p>
            </div>
          ))}
        </div>

        {/* ── 4. Standalone Centered CTA ──────────────────────────────── */}
        <div className="flex justify-center mt-10">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL EVENTS ARCHIVE
          </PcbLightButton>
        </div>

      </div>

      {/* Full Events Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ALL ExESS EVENTS ARCHIVE</h3>
                  <p className="text-xs font-inter text-gray-500">Explore complete directory of workshops, hackathons and technical webinars</p>
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
                    onClick={() => {
                      setShowAllModal(false)
                      setSelectedEvent(ev)
                    }}
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

      {/* Single Event Detail Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
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
                <ImagePlaceholder
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  type="cover"
                  aspectRatio="aspect-[21/9]"
                  className="mb-6"
                  badge={selectedEvent.category}
                />

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-brand bg-primary/10 text-primary uppercase tracking-wider">
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs font-inter text-gray-400">
                    {selectedEvent.status === 'upcoming' ? '• Upcoming' : '• Past Event'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-brand text-heading mb-2">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs font-brand text-primary uppercase tracking-wider mb-4">{selectedEvent.subtitle}</p>
                <p className="font-inter text-body text-sm leading-relaxed mb-6">
                  {selectedEvent.description}
                </p>

                {selectedEvent.highlights && (
                  <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-border/60">
                    <h4 className="text-[10px] font-brand uppercase tracking-wider text-heading mb-3 flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-accent" /> Key Highlights
                    </h4>
                    <ul className="space-y-2 font-inter">
                      {selectedEvent.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-body">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-primary/[0.03] border border-primary/10 text-xs font-inter">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Date</span>
                    <span className="font-semibold text-heading">{selectedEvent.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Time</span>
                    <span className="font-semibold text-heading">{selectedEvent.time}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Location</span>
                    <span className="font-semibold text-heading truncate block">{selectedEvent.location}</span>
                  </div>
                </div>

                {selectedEvent.registrationUrl && (
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 font-brand text-xs uppercase tracking-wider py-3.5"
                  >
                    Register for Event <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Events
