import { motion } from 'framer-motion'
import { Quote, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const Testimonials = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section id="testimonials" className="relative section-gap overflow-hidden bg-background">
      <div id="alumni" className="absolute -top-24" />

      <div className="section-padding relative z-10 max-w-6xl mx-auto">
        <PowerOnHeader
          badge="Community Voices"
          headline={<>Impact &amp; <span className="text-light-sweep-dark">Testimonials</span></>}
          description="Hear from students, faculty mentors, workshop participants, and ExESS core members."
        />

        {/* Clean Editorial Alternating Layout (Reduced Bordered Cards) */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-10"
        >
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`py-8 sm:py-10 border-b border-border/70 grid lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-brand uppercase tracking-widest bg-primary/10 text-primary">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    &bull; {item.badge}
                  </span>
                </div>

                <blockquote className="font-inter text-lg sm:text-xl text-heading leading-relaxed italic relative">
                  <Quote className="inline-block w-6 h-6 text-primary/20 mr-2 -mt-2" />
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="pt-2">
                  <h4 className="font-brand text-base text-heading">{item.name}</h4>
                  <p className="font-inter text-xs text-primary font-semibold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="w-20 h-20 sm:w-24 sm:h-24">
                  <ImagePlaceholder
                    src={item.image}
                    alt={item.name}
                    type="circle"
                    aspectRatio="aspect-square"
                    initials={item.initials}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
