import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const Contact = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.15 })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative section-gap overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* PCB Connecting Signal SVG Line linking Map to Form */}
        <svg
          aria-hidden="true"
          className="absolute top-1/3 left-1/3 w-1/3 h-48 pointer-events-none select-none z-0 hidden lg:block opacity-30"
          viewBox="0 0 400 150"
          fill="none"
        >
          <path
            d="M 10 20 H 200 V 130 H 390"
            stroke="#32C5E8"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle cx="10" cy="20" r="4" fill="#32C5E8" />
          <circle cx="390" cy="130" r="4" fill="#1E6B93" />
        </svg>

        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left Column (5 Cols): Connection Statement & Campus Map Interface */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants}>
              <span className="section-label font-brand inline-flex items-center mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="section-label-text font-brand uppercase tracking-[0.22em] text-[10px] font-bold text-primary">
                  CONNECTION INTERFACE
                </span>
              </span>

              <h2 className="font-brand text-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.14] mb-4">
                LET&apos;S <span className="text-primary">CONNECT</span>
              </h2>

              <p className="font-inter text-sm sm:text-base text-gray-600 leading-relaxed">
                Whether you&apos;re a student looking to join, an industry partner interested in research, or an alumnus offering technical mentorship &mdash; submit your query below.
              </p>
            </motion.div>

            {/* Direct Contact Channels */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2 border-t border-border/50">
              <span className="text-[10px] font-brand uppercase tracking-[0.18em] text-primary font-bold block mb-3">
                DIRECT CONTACT CHANNELS
              </span>
              {[
                { icon: Mail, title: 'Email', lines: ['exess@cec.ac.in', 'contact.exess@gmail.com'] },
                { icon: Phone, title: 'Phone', lines: ['+91 98765 43210'] },
                { icon: Clock, title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 5:00 PM'] },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-brand text-heading uppercase tracking-wider mb-0.5 font-semibold">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-xs font-inter text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Integrated Campus Location Map */}
            <motion.div variants={itemVariants} className="pt-2 border-t border-border/50">
              <span className="text-[10px] font-brand uppercase tracking-[0.18em] text-primary font-bold block mb-3">
                CAMPUS LOCATION
              </span>
              <div className="rounded-3xl border border-primary/20 bg-white p-4 shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-brand text-xs text-heading font-semibold">College of Engineering Chengannur</h4>
                      <p className="text-[10px] font-mono text-gray-400">Chengannur, Alappuzha, Kerala 689121</p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/College+of+Engineering+Chengannur/@9.317325,76.617486,15z/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Open College Location on Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="rounded-2xl overflow-hidden border border-border/60">
                  <ImagePlaceholder
                    src={null}
                    alt="College of Engineering Chengannur Location Map"
                    type="cover"
                    aspectRatio="aspect-[16/9]"
                    badge="GOOGLE_MAPS_CEC"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Lat 9.3173° N &bull; Long 76.6174° E</span>
                  <a
                    href="https://www.google.com/maps/place/College+of+Engineering+Chengannur/@9.317325,76.617486,15z/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-brand font-semibold"
                  >
                    Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (7 Cols): Sequential Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-border/80 shadow-soft-lg space-y-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 sm:py-16"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-brand text-heading mb-2 font-bold">Message Transmitted!</h3>
                  <p className="font-inter text-sm text-gray-600">Thank you for reaching out to ExESS. We will respond promptly.</p>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2 font-semibold">Name</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2 font-semibold">Email</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter"
                        placeholder="your@email.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2 font-semibold">Subject</label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter text-body">
                      <option>General Inquiry</option>
                      <option>Join ExESS</option>
                      <option>Sponsorship / Research</option>
                      <option>Workshop Collaboration</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2 font-semibold">Message</label>
                    <textarea
                      required rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter resize-none"
                      placeholder="Share your inquiry or project details..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <PcbLightButton type="submit" icon={Send} className="w-full py-4">
                      TRANSMIT MESSAGE
                    </PcbLightButton>
                  </motion.div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
