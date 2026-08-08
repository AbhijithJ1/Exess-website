import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle, Clock, Navigation } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const Contact = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10">
        <PowerOnHeader
          headline={<>LET&apos;S <span className="text-light-sweep-dark">CONNECT</span></>}
          description="Reach out to ExESS for technical workshops, hardware research partnerships, or society membership inquiries."
          align="left"
        />

        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14"
        >
          {/* Left Column (5 Columns): Essential Info & Campus Location Map Module */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants}>
              <p className="font-inter text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                Whether you&apos;re a student looking to join, an industry partner interested in research,
                or an alumnus offering technical mentorship &mdash; submit your query below.
              </p>

              {/* Integrated Campus Location Map & Coordinates Module */}
              <div className="rounded-3xl border border-primary/20 bg-white p-4 shadow-soft space-y-3 mb-6">
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
                    href="https://maps.google.com/?q=College+of+Engineering+Chengannur"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Open in Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Styled Map Image Container */}
                <div className="rounded-2xl overflow-hidden border border-border/60">
                  <ImagePlaceholder
                    src={null}
                    alt="College of Engineering Chengannur Location Map"
                    type="cover"
                    aspectRatio="aspect-[16/9]"
                    badge="CEC_MAP_LOCATION"
                  />
                </div>
                <span className="block text-[10px] font-mono text-gray-400 text-center">
                  Coordinates: 9.3174° N, 76.6175° E &bull; ECE Dept.
                </span>
              </div>
            </motion.div>

            <div className="space-y-4 pt-2">
              {[
                { icon: Mail, title: 'Email', lines: ['exess@cec.ac.in', 'contact.exess@gmail.com'] },
                { icon: Phone, title: 'Phone', lines: ['+91 98765 43210'] },
                { icon: Clock, title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 5:00 PM'] },
              ].map((item) => (
                <motion.div key={item.title} variants={itemVariants} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-brand text-heading uppercase tracking-wider mb-0.5">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-xs font-inter text-gray-600">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (7 Columns): Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-border/80 shadow-soft">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 sm:py-16"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-brand text-heading mb-2">Message Sent!</h3>
                  <p className="font-inter text-sm text-gray-600">Thank you for reaching out to ExESS. We will respond promptly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2">Name</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2">Email</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2">Subject</label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter text-body">
                      <option>General Inquiry</option>
                      <option>Join ExESS</option>
                      <option>Sponsorship / Research</option>
                      <option>Workshop Collaboration</option>
                    </select>
                  </div>

                  <div className="mb-7 sm:mb-8">
                    <label className="block text-xs font-brand uppercase tracking-wider text-heading mb-2">Message</label>
                    <textarea
                      required rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm font-inter resize-none"
                      placeholder="Share your inquiry or project details..."
                    />
                  </div>

                  {/* Signature PcbLightButton Submit Button */}
                  <PcbLightButton type="submit" showArrow={false} icon={Send} className="w-full py-4">
                    Send Message
                  </PcbLightButton>
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
