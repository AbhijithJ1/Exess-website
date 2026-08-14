import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImagePlaceholder from './ImagePlaceholder'

gsap.registerPlugin(ScrollTrigger)

/**
 * About Us — Single-Viewport Compact Editorial Composition
 *
 * Cinematic Entrance:
 *   Stage 1 — Convergence Burst Anchor
 *   Stage 2 — "ABOUT US" Typographic Entrance
 *   Stage 3 — Title Locks into Place + Overview, Image & Mission/Vision settle cleanly into one viewport
 */

const About = () => {
  const wrapperRef = useRef(null)
  const pinContainerRef = useRef(null)

  // Stage element refs
  const burstRef = useRef(null)
  const bigWordRef = useRef(null)
  const headlineWrapRef = useRef(null)
  const headlineSubRef = useRef(null)
  const imageStageRef = useRef(null)
  const copyPanelRef = useRef(null)
  const missionPanelRef = useRef(null)
  const visionPanelRef = useRef(null)

  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(reducedMedia.matches)

    if (reducedMedia.matches) return

    const isMobile = window.innerWidth < 768
    const scrollDistance = isMobile ? '+=30%' : '+=35%'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: pinContainerRef.current,
          start: 'top top',
          end: scrollDistance,
          scrub: 1,
          anticipatePin: 1,
          onRefresh: () => {}
        }
      })

      // Initial state setup for discrete timeline stages
      gsap.set(burstRef.current, { scale: 0, opacity: 0 })
      gsap.set(bigWordRef.current, { scale: isMobile ? 1.3 : 1.7, opacity: 0, filter: 'blur(16px)' })
      gsap.set(headlineWrapRef.current, { opacity: 0, y: 15 })
      gsap.set(headlineSubRef.current, { opacity: 0, y: 12 })
      gsap.set(imageStageRef.current, { opacity: 0, scale: 1.04, filter: 'blur(8px)', y: 20 })
      gsap.set(copyPanelRef.current, { opacity: 0, y: 15 })
      gsap.set(missionPanelRef.current, { opacity: 0, x: -20 })
      gsap.set(visionPanelRef.current, { opacity: 0, x: 20 })

      // ── STAGE 1: Pulse Convergence Burst ───────
      tl.addLabel('stage1')
        .to(burstRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out'
        })
        .to(burstRef.current, {
          scale: 1.6,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in'
        })

      // ── STAGE 2: "ABOUT US" Typographic Entrance ─────────
      tl.addLabel('stage2')
        .to(bigWordRef.current, {
          opacity: 1,
          scale: isMobile ? 1.1 : 1.3,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out'
        })

      // ── STAGE 3: Single Viewport Composition Resolves ──────
      tl.addLabel('stage3')
        .to(bigWordRef.current, {
          scale: 1.0,
          y: 0,
          duration: 0.4,
          ease: 'power3.inOut'
        })
        .to(headlineWrapRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.25')
        .to(headlineSubRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2')
        .to([imageStageRef.current, copyPanelRef.current], {
          opacity: 1,
          scale: 1.0,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        }, '-=0.2')
        .to([missionPanelRef.current, visionPanelRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.15')

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="circuits" ref={wrapperRef} className="relative bg-transparent py-4 sm:py-6">
      <div id="about" className="absolute -top-24" />

      {/* Pinned Single Viewport Container Wrapper */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-[100svh] flex flex-col justify-center py-4 sm:py-6 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

          {/* ── STAGE 1: ANCHOR PULSE CONVERGENCE BURST ──────────────────── */}
          {!isReducedMotion && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div
                ref={burstRef}
                className="w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_60px_#32C5E8]"
              />
            </div>
          )}

          {/* ── STAGE 2 & 3: PRIMARY TITLE "ABOUT US" & SUBTITLE ─────────── */}
          <div className="mb-4 text-center max-w-3xl mx-auto relative z-10">
            {/* Standalone Oversized "ABOUT US" Title */}
            <div className="relative min-h-[48px] sm:min-h-[70px] flex items-center justify-center">
              <h1
                ref={bigWordRef}
                className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary leading-none select-none uppercase"
              >
                ABOUT US
              </h1>
            </div>

            {/* Subtitle */}
            <div ref={headlineWrapRef} className="mt-1">
              <p ref={headlineSubRef} className="font-inter text-slate-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                The Electronics Students Society (ExESS) is the official departmental forum at College of Engineering Chengannur, pioneering hardware architecture, embedded systems, and circuit innovation.
              </p>
            </div>
          </div>

          {/* ── MIDDLE ROW: COMPACT IMAGE & OVERVIEW ─────────────────────────── */}
          <div className="grid md:grid-cols-12 gap-4 max-w-4xl mx-auto mb-4 items-center">
            {/* Left: Compact Image */}
            <div ref={imageStageRef} className="md:col-span-5">
              <div className="relative rounded-none overflow-hidden border border-border/60 shadow-soft bg-white p-1.5">
                <ImagePlaceholder
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
                  alt="ExESS Electronics Lab Facilities"
                  type="cover"
                  aspectRatio="aspect-[16/10]"
                  className="rounded-none"
                />
              </div>
            </div>

            {/* Right: Overview Description */}
            <div ref={copyPanelRef} className="md:col-span-7">
              <div className="bg-slate-50/80 border border-border/60 p-3.5 sm:p-4 rounded-none">
                <span className="text-[9px] font-brand uppercase tracking-[0.2em] text-primary font-bold block mb-1">
                  PRACTICAL ENGINEERING
                </span>
                <p className="font-inter text-slate-700 text-xs sm:text-sm leading-relaxed">
                  We empower undergraduates through hands-on PCB fabrication bootcamps, synthesizable Verilog/FPGA workshops, national hackathons, and direct industry mentorship from silicon specialists.
                </p>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: MISSION & VISION COMPACT PANELS ─────────────────── */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">

            {/* MISSION PANEL */}
            <div
              ref={missionPanelRef}
              className="relative p-3.5 sm:p-4 rounded-none border border-border/80 bg-white/90 shadow-soft backdrop-blur-sm flex flex-col justify-between"
              style={{ borderLeft: '3px solid #1E6B93' }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-brand uppercase tracking-[0.2em] text-primary font-bold">
                    MISSION // 01
                  </span>
                </div>
                <h3 className="font-brand text-heading text-sm sm:text-base font-bold mb-1 tracking-tight">
                  OUR MISSION
                </h3>
                <p className="font-inter text-slate-700 text-[11px] sm:text-xs leading-relaxed">
                  To strengthen technical knowledge through workshops, hackathons, competitions, PCB design, embedded systems, and industry-oriented skill development.
                </p>
              </div>
              <div className="pt-1.5 mt-2 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-gray-400">
                <span>SYSTEM_MISSION // CEC</span>
              </div>
            </div>

            {/* VISION PANEL */}
            <div
              ref={visionPanelRef}
              className="relative p-3.5 sm:p-4 rounded-none border border-border/80 bg-white/90 shadow-soft backdrop-blur-sm flex flex-col justify-between"
              style={{ borderRight: '3px solid #06b6d4' }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-brand uppercase tracking-[0.2em] text-cyan-600 font-bold">
                    VISION // 02
                  </span>
                </div>
                <h3 className="font-brand text-heading text-sm sm:text-base font-bold mb-1 tracking-tight">
                  OUR VISION
                </h3>
                <p className="font-inter text-slate-700 text-[11px] sm:text-xs leading-relaxed">
                  To serve as a benchmark engineering body that inspires hardware innovation and empowers undergraduates to become competent technology leaders.
                </p>
              </div>
              <div className="pt-1.5 mt-2 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-gray-400">
                <span>SYSTEM_VISION // CEC</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default About
