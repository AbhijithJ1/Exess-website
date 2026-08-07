import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { eventsData } from '../data/eventsData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const Events = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const [filter, setFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents = filter === 'all'
    ? eventsData
    : eventsData.filter((e) => e.status === filter)

  const upcomingCount = eventsData.filter((e) => e.status === 'upcoming').length

  // Lock body scroll and add ESC key listener when event detail modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null)
    }
    if (selectedEvent) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedEvent])

  return (
    <section id="events" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-14 sm:mb-18">
          <PowerOnHeader
            badge="Events & Hackathons"
            headline={<>What&apos;s <span className="text-light-sweep-dark">Happening</span></>}
            description="From hands-on workshops to national hackathons, explore our lineup of engineering events."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <motion.div variants={itemVariants} className="flex gap-1.5 sm:gap-2 border-b border-border/60 pb-2 w-fit max-w-full overflow-x-auto no-scrollbar">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] uppercase font-brand tracking-wider font-semibold transition-all duration-300 whitespace-nowrap ${
                  filter === f
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-body hover:text-heading'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'upcoming' && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-accent/20 text-accent text-[9px] rounded-full font-bold">
                    {upcomingCount}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Open Editorial Layout — Reduced Card Borders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedEvent(event)}
                className="group cursor-pointer flex flex-col justify-between border-b border-border/50 pb-6 transition-all duration-300"
              >
                <div>
                  <ImagePlaceholder
                    src={event.image}
                    alt={event.title}
                    type="cover"
                    aspectRatio="aspect-[16/9]"
                    badge={event.category}
                  />

                  <div className="pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-brand text-primary tracking-wider uppercase">
                        {event.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-brand tracking-wide ${
                        event.status === 'upcoming'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                          : 'text-gray-400'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-brand text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="font-inter text-xs text-body leading-relaxed mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 mb-4 pt-2 border-t border-border/30 font-inter">
                      <div className="flex items-center gap-2 text-xs text-body/80">
                        <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-body/80">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-brand uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">
                    View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal View — Fully Responsive with Navbar Clearance & ESC Listener */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain"
            >
              {/* Sticky Close Button */}
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
                  aria-label="Close modal"
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
                    <h4 className="text-[10px] font-brand uppercase tracking-wider text-heading mb-3 flex items-center gap-1.5">
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
