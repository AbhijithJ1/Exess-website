import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Energy Light Sweeping From PCB Traces To Form Logo Circle
 *
 * ANIMATION CHOREOGRAPHY:
 * 1. Circuit Wake-up (0.0s - 1.2s): PCB motherboard traces draw inward from outer edges.
 * 2. Energy Light Travel (1.2s - 2.4s): Cyan energy lights travel along PCB paths from far away toward logo.
 * 3. Energy Light Circle Formation (2.4s - 3.8s): Energy lights sweep 360° around logo to DRAW/FORM the circle!
 * 4. Logo Power On (3.8s - 5.0s): Energy circle glows cyan and powers emblem line assembly inside.
 * 5. Wordmark Reveal (4.8s - 6.2s): Letters 'E'-'x'-'E'-'S'-'S' reveal progressively LEFT → RIGHT.
 * 6. Energy Absorption (6.0s - 7.0s): Energy circle smoothly absorbs/fades away into crisp ExESS identity.
 * 7. Preloader Transition (7.0s - 7.5s): Smooth opacity fade-out into main website.
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
  const containerRef     = useRef(null)
  const pcbSvgRef        = useRef(null)
  const pulseSvgRef      = useRef(null)
  const drawnCircleRef   = useRef(null)
  const socketPadsRef    = useRef(null)
  const logoGroupRef     = useRef(null)
  const emblemWrapperRef = useRef(null)
  const emblemSvgRef     = useRef(null)
  const lettersRef       = useRef([])
  const hasFinishedRef   = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.5s ease-in-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 480)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Hide Logo Group Initially
    gsap.set(logoGroupRef.current, { opacity: 0 })
    gsap.set(emblemWrapperRef.current, { filter: 'drop-shadow(0 0 0px transparent)' })

    // Setup Energy Circle for drawing sequence
    const circleEl = drawnCircleRef.current
    if (circleEl) {
      const len = (() => { try { return circleEl.getTotalLength() } catch { return 880 } })()
      gsap.set(circleEl, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    }

    // Setup Emblem paths
    const emblemEl = emblemSvgRef.current
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      emblemPaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Outer PCB Socket Frame & Motherboard Traces
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      pulses.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Wordmark Letters
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, y: 16, filter: 'blur(8px)' })
      }
    })

    // Setup Socket Terminal Pads
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      pads.forEach(p => gsap.set(p, { scale: 1, fill: '#1E6B93' }))
    }

    // ── MASTER CINEMATIC TIMELINE ──────────────────────────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: CIRCUIT WAKE-UP (0.0s - 1.2s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 1.2, stagger: 0.06, ease: 'power2.inOut' }, 0.1)
    }

    // STEP 2: ENERGY LIGHT TRAVELS FROM FAR AWAY ALONG PCB TRACES (1.2s - 2.4s)
    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      tl.to(pulses, { strokeDashoffset: 0, opacity: 1, duration: 1.3, stagger: 0.08, ease: 'power1.inOut' }, 1.2)
    }

    // STEP 3: ENERGY LIGHT REACHES LOGO & DRAWS/FORMS THE CIRCLE AROUND LOGO (2.4s - 3.8s)
    if (circleEl) {
      tl.to(circleEl, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.inOut',
      }, 2.3)
    }

    // STEP 4: FORMED ENERGY CIRCLE POWERS EMBLEM & GLOWS CYAN (3.8s - 5.0s)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.3 }, 3.6)

    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power2.out',
      }, 3.6)
    }

    // Subtle Cyan Activation Glow when circle powers emblem
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 20px rgba(50,197,232,0.55))',
      duration: 0.6,
      ease: 'power1.out',
    }, 4.0)

    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 10px rgba(50,197,232,0.20))',
      duration: 0.9,
      ease: 'power2.out',
    }, 4.6)

    // Synchronized Terminal Pads Glow
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      tl.to(pads, {
        fill: '#32C5E8',
        scale: 1.35,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(2)',
      }, 4.0)

      tl.to(pads, {
        fill: '#1E6B93',
        scale: 1,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power2.out',
      }, 4.5)
    }

    // STEP 5: WORDMARK REVEAL PROGRESSIVELY LEFT → RIGHT (4.8s - 6.4s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          ease: 'back.out(1.4)',
        }, 4.8 + index * 0.2)
      }
    })

    // STEP 6: ENERGY CIRCLE FADES / ABSORBS INTO LOGO (6.0s - 7.0s)
    if (circleEl) {
      tl.to(circleEl, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      }, 6.0)
    }

    if (pulseSvgRef.current) {
      tl.to(pulseSvgRef.current, { opacity: 0, duration: 0.9 }, 6.0)
    }

    // Pause to admire clean ExESS identity
    tl.to({}, { duration: 0.5 }, 6.8)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 7800)

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
      {/* ── PCB SOCKET FRAME SVG (FRAMES THE LOGO SAFELY OUTSIDE AT x:150..450, y:140..460) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Socket Outer Framing Brackets */}
        <path className="pcb-trace" d="M 40 40 H 200 V 140 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 40 H 400 V 140 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Left / Right Vertical Socket Boundaries */}
        <path className="pcb-trace" d="M 20 240 H 140 V 360 H 20" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 580 240 H 460 V 360 H 580" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Bottom Framing Brackets */}
        <path className="pcb-trace" d="M 40 560 H 200 V 460 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 560 H 400 V 460 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Framing Corner Accents */}
        <path className="pcb-trace" d="M 140 180 V 140 H 180" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 460 180 V 140 H 420" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 140 420 V 460 H 180" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 460 420 V 460 H 420" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
      </svg>

      {/* ── TERMINAL SOCKET PADS GROUP (OUTSIDE CENTRAL LOGO ZONE) ── */}
      <svg
        ref={socketPadsRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="socket-pad" cx="240" cy="140" r="3.5" />
        <circle className="socket-pad" cx="360" cy="140" r="3.5" />
        <circle className="socket-pad" cx="140" cy="240" r="3.5" />
        <circle className="socket-pad" cx="140" cy="360" r="3.5" />
        <circle className="socket-pad" cx="460" cy="240" r="3.5" />
        <circle className="socket-pad" cx="460" cy="360" r="3.5" />
        <circle className="socket-pad" cx="240" cy="460" r="3.5" />
        <circle className="socket-pad" cx="360" cy="460" r="3.5" />
      </svg>

      {/* ── CONVERGING SIGNAL PULSES ALONG PCB PATHS FROM FAR AWAY ── */}
      <svg
        ref={pulseSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pcb-pulse" d="M 40 40 H 200 V 140 H 240" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 560 40 H 400 V 140 H 360" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 20 240 H 140" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 580 240 H 460" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* ── ENERGY LIGHT DRAWN CIRCLE (FORMED BY ENERGY LIGHT COMING FROM FAR AWAY) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          ref={drawnCircleRef}
          cx="300"
          cy="300"
          r="140"
          stroke="#32C5E8"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
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

        {/* Wordmark Assembly — Progressive L→R Letter Reveal (100% CLEAN TEXT) */}
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
