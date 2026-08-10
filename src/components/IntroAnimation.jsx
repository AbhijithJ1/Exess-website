import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Final ExESS Logo Story Transition
 *
 * STORY:
 * 1. PCB Circuit Traces Form Inward (0.0s - 0.85s)
 * 2. Energy Pulses Travel Along Traces (0.85s - 1.35s)
 * 3. Energy Arrives at Inner Endpoints & Gathers (1.35s - 1.55s)
 * 4. Energy Converges Inward to Central Core (1.55s - 1.85s)
 * 5. Emblem & ExESS Wordmark Power On (1.85s - 2.50s)
 * 6. PCB Traces Smoothly Retract Outward to Create Generous Breathing Room (2.10s - 2.70s)
 * 7. Final Clean Identity Holds in Negative Space before Preloader Exit (2.70s - 3.20s)
 */

const EmblemSVG = ({ svgRef }) => (
  <svg
    ref={svgRef}
    viewBox="0 0 200 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full overflow-visible"
  >
    {/* Globe outer circle */}
    <circle className="emblem-path" cx="100" cy="85" r="50" stroke="#1E6B93" strokeWidth="3" />

    {/* Latitude ellipses */}
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="15" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="30" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="43" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />

    {/* Longitude lines */}
    <line className="emblem-path" x1="100" y1="35" x2="100" y2="135" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="70"  y1="48" x2="70"  y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="130" y1="48" x2="130" y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="50"  y1="68" x2="50"  y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />
    <line className="emblem-path" x1="150" y1="68" x2="150" y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />

    {/* Cyan Orbit ellipse */}
    <ellipse
      className="emblem-path emblem-orbit"
      cx="100" cy="85" rx="64" ry="19"
      stroke="#32C5E8" strokeWidth="2.8"
      transform="rotate(-12 100 85)"
    />

    {/* PCB circuit traces below globe (connected nodes) */}
    <path className="node-path" d="M75 135 L70 155 L55 155 L55 175"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M90 135 L90 160 L75 160 L75 185"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M110 135 L110 155 L125 155 L125 175" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M125 135 L130 160 L145 160 L145 185" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M100 135 L100 165"                  stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" />

    {/* Terminal pads */}
    <rect className="node-path node-pad" x="48"  y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="68"  y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="92"  y="168" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="118" y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="138" y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />

    {/* Pad fills */}
    <rect className="node-fill" x="53"  y="178" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="73"  y="188" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="98"  y="174" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="123" y="188" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="143" y="178" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
  </svg>
)

const IntroAnimation = ({ onComplete }) => {
  const containerRef       = useRef(null)
  const pcbSvgRef          = useRef(null)
  const pulseGroupRef      = useRef(null)
  const socketPadsRef      = useRef(null)
  const centerCoreRef      = useRef(null)
  const logoGroupRef       = useRef(null)
  const emblemWrapperRef   = useRef(null)
  const emblemSvgRef       = useRef(null)
  const lettersRef         = useRef([])
  const hasFinishedRef     = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.4s ease-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 390)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    // Accessibility: Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      finishAnimation()
      return
    }

    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Hide Logo Group & Center Energy Core Initially
    gsap.set(logoGroupRef.current, { opacity: 0 })
    gsap.set(centerCoreRef.current, { opacity: 0, scale: 0 })
    gsap.set(emblemWrapperRef.current, { filter: 'drop-shadow(0 0 0px transparent)' })

    // Setup Emblem paths
    const emblemEl = emblemSvgRef.current
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const nodePaths   = emblemEl.querySelectorAll('.node-path')
      const nodeFills   = emblemEl.querySelectorAll('.node-fill')

      emblemPaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      nodePaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 150 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      nodeFills.forEach(el => gsap.set(el, { opacity: 0 }))
    }

    // Setup Outer PCB Traces & Signal Pulses
    let traceLens = []
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach((el) => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        traceLens.push(len)
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.85 })
      })
    }

    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      pulses.forEach((el, idx) => {
        const len = traceLens[idx] || 400
        gsap.set(el, { strokeDasharray: `40 ${len}`, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Wordmark Letters
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, filter: 'blur(0px)' })
      }
    })

    // Setup Socket Terminal Pads
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      pads.forEach(p => gsap.set(p, { scale: 1, fill: '#1E6B93', opacity: 0.3 }))
    }

    // ── MASTER CINEMATIC TIMELINE ─────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: PCB TRACE FORMATION INWARD (0.0s - 0.85s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 0.80, stagger: 0.03, ease: 'power2.inOut' }, 0.05)
    }

    // STEP 2: ENERGY PULSES TRAVEL ALONG ALL PCB TRACES SIMULTANEOUSLY (0.85s - 1.35s)
    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      pulses.forEach((el) => {
        tl.to(el, { strokeDashoffset: 0, opacity: 1, duration: 0.50, ease: 'power2.in' }, 0.85)
      })
    }

    // STEP 3: ENERGY ARRIVES & ILLUMINATES INNER SOCKET PADS (1.35s - 1.55s)
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      tl.to(pads, { fill: '#32C5E8', opacity: 1, scale: 1.3, duration: 0.20, ease: 'power1.out' }, 1.35)
    }

    // Fade energy trail beams after reaching pads
    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      tl.to(pulses, { opacity: 0, duration: 0.20 }, 1.35)
    }

    // STEP 4: CONVERGENCE — ENERGY CONVERGES FROM ENDPOINTS TO CENTRAL CORE (1.55s - 1.85s)
    tl.to(centerCoreRef.current, { opacity: 1, scale: 1.4, duration: 0.30, ease: 'power2.out' }, 1.55)

    // STEP 5: LOGO ACTIVATION — EMBLEM GLOBE LINES & ORBIT (1.85s - 2.20s)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.10 }, 1.85)
    tl.to(centerCoreRef.current, { opacity: 0, scale: 0.2, duration: 0.15 }, 1.85)

    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 14px rgba(50,197,232,0.75))',
      duration: 0.20,
      ease: 'power1.out',
    }, 1.85)

    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const nodePaths   = emblemEl.querySelectorAll('.node-path')
      const nodeFills   = emblemEl.querySelectorAll('.node-fill')

      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out',
      }, 1.88)

      tl.to(nodePaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.out',
      }, 2.00)

      tl.to(nodeFills, { opacity: 1, duration: 0.15, stagger: 0.01 }, 2.08)
    }

    // STEP 6: EXESS WORDMARK FORMS PROGRESSIVELY L → R (E → x → E → S → S) (2.10s - 2.50s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          duration: 0.10,
          ease: 'power1.out',
        }, 2.10 + index * 0.08)
      }
    })

    // STEP 7: CRITICAL FINAL-STATE BEHAVIOR — PCB TRACES SMOOTHLY RETRACT OUTWARD (2.10s - 2.70s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach((el, idx) => {
        const len = traceLens[idx] || 400
        tl.to(el, {
          strokeDashoffset: len * 0.75, // Retracts 75% outward along original paths!
          opacity: 0.15,                 // Fades into very subtle background trace
          duration: 0.60,
          ease: 'power2.out',
        }, 2.10)
      })
    }

    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      tl.to(pads, { opacity: 0.15, fill: '#1E6B93', scale: 0.9, duration: 0.60 }, 2.10)
    }

    // STEP 8: FINAL SETTLE — LOGO STAYS STABLE & CRISP IN NEGATIVE SPACE (2.70s - 3.20s)
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 6px rgba(50,197,232,0.12))',
      duration: 0.30,
      ease: 'power2.out',
    }, 2.70)

    // Hold final stable composition for user recognition
    tl.to({}, { duration: 0.50 }, 2.70)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 3800)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
    }
  }, [])

  const SVG_SIZE = 'min(92vw, 620px)'
  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <div
      ref={containerRef}
      onClick={finishAnimation}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer bg-white"
    >
      {/* ── PCB MOTHERBOARD TRACES SVG (DRAWS INWARD THEN RETRACTS OUTWARD) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Symmetrical Outer PCB Framing Traces */}
        <path className="pcb-trace" d="M 40 40 H 180 V 120 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 40 H 420 V 120 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Inward-Routing Middle PCB Signal Traces */}
        <path className="pcb-trace" d="M 20 260 H 130 V 270 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 20 340 H 130 V 330 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        <path className="pcb-trace" d="M 580 260 H 470 V 270 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 580 340 H 470 V 320 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Bottom Framing Traces */}
        <path className="pcb-trace" d="M 40 560 H 180 V 480 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 560 H 420 V 480 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Framing Corner Accents */}
        <path className="pcb-trace" d="M 130 160 V 130 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 160 V 130 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 130 440 V 470 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 440 V 470 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
      </svg>

      {/* ── SYNCHRONIZED ENERGY PULSE BEAMS TRAVELLING ALONG TRACES ── */}
      <svg
        ref={pulseGroupRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pulse-beam" d="M 40 40 H 180 V 120 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 560 40 H 420 V 120 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 20 260 H 130 V 270 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 20 340 H 130 V 330 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 580 260 H 470 V 270 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 580 340 H 470 V 320 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 40 560 H 180 V 480 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 560 560 H 420 V 480 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
      </svg>

      {/* ── TERMINAL SOCKET PADS GROUP ── */}
      <svg
        ref={socketPadsRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="socket-pad" cx="175" cy="120" r="3.5" />
        <circle className="socket-pad" cx="425" cy="120" r="3.5" />
        <circle className="socket-pad" cx="175" cy="270" r="3.5" />
        <circle className="socket-pad" cx="175" cy="330" r="3.5" />
        <circle className="socket-pad" cx="425" cy="270" r="3.5" />
        <circle className="socket-pad" cx="425" cy="330" r="3.5" />
        <circle className="socket-pad" cx="175" cy="480" r="3.5" />
        <circle className="socket-pad" cx="425" cy="480" r="3.5" />
      </svg>

      {/* ── CENTRAL CONVERGING ENERGY CORE AT (300, 220) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={centerCoreRef} style={{ transformOrigin: '300px 220px' }}>
          <circle cx="300" cy="220" r="14" fill="url(#coreGlow)" />
          <circle cx="300" cy="220" r="4" fill="#FFFFFF" />
        </g>

        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── CENTRAL ExESS IDENTITY CORE ── */}
      <div
        ref={logoGroupRef}
        className="relative z-10 flex flex-col items-center justify-center text-center p-4"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Emblem Assembly */}
        <div
          ref={emblemWrapperRef}
          style={{ width: 'clamp(110px, 16vw, 135px)', height: 'clamp(120px, 18vw, 150px)' }}
        >
          <EmblemSVG svgRef={emblemSvgRef} />
        </div>

        {/* Wordmark Assembly — Progressive L→R Letter Reveal */}
        <div className="mt-3.5 flex items-center justify-center gap-0.5">
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight flex"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
            }}
          >
            {exessLetters.map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-[11px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none opacity-50">
        Click to skip &rarr;
      </div>
    </div>
  )
}

export default IntroAnimation
