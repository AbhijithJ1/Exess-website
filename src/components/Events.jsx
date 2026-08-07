import { useState } from 'react'
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
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
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

          <motion.div variants={itemVariants} className="flex gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-background rounded-2xl border border-border/60 w-fit max-w-full overflow-x-auto no-scrollbar">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  filter === f
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-body hover:text-heading'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'upcoming' && (
                  <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-accent/20 text-accent text-[10px] sm:text-[11px] rounded-full font-bold">
                    {upcomingCount}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedEvent(event)}
                className="group card-premium overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Large Responsive Cover-Image Placeholder Frame */}
                  <ImagePlaceholder
                    src={event.image}
                    alt={event.title}
                    type="cover"
                    aspectRatio="aspect-[16/9]"
                    badge={event.category}
                  />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-primary/[0.08] text-primary tracking-wider uppercase">
                        {event.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                        event.status === 'upcoming'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-grotesk text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-body-sm text-body leading-relaxed mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 pt-3 border-t border-border/40">
                      <div className="flex items-center gap-2.5 text-xs text-body">
                        <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-body">
                        <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-body">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                    View Event Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-border/80 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <ImagePlaceholder
                src={selectedEvent.image}
                alt={selectedEvent.title}
                type="cover"
                aspectRatio="aspect-[21/9]"
                className="mb-6"
                badge={selectedEvent.category}
              />

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider font-mono">
                  {selectedEvent.category}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {selectedEvent.status === 'upcoming' ? '• Upcoming' : '• Past Event'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-grotesk font-bold text-heading mb-2">
                {selectedEvent.title}
              </h3>
              <p className="text-sm font-semibold text-primary mb-4">{selectedEvent.subtitle}</p>
              <p className="text-body text-sm leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              {selectedEvent.highlights && (
                <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" /> Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-body">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-primary/[0.03] border border-primary/10 text-xs">
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
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 text-center"
                >
                  Register for Event <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Events
