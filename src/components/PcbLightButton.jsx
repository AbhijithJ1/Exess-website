import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * PcbLightButton — Signature ExESS Engineered Button with Circuit Formation Sequence
 *
 * FORMATION SEQUENCE:
 * 1. 4 Thin light-blue PCB traces approach the button corners from outer space.
 * 2. As traces converge at the corners, they draw the button's rounded rectangular perimeter.
 * 3. As the outline completes, the cyan formation energy settles, white/glass surface fades in,
 *    top/bottom cyan accent segments illuminate, and text/arrow smoothly stabilize.
 * 4. Hover state: Soft surface lift, border glow, arrow slides forward 4px.
 */
const PcbLightButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  showArrow = true,
  icon: Icon = null,
}) => {
  const [isFormed, setIsFormed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsFormed(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative inline-flex items-center justify-center p-2">
      {/* ── FORMATION PCB TRACES SVG (CONVERGES & DRAWS BUTTON OUTLINE) ── */}
      <svg
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-0 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Incoming Top-Left PCB Trace */}
        <motion.path
          d="M -16 6 H 16 V 16"
          stroke="#32C5E8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Incoming Top-Right PCB Trace */}
        <motion.path
          d="M 100% 6 H calc(100% - 32px) V 16"
          stroke="#32C5E8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Incoming Bottom-Left PCB Trace */}
        <motion.path
          d="M -16 calc(100% - 6px) H 16 V calc(100% - 16px)"
          stroke="#32C5E8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Incoming Bottom-Right PCB Trace */}
        <motion.path
          d="M 100% calc(100% - 6px) H calc(100% - 32px) V calc(100% - 16px)"
          stroke="#32C5E8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>

      {/* ── ACTUAL BUTTON CONTAINER WITH PROGRESSIVE FORMATION ── */}
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-brand text-xs sm:text-sm font-bold tracking-wider text-slate-900 bg-white/95 backdrop-blur-md border border-primary/30 hover:border-primary/70 hover:bg-slate-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(30,107,147,0.08)] hover:shadow-[0_8px_30px_rgba(30,107,147,0.20)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden ${
          disabled ? 'opacity-60 pointer-events-none' : ''
        } ${className}`}
      >
        {/* Formed Animated Perimeter Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="15"
            fill="none"
            stroke="#32C5E8"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Cyan Accent Segments at Top & Bottom */}
          <motion.rect
            x="35%"
            y="0"
            width="30%"
            height="2"
            fill="#32C5E8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
          <motion.rect
            x="35%"
            y="calc(100% - 2px)"
            width="30%"
            height="2"
            fill="#32C5E8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        </svg>

        {/* Traveling Perimeter Glow Beam on Hover */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="99%"
            height="95%"
            rx="15"
            fill="none"
            stroke="url(#pcbBeamGrad)"
            strokeWidth="1.8"
            className="pcb-border-beam"
          />
          <defs>
            <linearGradient id="pcbBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#32C5E8" stopOpacity="1" />
              <stop offset="50%" stopColor="#1E6B93" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#32C5E8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Luminous Halo on Hover */}
        <div className="absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

        {/* Optional Custom Icon */}
        {Icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.3 }}
            className="relative z-10"
          >
            <Icon className="w-4 h-4 text-primary group-hover:text-primary transition-colors duration-300" />
          </motion.div>
        )}

        {/* Button Text — Smooth Reveal After Outline Assembly */}
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 text-slate-900 group-hover:text-slate-950 transition-colors duration-300"
        >
          {children}
        </motion.span>

        {/* Clean Arrow Icon */}
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3, ease: 'easeOut' }}
            className="relative z-10"
          >
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1.5 transition-all duration-300 ease-out" />
          </motion.div>
        )}
      </button>
    </div>
  )
}

export default PcbLightButton
