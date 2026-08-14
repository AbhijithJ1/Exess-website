import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * ExESS Intro Animation — Exact SVG Recreation of Reference Image
 */

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null)
  const [phase, setPhase] = useState(0) // 0: drawing, 1: nodes active, 2: pulse, 3: core bloom, 4: logo, 5: final
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    const el = containerRef.current
    if (el) {
      el.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1)'
      el.style.opacity = '0'
      setTimeout(() => { if (onComplete) onComplete() }, 460)
    } else {
      if (onComplete) onComplete()
    }
  }

  useEffect(() => {
    // Phases timings
    const t1 = setTimeout(() => setPhase(1), 100)  // draw traces start
    const t2 = setTimeout(() => setPhase(2), 900)  // logo emblem fades in
    const t3 = setTimeout(() => setPhase(3), 1900) // spark / erase start
    const t4 = setTimeout(() => setPhase(4), 2700) // settle
    const t5 = setTimeout(() => finish(), 3900)   // finish

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Left traces coordinates matching the image exactly
  const traces = [
    {
      id: 'L1',
      d: 'M 50,140 L 200,140 L 215,155 L 250,155',
      node: [250, 155],
      outer: [50, 140]
    },
    {
      id: 'L2',
      d: 'M 50,210 L 195,210 L 200,215',
      node: [200, 215],
      outer: [50, 210]
    },
    {
      id: 'L3',
      d: 'M 50,280 L 195,280 L 200,275',
      node: [200, 275],
      outer: [50, 280]
    },
    {
      id: 'L4',
      d: 'M 50,350 L 200,350 L 215,335 L 250,335',
      node: [250, 335],
      outer: [50, 350]
    }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#FFFFFF',
        userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      <style>{`
        @keyframes drawTrace {
        .outer-node {
          fill: #FFFFFF;
          stroke: #1E6B93;
          stroke-width: 2;
        }
      `}</style>

      <svg
        width="600"
        height="500"
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 'min(90vw, 600px)', height: 'auto' }}
      >
        {/* Left-Side Traces Group */}
        <g id="left-side">
          {traces.map((t, i) => (
            <g key={t.id}>
              {/* Main Background PCB Trace */}
              <motion.path
                d={t.d}
                stroke="#1E6B93"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={
                  phase >= 3
                    ? { pathLength: 1, pathOffset: 1 }
                    : phase >= 1
                      ? { pathLength: 1 }
                      : {}
                }
                transition={{
                  pathLength: { duration: 0.7, delay: i * 0.04, ease: "easeOut" },
                  pathOffset: { duration: 1.1, delay: i * 0.04, ease: "easeInOut" }
                }}
              />

              {/* Cyan Energy Pulse overlay - double layer for lightning shock */}
              <motion.path
                d={t.d}
                stroke="#00F0FF"
                strokeWidth={phase >= 3 ? [4.5, 2.5, 5.5, 3.2, 5.0, 4.5] : 4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 4px #00F0FF) drop-shadow(0 0 10px #32C5E8)' }}
                initial={{ pathLength: 0.01, pathOffset: -0.01, opacity: 0 }}
                animate={phase >= 3 ? {
                  pathOffset: 1,
                  opacity: [0, 1, 1, 0]
                } : {}}
                transition={{
                  duration: 1.1,
                  delay: i * 0.04,
                  ease: "easeInOut",
                  opacity: { times: [0, 0.1, 0.9, 1] },
                  strokeWidth: { repeat: Infinity, duration: 0.15 }
                }}
              />
              <motion.path
                d={t.d}
                stroke="#FFFFFF"
                strokeWidth={phase >= 3 ? [1.8, 1.0, 2.2, 1.2, 1.8] : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 1px #FFFFFF)' }}
                initial={{ pathLength: 0.01, pathOffset: -0.01, opacity: 0 }}
                animate={phase >= 3 ? {
                  pathOffset: 1,
                  opacity: [0, 1, 1, 0]
                } : {}}
                transition={{
                  duration: 1.1,
                  delay: i * 0.04,
                  ease: "easeInOut",
                  opacity: { times: [0, 0.1, 0.9, 1] },
                  strokeWidth: { repeat: Infinity, duration: 0.15 }
                }}
              />

              {/* Outer terminals */}
              <motion.circle
                cx={t.outer[0]}
                cy={t.outer[1]}
                r="4.5"
                fill="#FFFFFF"
                stroke="#1E6B93"
                strokeWidth="2.2"
                initial={{ opacity: 1, scale: 1 }}
                animate={phase >= 3 ? { opacity: 0, scale: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ originX: `${t.outer[0]}px`, originY: `${t.outer[1]}px` }}
              />
            </g>
          ))}
        </g>

        {/* Right-Side Traces Group - Mirrored Horizontally from the center (600,0) */}
        <g id="right-side" transform="translate(600, 0) scale(-1, 1)">
          {traces.map((t, i) => (
            <g key={`R-${t.id}`}>
              {/* Main Background PCB Trace */}
              <motion.path
                d={t.d}
                stroke="#1E6B93"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={
                  phase >= 3
                    ? { pathLength: 1, pathOffset: 1 }
                    : phase >= 1
                      ? { pathLength: 1 }
                      : {}
                }
                transition={{
                  pathLength: { duration: 0.7, delay: i * 0.04, ease: "easeOut" },
                  pathOffset: { duration: 1.1, delay: i * 0.04, ease: "easeInOut" }
                }}
              />

              {/* Cyan Energy Pulse overlay */}
              <motion.path
                d={t.d}
                stroke="#00F0FF"
                strokeWidth={phase >= 3 ? [4.5, 2.5, 5.5, 3.2, 5.0, 4.5] : 4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 4px #00F0FF) drop-shadow(0 0 10px #32C5E8)' }}
                initial={{ pathLength: 0.01, pathOffset: -0.01, opacity: 0 }}
                animate={phase >= 3 ? {
                  pathOffset: 1,
                  opacity: [0, 1, 1, 0]
                } : {}}
                transition={{
                  duration: 1.1,
                  delay: i * 0.04,
                  ease: "easeInOut",
                  opacity: { times: [0, 0.1, 0.9, 1] },
                  strokeWidth: { repeat: Infinity, duration: 0.15 }
                }}
              />
              <motion.path
                d={t.d}
                stroke="#FFFFFF"
                strokeWidth={phase >= 3 ? [1.8, 1.0, 2.2, 1.2, 1.8] : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 1px #FFFFFF)' }}
                initial={{ pathLength: 0.01, pathOffset: -0.01, opacity: 0 }}
                animate={phase >= 3 ? {
                  pathOffset: 1,
                  opacity: [0, 1, 1, 0]
                } : {}}
                transition={{
                  duration: 1.1,
                  delay: i * 0.04,
                  ease: "easeInOut",
                  opacity: { times: [0, 0.1, 0.9, 1] },
                  strokeWidth: { repeat: Infinity, duration: 0.15 }
                }}
              />

              <motion.circle
                cx={t.outer[0]}
                cy={t.outer[1]}
                r="4.5"
                fill="#FFFFFF"
                stroke="#1E6B93"
                strokeWidth="2.2"
                initial={{ opacity: 1, scale: 1 }}
                animate={phase >= 3 ? { opacity: 0, scale: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ originX: `${t.outer[0]}px`, originY: `${t.outer[1]}px` }}
              />
            </g>
          ))}
        </g>

        {/* SVG Gradients */}
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#32C5E8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#32C5E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Logo Emblem (Centered around (300, 205) to make space for Wordmark) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ originX: '300px', originY: '205px' }}
        >
          <circle cx="300" cy="205" r="50" stroke="#1E6B93" strokeWidth="3.5" fill="none" />
          <ellipse cx="300" cy="205" rx="50" ry="15" stroke="#1E6B93" strokeWidth="1.5" fill="none" opacity="0.75" />
          <ellipse cx="300" cy="205" rx="50" ry="30" stroke="#1E6B93" strokeWidth="1.5" fill="none" opacity="0.75" />
          <line x1="300" y1="155" x2="300" y2="255" stroke="#1E6B93" strokeWidth="1.5" opacity="0.75" />
          <line x1="270" y1="168" x2="270" y2="242" stroke="#1E6B93" strokeWidth="1.5" opacity="0.75" />
          <line x1="330" y1="168" x2="330" y2="242" stroke="#1E6B93" strokeWidth="1.5" opacity="0.75" />

          <ellipse
            cx="300"
            cy="205"
            rx="64"
            ry="19"
            stroke="#32C5E8"
            strokeWidth="2.5"
            fill="none"
            transform="rotate(-12 300 205)"
          />

          {/* Connected 5 Circuit Connectors */}
          <path d="M275 255 L275 272 L255 272 L255 293" stroke="#1E6B93" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M288 255 L288 282 L275 282 L275 303" stroke="#1E6B93" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M300 255 L300 288" stroke="#1E6B93" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M312 255 L312 282 L325 282 L325 303" stroke="#1E6B93" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M325 255 L325 272 L345 272 L345 293" stroke="#1E6B93" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Circuit Nodes */}
          <rect x="248" y="293" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
          <rect x="268" y="303" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
          <rect x="292" y="288" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
          <rect x="318" y="303" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
          <rect x="338" y="293" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />

          {/* Inner Solid Nodes */}
          <rect x="253" y="298" width="4" height="4" rx="1" fill="#1E6B93" />
          <rect x="273" y="308" width="4" height="4" rx="1" fill="#1E6B93" />
          <rect x="298" y="294" width="4" height="4" rx="1" fill="#1E6B93" />
          <rect x="323" y="308" width="4" height="4" rx="1" fill="#1E6B93" />
          <rect x="343" y="298" width="4" height="4" rx="1" fill="#1E6B93" />
        </motion.g>

        {/* Wordmark (Centered below) */}

      </svg>
    </div>
  )
}

export default IntroAnimation
