import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

/**
 * PowerOnHeader — unified section header component.
 * Phase 1: The badge + headline "power on" with a glow and blur-reveal.
 * Phase 2: The description fades in after a short delay.
 *
 * Props:
 *   badge      {string}   — small chip label above headline
 *   headline   {ReactNode} — main headline (can contain spans)
 *   description {string}  — paragraph below headline
 *   align      {'center'|'left'} — alignment
 *   className  {string}   — extra wrapper classes
 */
const headlineVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const descVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="section-label-text">{badge}</span>
          </span>
        </motion.div>
      )}

      <motion.h2
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headlineVariants}
        className="font-grotesk font-black tracking-tight text-heading text-balance mb-5"
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          lineHeight: '1.08',
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
          className="font-inter leading-relaxed text-balance"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: '#4B5563',
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default PowerOnHeader
