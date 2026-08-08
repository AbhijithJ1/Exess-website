import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Circuit-Powered ExESS Identity Assembly
 *
 * 5-PHASE ANIMATION SEQUENCE:
 * PHASE 1: Circuit Wake-up — PCB traces draw, cyan electrical signals converge inward.
 * PHASE 2: Emblem Formation — Emblem SVG draws/assembles itself from circuit energy with cyan glow (NO WHITE BOARD).
 * PHASE 3: Wordmark Formation — Signal travels L→R revealing 'E'-'x'-'E'-'S'-'S' letters progressively.
 * PHASE 4: Circuit Connection — Final cyan energy pulse sweeps surrounding PCB network.
 * PHASE 5: Transition — Smooth 450ms fade-out into the main ExESS website.
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
      className="emblem-orbit"
      cx="100" cy="85" rx="64" ry="19"
      stroke="#32C5E8" strokeWidth="2.8"
      transform="rotate(-12 100 85)"
    />

    {/* PCB circuit traces below globe */}
    <path className="emblem-path" d="M75 135 L70 155 L55 155 L55 175"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M90 135 L90 160 L75 160 L75 185"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M110 135 L110 155 L125 155 L125 175" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M125 135 L130 160 L145 160 L145 185" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M100 135 L100 165"                  stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" />

    {/* Terminal pads */}
    <rect className="emblem-path" x="48"  y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="68"  y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="92"  y="168" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="118" y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="138" y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />

    {/* Pad fills */}
    <rect className="emblem-path" x="53"  y="178" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="73"  y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="98"  y="174" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="123" y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="143" y="178" width="4" height="4" rx="1" fill="#1E6B93" />
  </svg>
)

const IntroAnimation = ({ onComplete }) => {
  const containerRef   = useRef(null)
  const pcbSvgRef      = useRef(null)
  const pulseSvgRef    = useRef(null)
  const emblemSvgRef   = useRef(null)
  const lettersRef     = useRef([])
  const exitPulseRef   = useRef(null)
  const hasFinishedRef = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.45s ease-in-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 440)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Setup initial state for Emblem paths
    const emblemEl = emblemSvgRef.current
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const orbitPath   = emblemEl.querySelector('.emblem-orbit')

      emblemPaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      if (orbitPath) {
        const len = (() => { try { return orbitPath.getTotalLength() } catch { return 450 } })()
        gsap.set(orbitPath, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      }
    }

    // Setup initial state for PCB Traces & Signal Pulses
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 500 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      pulses.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 500 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Wordmark Letters Initial State
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, y: 20, filter: 'blur(8px)' })
      }
    })

    if (exitPulseRef.current) {
      gsap.set(exitPulseRef.current, { opacity: 0, strokeDashoffset: 500 })
    }

    // ── MASTER CHOREOGRAPHED GSAP TIMELINE ──────────────────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // PHASE 1: CIRCUIT WAKE-UP (0.0s - 0.7s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 0.65, stagger: 0.04, ease: 'power2.inOut' }, 0.05)
    }
    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      tl.to(pulses, { strokeDashoffset: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power1.inOut' }, 0.35)
    }

    // PHASE 2: EMBLEM FORMATION (0.65s - 1.4s) — Assembly from Circuit Energy (NO White Board)
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const orbitPath   = emblemEl.querySelector('.emblem-orbit')

      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.02,
        ease: 'power2.out',
      }, 0.65)

      if (orbitPath) {
        tl.to(orbitPath, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
        }, 1.05)
      }
    }

    // PHASE 3: WORDMARK FORMATION (1.3s - 1.95s) — Signal travels L→R progressively revealing E-x-E-S-S
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'back.out(1.4)',
        }, 1.3 + index * 0.1)
      }
    })

    // PHASE 4: CIRCUIT CONNECTION & FINAL SIGNAL SWEEP (2.0s - 2.5s)
    if (exitPulseRef.current) {
      tl.to(exitPulseRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 1.95)
    }

    // Settling pause
    tl.to({}, { duration: 0.35 }, 2.45)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 2900)

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
      {/* ── Outer PCB Circuit Lines SVG ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pcb-trace" d="M 20 200 H 180 V 220 H 220" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="180" cy="200" r="3.5" fill="#1E6B93" />

        <path className="pcb-trace" d="M 20 400 H 180 V 380 H 220" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="180" cy="400" r="3.5" fill="#1E6B93" />

        <path className="pcb-trace" d="M 580 200 H 420 V 220 H 380" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="420" cy="200" r="3.5" fill="#1E6B93" />

        <path className="pcb-trace" d="M 580 400 H 420 V 380 H 380" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="420" cy="400" r="3.5" fill="#1E6B93" />

        <path className="pcb-trace" d="M 220 20 V 170 H 240 V 210" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="220" cy="170" r="3.5" fill="#32C5E8" />

        <path className="pcb-trace" d="M 380 20 V 170 H 360 V 210" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="380" cy="170" r="3.5" fill="#32C5E8" />

        <path className="pcb-trace" d="M 300 420 V 580" stroke="#1E6B93" strokeWidth="2.2" strokeLinecap="square" />
      </svg>

      {/* ── Traveling Cyan Electrical Signals SVG ── */}
      <svg
        ref={pulseSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pcb-pulse" d="M 20 200 H 180 V 220 H 220" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 580 200 H 420 V 220 H 380" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 220 20 V 170 H 240 V 210" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 380 20 V 170 H 360 V 210" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />

        <path
          ref={exitPulseRef}
          d="M 300 420 V 580"
          stroke="#32C5E8"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="500"
        />
      </svg>

      {/* ── Central ExESS Identity Container (NO WHITE RECTANGULAR BOARD) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        {/* Emblem Assembly */}
        <div
          className="filter drop-shadow-[0_0_16px_rgba(50,197,232,0.30)]"
          style={{ width: 'clamp(120px, 18vw, 150px)', height: 'clamp(130px, 20vw, 165px)' }}
        >
          <EmblemSVG svgRef={emblemSvgRef} />
        </div>

        {/* Wordmark Assembly — Progressive L→R Letter Reveal */}
        <div className="mt-4 flex items-center justify-center gap-0.5">
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight flex"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
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
