import React from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * PcbLightButton — Signature ExESS Light-Theme Engineered Button
 *
 * Default: White/pale blue surface, thin blue border, dark text, clean arrow.
 * Hover: Surface stays light (bg-slate-50), border light beam accelerates,
 * text stays bold dark, arrow slides 4px forward, 2px lift. NO solid blue fill.
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
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-3.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-2xl font-brand text-xs sm:text-sm font-bold tracking-wider text-slate-900 bg-white/95 backdrop-blur-md border border-primary/30 hover:border-primary/70 hover:bg-slate-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(30,107,147,0.08)] hover:shadow-[0_8px_30px_rgba(30,107,147,0.20)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden ${
        disabled ? 'opacity-60 pointer-events-none' : ''
      } ${className}`}
    >
      {/* ── Traveling PCB Electrical Border Light Beam SVG ── */}
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

      {/* Subtle Luminous Halo on Hover (Light Surface Preserved) */}
      <div className="absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

      {/* Optional Left Icon */}
      {Icon && (
        <Icon className="relative z-10 w-4 h-4 text-primary group-hover:text-primary transition-colors duration-300" />
      )}

      {/* Button Text — Remains Dark & Crisp */}
      <span className="relative z-10 text-slate-900 group-hover:text-slate-950 transition-colors duration-300">
        {children}
      </span>

      {/* Clean Arrow Icon — Slides 4px Forward */}
      {showArrow && (
        <ArrowRight className="relative z-10 w-4 h-4 text-primary group-hover:translate-x-1.5 transition-all duration-300 ease-out" />
      )}
    </button>
  )
}

export default PcbLightButton
