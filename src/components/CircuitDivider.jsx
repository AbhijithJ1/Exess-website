import { useRef, useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * CircuitDivider — animated PCB trace connector between sections.
 * When the divider enters the viewport, a trace grows and a signal
 * pulse travels through it, giving the feel of electricity flowing
 * down the page into the next section.
 */
const CircuitDivider = ({ variant = 'default', className = '' }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.4 })
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // slight delay so it fires after the trace starts growing
      const t = setTimeout(() => setAnimate(true), 100)
      return () => clearTimeout(t)
    }
  }, [isVisible])

  const paths = {
    default: 'M0,40 H160 L200,12 H400 L440,40 H600',
    left:    'M0,40 H100 L140,12 H300 L340,40 H600',
    center:  'M0,40 H60 L100,14 L200,14 L240,40 H360 L400,14 H600',
    right:   'M0,40 H260 L300,12 H460 L500,40 H600',
  }

  const d = paths[variant] || paths.default

  // Via/node positions for each variant
  const vias = {
    default: [{ cx: 160, cy: 40 }, { cx: 400, cy: 40 }, { cx: 440, cy: 40 }],
    left:    [{ cx: 100, cy: 40 }, { cx: 340, cy: 40 }],
    center:  [{ cx: 60, cy: 40 }, { cx: 360, cy: 40 }],
    right:   [{ cx: 260, cy: 40 }, { cx: 500, cy: 40 }],
  }
  const v = vias[variant] || vias.default

  return (
    <div
      ref={ref}
      className={`relative h-20 overflow-visible pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 80"
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Ghost trace — always visible, very faint */}
        <path
          d={d}
          stroke="rgba(30, 107, 147, 0.06)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated growing trace */}
        <path
          d={d}
          stroke="rgba(30, 107, 147, 0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="800"
          strokeDashoffset={isVisible ? 0 : 800}
          style={{
            transition: isVisible
              ? 'stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        />

        {/* Via dots */}
        {v.map((via, i) => (
          <circle
            key={i}
            cx={via.cx}
            cy={via.cy}
            r={3.5}
            fill="rgba(30, 107, 147, 0.18)"
            stroke="rgba(30, 107, 147, 0.3)"
            strokeWidth="1"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.4s ease ${0.5 + i * 0.15}s`,
            }}
          />
        ))}

        {/* Signal pulse — travels along path when visible */}
        {animate && (
          <g>
            {/* outer glow */}
            <circle r={7} fill="rgba(50, 197, 232, 0.25)">
              <animateMotion dur="1.1s" fill="freeze" path={d} />
            </circle>
            {/* core dot */}
            <circle r={3.5} fill="#32C5E8">
              <animateMotion dur="1.1s" fill="freeze" path={d} />
            </circle>
            {/* bright center */}
            <circle r={1.5} fill="#FFFFFF">
              <animateMotion dur="1.1s" fill="freeze" path={d} />
            </circle>
          </g>
        )}
      </svg>
    </div>
  )
}

export default CircuitDivider
