import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle, Clock } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
}

const Contact = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative section-gap overflow-hidden">
      <div className="absolute inset-0 pcb-grid opacity-30 pointer-events-none" />

      <div className="section-padding relative z-10">
        <PowerOnHeader
          badge="Get In Touch"
          headline={<>Let&apos;s <span className="text-light-sweep-dark">Connect</span></>}
          description="Have questions about ExESS workshops, event partnerships, or joining the society? We'd love to hear from you."
        />

        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid lg:grid-cols-5 gap-10 sm:gap-12 max-w-6xl mx-auto"
        >
          {/* Left Column: Contact Info & Reserved Campus Photo Container */}
          <div className="lg:col-span-2 space-y-7 sm:space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-h3 font-grotesk text-heading mb-3 sm:mb-4">
                Get in Touch
              </h3>
              <p className="body-text mb-6">
                Whether you&apos;re a student looking to join, a company interested in collaboration,
                or an alumnus wanting to give back &mdash; reach out to us.
              </p>

              {/* Reserved Media Container for Future Campus & Department Photographs */}
              <div className="mb-6">
                <ImagePlaceholder
                  src={null}
                  alt="College of Engineering Chengannur Campus"
                  type="cover"
                  aspectRatio="aspect-video"
                  badge="CEC_CAMPUS"
                  className="shadow-soft border border-border/80"
                />
                <span className="block text-[11px] font-mono text-gray-400 text-center mt-2">
                  ECE Department &bull; College of Engineering Chengannur
                </span>
              </div>
            </motion.div>

            <div className="space-y-5 sm:space-y-6">
              {[
                { icon: MapPin, title: 'Location', lines: ['Electronics Department', 'College of Engineering Chengannur', 'Chengannur, Kerala 689121'] },
                { icon: Mail, title: 'Email', lines: ['exess@cec.ac.in', 'contact.exess@gmail.com'] },
                { icon: Phone, title: 'Phone', lines: ['+91 98765 43210'] },
                { icon: Clock, title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 5:00 PM'] },
              ].map((item) => (
                <motion.div key={item.title} variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading mb-1">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-body">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card-premium p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 sm:py-16"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-h3 font-grotesk text-heading mb-2">Message Sent!</h3>
                  <p className="body-text">We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">Name</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">Email</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-heading mb-2">Subject</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm text-body">
                      <option>General Inquiry</option>
                      <option>Join ExESS</option>
                      <option>Sponsorship</option>
                      <option>Collaboration</option>
                      <option>Alumni Connect</option>
                    </select>
                  </div>

                  <div className="mb-7 sm:mb-8">
                    <label className="block text-sm font-semibold text-heading mb-2">Message</label>
                    <textarea
                      required rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300 text-sm resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2.5">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
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
