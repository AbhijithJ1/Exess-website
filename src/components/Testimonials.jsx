import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { testimonialsData } from '../data/testimonialsData'

// Handcrafted low-contrast PCB background traces for Testimonials section
const TestimonialsPCBBackground = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible opacity-35 z-0"
    viewBox="0 0 1440 360"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="rgba(30, 107, 147, 0.25)" strokeWidth="1.2" strokeLinecap="square">
      <path d="M0 60 H400 L480 160 H960 L1040 60 H1440" />
      <path d="M0 280 H300 L380 200 H1060 L1140 280 H1440" stroke="rgba(50, 197, 232, 0.30)" />
    </g>

    {/* Connection Nodes */}
    <g fill="rgba(30, 107, 147, 0.40)">
      <circle cx="480" cy="160" r="3.5" />
      <circle cx="960" cy="160" r="3.5" />
      <circle cx="380" cy="200" r="3.5" fill="#32C5E8" />
      <circle cx="1060" cy="200" r="3.5" fill="#32C5E8" />
    </g>
  </svg>
)

// Duplicate testimonials list for smooth infinite looping marquee
const testimonialMarqueeList = [...testimonialsData, ...testimonialsData]

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative section-gap overflow-hidden bg-transparent">
      <div id="alumni" className="absolute -top-24" />

      {/* PCB Circuit Traces Flowing Across Full Viewport Width */}
      <TestimonialsPCBBackground />

      <div className="section-padding relative z-10">
        <PowerOnHeader
          badge="Community Voices"
          headline={<>Impact &amp; <span className="text-light-sweep-dark">Testimonials</span></>}
          description="Hear from students, faculty mentors, workshop participants, and ExESS core members."
          align="left"
        />

        {/* ── PREMIER INFINITE HORIZONTAL TESTIMONIAL CAROUSEL (NO WHITE SIDE MASKS) ── */}
        <div className="relative w-full overflow-hidden my-6 py-4 group">
          {/* Continuous Infinite Marquee Track (50s Slow Calm Speed) */}
          <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {testimonialMarqueeList.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-80 sm:w-[420px] flex-shrink-0 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/70 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[9px] font-brand uppercase tracking-widest bg-primary/10 text-primary font-semibold">
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
