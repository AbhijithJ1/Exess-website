import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Cpu, ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { projectsData } from '../data/projectsData'

const AUTOPLAY_INTERVAL = 4500

/**
 * Projects — REACT BITS PRO SKEWED CAROUSEL (MATCHING SECTION DESIGN LANGUAGE)
 *
 * Design Architecture:
 *   - Skewed 3D marquee stage (center active card enlarged & upright, side cards tilted in 3D perspective).
 *   - Full-bleed vertical image cards with gradient text overlay over the photo.
 *   - Preserved original section background styling (`bg-slate-50/30`).
 *   - Auto-advances every 4.5 seconds (pauses on hover or modal open).
 *   - Members count completely removed.
 */
const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const sectionRef = useRef(null)
  const autoplayRef = useRef(null)

  const totalProjects = projectsData.length

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalProjects)
  }, [totalProjects])

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalProjects) % totalProjects)
  }, [totalProjects])

  // Viewport Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance Autoplay Timer (4.5s)
  useEffect(() => {
    if (!isInView || isPaused || selectedProject || showAllModal) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }

    autoplayRef.current = setInterval(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isInView, isPaused, selectedProject, showAllModal, handleNext])

  // Compute offset index relative to activeIdx (-2, -1, 0, 1, 2)
  const getCardOffset = (index) => {
    let diff = index - activeIdx
    if (diff > totalProjects / 2) diff -= totalProjects
    if (diff < -totalProjects / 2) diff += totalProjects
    return diff
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative section-gap overflow-hidden bg-slate-50/30 py-12 sm:py-16 min-h-[100svh] flex flex-col justify-center select-none"
    >
      <div className="section-padding max-w-7xl mx-auto relative z-10 w-full">

        {/* ── 1. SECTION HEADING (PRESERVED ORIGINAL DESIGN TOKENS) ───────── */}
        <div className="mb-6 sm:mb-10 border-b border-border/60 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-0.5">
              PROJECTS &amp; INNOVATION
            </span>

            <h2
              className="font-brand text-heading font-bold tracking-tight leading-none text-light-sweep-dark"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
            >
              HARDWARE PROJECTS
            </h2>

            <p className="font-inter text-body text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Circuit prototypes, robotics architectures, and embedded systems engineered by ExESS.
            </p>
          </div>

          <span className="font-mono text-xs text-primary font-bold tracking-wider self-end sm:self-auto bg-white border border-border/80 px-3.5 py-1 rounded-none shadow-sm">
            {String(activeIdx + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
          </span>
        </div>

        {/* ── 2. REACT BITS PRO SKEWED CAROUSEL STAGE ─────────────────────── */}
        <div
          className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center overflow-hidden my-2"
          style={{ perspective: '1200px' }}
        >
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {projectsData.map((project, idx) => {
              const offset = getCardOffset(idx)
              const isVisible = Math.abs(offset) <= 2 // Render visible subset around center

              if (!isVisible) return null

              const isActive = offset === 0

              // Dynamic 3D skew, tilt rotateY, scale, and horizontal translate
              let rotateY = 0
              let skewY = 0
              let scale = 1
              let opacity = 1
              let zIndex = 30
              let translateX = offset * 210

              if (offset < 0) {
                rotateY = 32
                skewY = -8
                scale = 0.8
                opacity = Math.abs(offset) === 1 ? 0.75 : 0.4
                zIndex = 20 - Math.abs(offset)
                translateX = offset * 200 - 30
              } else if (offset > 0) {
                rotateY = -32
                skewY = 8
                scale = 0.8
                opacity = Math.abs(offset) === 1 ? 0.75 : 0.4
                zIndex = 20 - Math.abs(offset)
                translateX = offset * 200 + 30
              } else {
                scale = 1.08
                opacity = 1
                zIndex = 40
                translateX = 0
              }

              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x: translateX,
                    rotateY,
                    skewY,
                    scale,
                    opacity,
                    zIndex
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project)
                    } else {
                      setActiveIdx(idx)
                    }
                  }}
                  className={`absolute w-[220px] sm:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border transition-all duration-300 shadow-2xl group ${
                    isActive
                      ? 'border-primary shadow-primary/20 ring-2 ring-primary/40'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Cover Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />

                  {/* Status Badge Top-Left */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className={`px-2.5 py-0.5 rounded-none text-[9px] font-brand tracking-wider font-semibold shadow-sm ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500 text-white border border-emerald-400/40'
                        : 'bg-amber-500 text-white border border-amber-400/40'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Info Overlay DIRECTLY OVER THE IMAGE at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 text-left">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1 mb-1">
                      <Cpu className="w-3 h-3" /> SYSTEM_0{idx + 1}
                    </span>

                    <h3 className="text-base sm:text-xl font-brand font-bold text-white leading-tight drop-shadow-md group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── 3. BOTTOM CAROUSEL PROGRESS DASHES & CONTROLS ───────────────── */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dash Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {projectsData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                  idx === activeIdx
                    ? 'w-8 sm:w-10 bg-primary shadow-sm'
                    : 'w-3 sm:w-4 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL HARDWARE PROJECTS
          </PcbLightButton>
        </div>

      </div>

      {/* Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ALL ExESS HARDWARE PROJECTS</h3>
                  <p className="text-xs font-inter text-gray-500">Complete archive of circuit prototypes and embedded systems</p>
                </div>
                <button onClick={() => setShowAllModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project, idx) => (
                  <div
                    key={project.id}
                    onClick={() => { setShowAllModal(false); setActiveIdx(idx) }}
                    className="p-5 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-primary font-bold block mb-1">{project.status}</span>
                      <h4 className="font-brand text-base text-heading font-bold mb-1">{project.title}</h4>
                      <p className="text-xs font-inter text-gray-500 line-clamp-2 mb-3">{project.description}</p>
                    </div>
                    <span className="text-[10px] font-brand text-primary font-semibold flex items-center gap-1 pt-2">
                      Inspect Project <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Lightbox Modal — Full-Bleed Image with Overlapping Text (0 Wasted Space) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-24 sm:pt-28 pb-8 sm:pb-12 bg-slate-950/40 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-[16/11] sm:aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 my-auto text-white"
            >
              {/* Full-Bleed Photograph */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="absolute inset-0 size-full object-cover"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white transition-colors flex items-center justify-center cursor-pointer border border-white/20 backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gradient Backdrop & Overlapping Text */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent text-white z-10 flex flex-col justify-end pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-brand tracking-wider font-semibold ${selectedProject.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'}`}>
                    {selectedProject.status}
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-200 border border-white/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl sm:text-3xl font-brand text-white font-bold mb-1.5 tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-slate-200 leading-relaxed opacity-95 max-w-2xl">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
