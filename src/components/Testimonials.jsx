import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'

// Duplicate testimonials list for smooth infinite looping marquee
const testimonialMarqueeList = [...testimonialsData, ...testimonialsData]

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative section-gap overflow-hidden bg-background">
      <div id="alumni" className="absolute -top-24" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Community Voices"
          headline={<>Impact &amp; <span className="text-light-sweep-dark">Testimonials</span></>}
          description="Hear from students, faculty mentors, workshop participants, and ExESS core members."
        />

        {/* ── PREMIER INFINITE HORIZONTAL TESTIMONIAL CAROUSEL (NO WHITE SIDE MASKS) ── */}
        <div className="relative w-full overflow-hidden my-6 py-4 group">
          {/* Continuous Infinite Marquee Track */}
          <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {testimonialMarqueeList.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-80 sm:w-[420px] flex-shrink-0 bg-white rounded-3xl p-6 sm:p-8 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[9px] font-brand uppercase tracking-widest bg-primary/10 text-primary">
                      {item.category}
                    </span>
                    <Quote className="w-6 h-6 text-primary/20" />
                  </div>

                  <blockquote className="font-inter text-xs sm:text-sm text-heading leading-relaxed italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-border/40">
                  <div className="w-11 h-11 flex-shrink-0">
                    <ImagePlaceholder
                      src={item.image}
                      alt={item.name}
                      type="circle"
                      aspectRatio="aspect-square"
                      initials={item.initials}
                    />
                  </div>
                  <div>
                    <h4 className="font-brand text-xs sm:text-sm text-heading font-bold">{item.name}</h4>
                    <p className="font-inter text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
