import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Send, CheckCircle, ChevronDown, Check } from 'lucide-react'
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
        <div className="relative mb-16 sm:mb-24 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2">
              ESTABLISH CONNECTION
            </span>
            <h2 className="font-brand text-heading text-5xl sm:text-7xl font-bold tracking-tight leading-[1.0] text-light-sweep-dark">
              CONTACT
            </h2>
          </motion.div>

          {/* Routing Signals (SVG) connecting CONTACT to the Hub */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="w-full h-32 relative flex justify-center"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
              {/* Left Route */}
              <motion.path
                d="M 300 0 Q 300 50 450 50 T 500 100"
                stroke="#32C5E8" strokeWidth="2" fill="none" strokeDasharray="5 5"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.5, transition: { duration: 1.0, delay: 0.3, ease: "easeInOut" } }
                }}
              />
              {/* Right Route */}
              <motion.path
                d="M 700 0 Q 700 50 550 50 T 500 100"
                stroke="#32C5E8" strokeWidth="2" fill="none" strokeDasharray="5 5"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.5, transition: { duration: 1.0, delay: 0.5, ease: "easeInOut" } }
                }}
              />
              {/* Center Direct Route */}
              <motion.path
                d="M 500 0 L 500 100"
                stroke="#0F4C81" strokeWidth="2" fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 0.8, transition: { duration: 0.8, delay: 0.8, ease: "easeInOut" } }
                }}
              />
            </svg>

            {/* Central Communication Hub */}
            <motion.div
              variants={{
                hidden: { scale: 0, opacity: 0, y: 100 },
                visible: { scale: 1, opacity: 1, y: 100, transition: { duration: 0.5, delay: 1.4, type: "spring" } }
              }}
              className="absolute w-12 h-12 bg-white rounded-full border-4 border-primary shadow-[0_0_20px_#32C5E8] flex items-center justify-center z-10"
            >
              <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
            </motion.div>
          </motion.div>

        </div>

        {/* ── 2. COMMUNICATION CHANNELS & FORM ───────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-10"
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
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-soft hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary border border-border/80 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand text-sm font-bold text-heading mb-1">Address</h4>
                  <p className="font-inter text-sm text-gray-500 leading-relaxed">
                    College of Engineering Chengannur<br />
                    Alappuzha, Kerala - 689121
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-soft hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary border border-border/80 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
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
            <form onSubmit={handleSubmit} className="relative p-8 sm:p-10 rounded-3xl border border-border/60 bg-white shadow-soft-lg">

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
