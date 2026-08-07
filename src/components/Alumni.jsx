import { motion } from 'framer-motion'
import { Quote, Linkedin, Briefcase } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { alumniData, alumniStats } from '../data/alumniData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] },
  },
}

const Alumni = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

  return (
    <section id="alumni" className="relative section-gap overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.015] to-transparent pointer-events-none" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Alumni Network"
          headline={<>Our <span className="text-light-sweep-dark">Global</span> Impact</>}
          description="ExESS alumni leading semiconductor research, hardware startup ventures, and tech engineering worldwide."
        />

        {/* Global Impact Key Metrics Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 bg-white rounded-3xl border border-border/70 shadow-soft"
        >
          {alumniStats.map((st, i) => (
            <div key={i} className="text-center p-3">
              <div className="font-grotesk font-black text-2xl sm:text-4xl text-primary mb-1">
                {st.value}
              </div>
              <div className="text-xs font-medium text-body uppercase tracking-wider">
                {st.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Alumni Testimonial Cards */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          {alumniData.map((person) => (
            <motion.div
              key={person.id}
              variants={itemVariants}
              className="card-premium p-6 sm:p-8 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-5">
                  {/* Circular Profile Avatar Image Placeholder */}
                  <div className="w-14 h-14 flex-shrink-0">
                    <ImagePlaceholder
                      src={person.image}
                      alt={person.name}
                      type="circle"
                      aspectRatio="aspect-square"
                      initials={person.initials}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-grotesk text-heading">{person.name}</h4>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{person.batch} Batch &bull; {person.location}</p>
                  </div>
                </div>

                <p className="text-body-sm text-body leading-relaxed mb-6 italic">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs text-body flex-wrap">
                  <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-medium text-heading">{person.role}</span>
                  <span className="text-border">|</span>
                  <span className="font-semibold text-primary">{person.company}</span>
                </div>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-body transition-all duration-300 flex-shrink-0"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Alumni
