import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

/**
 * PowerOnHeader — Unified section header with Michroma typography & performance optimizations.
 */
const headlineVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

const PowerOnHeader = ({
  badge,
  headline,
  description,
  align = 'center',
  className = '',
  maxW = 'max-w-3xl',
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })
  const isCenter = align === 'center'

  return (
    <div
      ref={ref}
      className={`${maxW} ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-14 sm:mb-20 ${className}`}
    >
      {badge && (
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={badgeVariants}
          className={`inline-flex items-center mb-5 ${isCenter ? 'justify-center' : ''}`}
        >
          <span className="section-label font-brand">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="section-label-text font-brand uppercase tracking-[0.16em] text-[10px]">{badge}</span>
          </span>
        </motion.div>
      )}

      <motion.h2
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headlineVariants}
        className="font-brand font-bold tracking-tight text-heading text-balance mb-5"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
          lineHeight: '1.12',
          letterSpacing: '-0.03em',
        }}
      >
        {headline}
      </motion.h2>

      {description && (
        <motion.p
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={descVariants}
          className="font-inter leading-relaxed text-balance text-gray-600"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default PowerOnHeader
