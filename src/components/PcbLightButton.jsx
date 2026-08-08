import React from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * PcbLightButton — Signature ExESS Engineered Button Component
 * Features a glowing PCB electrical signal traveling around the outer border,
 * glass surface, smooth hover transitions, and press feedback.
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
      className={`group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-brand text-xs sm:text-sm font-semibold tracking-wider text-slate-800 bg-white/95 backdrop-blur-md border border-primary/25 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(30,107,147,0.08)] hover:shadow-[0_8px_30px_rgba(30,107,147,0.22)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden ${
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
            <stop offset="50%" stopColor="#1E6B93" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#32C5E8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Surface Blue Gradient Fill on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E6B93] to-[#187AA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

      {/* Optional Custom Left Icon */}
      {Icon && (
        <Icon className="relative z-10 w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
      )}

      {/* Button Text */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>

      {/* Clean Arrow Icon */}
      {showArrow && (
        <ArrowRight className="relative z-10 w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 ease-out" />
      )}
    </button>
  )
}

export default PcbLightButton
