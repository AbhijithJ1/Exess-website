import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Send, CheckCircle, ChevronDown, Check } from 'lucide-react'
import { FaLocationDot, FaEnvelope } from 'react-icons/fa6'
import PcbLightButton from './PcbLightButton'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Event Sponsorship',
  'Join ExESS',
  'Project Collaboration',
]

/**
 * Premium Custom Dropdown Component
 */
const PremiumSelect = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm text-heading font-inter flex items-center justify-between focus:outline-none focus:border-primary/50 focus:bg-white transition-all cursor-pointer shadow-sm hover:border-slate-300"
      >
        <span className="font-medium text-heading">{selected}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Premium Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-40 bg-white border border-border/80 rounded-2xl shadow-xl p-2 space-y-1 font-inter overflow-hidden"
          >
            {SUBJECT_OPTIONS.map((option) => {
              const isSelected = selected === option
              return (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-gray-700 hover:bg-slate-50 hover:text-heading'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Contact — "SIGNAL ROUTING"
 */
const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle')
  const [selectedSubject, setSelectedSubject] = useState('General Inquiry')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('sent')
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1200)
  }

  return (
    <section id="contact" className="relative section-gap overflow-hidden bg-transparent pb-32">
      <div className="section-padding max-w-7xl mx-auto relative z-10">

        {/* ── 1. SIGNAL ROUTING TYPOGRAPHY & HUB ───────────────────────────── */}
        <div className="relative mb-12 sm:mb-20 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6"
          >
            <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2">
              ESTABLISH CONNECTION
            </span>
            <h2 className="font-brand font-bold tracking-tight leading-[1.0] text-light-sweep-dark" style={{ fontSize: 'clamp(1.6rem, 7.5vw, 4.5rem)' }}>
              CONTACT
            </h2>
          </motion.div>

          {/* Routing Signals (SVG) — 3 light-blue paths, 1-time entrance flow to center, continuous glittering blast flare */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="w-full max-w-xl h-24 sm:h-28 relative flex justify-center items-end overflow-visible"
          >
            <svg className="w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <defs>
                {/* Light Cyan Glow Filter */}
                <filter id="cyan-glitter-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Radial Gradient for light blue burst */}
                <radialGradient id="burst-cyan-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#5ED8F2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#32C5E8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* ── 1. LEFT ROUTE TRACK (Base track + 1-time beam flow) ── */}
              <motion.path
                d="M 200 0 Q 200 70 500 100"
                stroke="#32C5E8" strokeWidth="1.5" strokeDasharray="5 5" fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.4, transition: { duration: 0.9, delay: 0.1, ease: "easeInOut" } }
                }}
              />
              <motion.path
                d="M 200 0 Q 200 70 500 100"
                stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" fill="none"
                variants={{
                  hidden: { pathLength: 0, pathOffset: 0, opacity: 0 },
                  visible: { 
                    pathLength: [0, 0.35, 0],
                    pathOffset: [0, 0.7, 1],
                    opacity: [0, 1, 1, 0],
                    transition: { duration: 1.1, delay: 0.2, ease: "easeInOut" } 
                  }
                }}
                style={{ filter: 'drop-shadow(0 0 5px #32C5E8)' }}
              />

              {/* ── 2. RIGHT ROUTE TRACK (Base track + 1-time beam flow) ── */}
              <motion.path
                d="M 800 0 Q 800 70 500 100"
                stroke="#32C5E8" strokeWidth="1.5" strokeDasharray="5 5" fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.4, transition: { duration: 0.9, delay: 0.1, ease: "easeInOut" } }
                }}
              />
              <motion.path
                d="M 800 0 Q 800 70 500 100"
                stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" fill="none"
                variants={{
                  hidden: { pathLength: 0, pathOffset: 0, opacity: 0 },
                  visible: { 
                    pathLength: [0, 0.35, 0],
                    pathOffset: [0, 0.7, 1],
                    opacity: [0, 1, 1, 0],
                    transition: { duration: 1.1, delay: 0.3, ease: "easeInOut" } 
                  }
                }}
                style={{ filter: 'drop-shadow(0 0 5px #32C5E8)' }}
              />

              {/* ── 3. CENTER DIRECT ROUTE TRACK (Base track + 1-time beam flow) ── */}
              <motion.path
                d="M 500 0 L 500 100"
                stroke="#32C5E8" strokeWidth="2" fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.65, transition: { duration: 0.8, delay: 0.2, ease: "easeInOut" } }
                }}
              />
              <motion.path
                d="M 500 0 L 500 100"
                stroke="#32C5E8" strokeWidth="3.5" strokeLinecap="round" fill="none"
                variants={{
                  hidden: { pathLength: 0, pathOffset: 0, opacity: 0 },
                  visible: { 
                    pathLength: [0, 0.35, 0],
                    pathOffset: [0, 0.7, 1],
                    opacity: [0, 1, 1, 0],
                    transition: { duration: 1.0, delay: 0.4, ease: "easeInOut" } 
                  }
                }}
                style={{ filter: 'drop-shadow(0 0 6px #32C5E8)' }}
              />

              {/* ── 4. CENTER LIGHT-BLUE CONTINUOUS GLITTERING BURST (NO CIRCLE) ── */}
              {/* Outer static SVG group fixed at center (500, 100) */}
              <g transform="translate(500, 100)">
                <motion.g
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 1.1, ease: "easeOut" } }
                  }}
                >
                  {/* Soft Ambient Light Burst Bloom */}
                  <motion.circle
                    cx="0" cy="0" r="32"
                    fill="url(#burst-cyan-grad)"
                    animate={{ scale: [0.85, 1.4, 0.85], opacity: [0.6, 0.95, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* Expanding Continuous Glitter Ring 1 */}
                  <motion.circle
                    cx="0" cy="0" r="8"
                    fill="none" stroke="#32C5E8" strokeWidth="2"
                    animate={{ r: [8, 38], opacity: [0.95, 0] }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut" }}
                  />

                  {/* Expanding Continuous Glitter Ring 2 */}
                  <motion.circle
                    cx="0" cy="0" r="4"
                    fill="none" stroke="#5ED8F2" strokeWidth="1.5"
                    animate={{ r: [4, 28], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut", delay: 1.0 }}
                  />

                  {/* Continuous Glittering Sparkle Cross Lines (Light Burst Flare) */}
                  <motion.g
                    animate={{ rotate: 360, opacity: [0.75, 1, 0.75] }}
                    transition={{ rotate: { repeat: Infinity, duration: 8, ease: "linear" }, opacity: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } }}
                  >
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#32C5E8" strokeWidth="2" strokeLinecap="round" filter="url(#cyan-glitter-glow)" />
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#32C5E8" strokeWidth="2" strokeLinecap="round" filter="url(#cyan-glitter-glow)" />
                    <line x1="-10" y1="-10" x2="10" y2="10" stroke="#5ED8F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                    <line x1="-10" y1="10" x2="10" y2="-10" stroke="#5ED8F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                  </motion.g>

                  {/* Central Light-Blue Core Sparkle Node */}
                  <circle cx="0" cy="0" r="4.5" fill="#32C5E8" filter="url(#cyan-glitter-glow)" />
                  <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                </motion.g>
              </g>
            </svg>
          </motion.div>

        </div>

        {/* ── 2. COMMUNICATION CHANNELS & FORM ───────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-20 mt-6 sm:mt-10"
        >
          {/* Information & Channels */}
          <div>
            <h3 className="font-brand text-2xl sm:text-3xl font-bold text-heading mb-6">
              GET IN TOUCH
            </h3>
            <p className="font-inter text-body text-base leading-relaxed mb-10 max-w-md">
              Whether you want to sponsor an event, collaborate on hardware research, or join the community, our communication channels are open.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-soft hover:border-primary/30 transition-all group">
                <div className="text-primary flex-shrink-0 pt-0.5">
                  <FaLocationDot className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h4 className="font-brand text-sm font-bold text-heading mb-1">Address</h4>
                  <p className="font-inter text-sm text-gray-500 leading-relaxed">
                    College of Engineering Chengannur<br />
                    Alappuzha, Kerala - 689121
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-soft hover:border-primary/30 transition-all group">
                <div className="text-primary flex-shrink-0 pt-0.5">
                  <FaEnvelope className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h4 className="font-brand text-sm font-bold text-heading mb-1">Email</h4>
                  <a href="mailto:exess@ceconline.edu" className="font-inter text-sm text-gray-500 hover:text-primary transition-colors">
                    exess@ceconline.edu
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form matching reference card design */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 lg:p-10 rounded-3xl border border-border/60 bg-white shadow-soft-lg">

              <div className="space-y-6">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-brand font-bold text-xs uppercase tracking-wider text-heading block">NAME</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-brand font-bold text-xs uppercase tracking-wider text-heading block">EMAIL</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Premium Subject Dropdown Row */}
                <div className="space-y-2">
                  <label className="font-brand font-bold text-xs uppercase tracking-wider text-heading block">SUBJECT</label>
                  <PremiumSelect
                    selected={selectedSubject}
                    onChange={setSelectedSubject}
                  />
                </div>

                {/* Message Textarea Row */}
                <div className="space-y-2">
                  <label className="font-brand font-bold text-xs uppercase tracking-wider text-heading block">MESSAGE</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Share your inquiry or project details..."
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <PcbLightButton
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    icon={Send}
                    className="w-full justify-center text-center"
                  >
                    <AnimatePresence mode="wait">
                      {formStatus === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          ESTABLISH CONNECTION
                        </motion.span>
                      )}
                      {formStatus === 'sending' && (
                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          ESTABLISHING SIGNAL...
                        </motion.span>
                      )}
                      {formStatus === 'sent' && (
                        <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-cyan-600 font-bold">
                          CONNECTION ESTABLISHED ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </PcbLightButton>
                </div>

              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Contact
