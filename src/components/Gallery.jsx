import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { galleryItems } from '../data/galleryData'

/**
 * Gallery — "VISUAL TRANSMISSION" (3D Draggable Energy Wheel)
 *
 * Core Mechanics:
 *   - DOM-based 3D ring using CSS 3D transforms (rotateY + translateZ).
 *   - GPU-cheap single-rotation-wrapper animation.
 *   - Pointer/touch drag with momentum (velocity *= 0.95 per frame decay).
 *   - Scroll-linked subtle spin when in viewport.
 *   - Front-facing card is large, illuminated with PCB node edge glow, and clickable to Lightbox.
 *   - Side cards rotate to front when clicked.
 *   - FLIP Lightbox transition on front card click.
 *   - Accessible prev/next controls.
 */

const Gallery = () => {
  const [rotation, setRotation] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef(null)
  const ringRef = useRef(null)
  const dragStartRef = useRef({ x: 0, rotation: 0 })
  const velocityRef = useRef(0)
  const animFrameRef = useRef(null)
  const flipOriginRef = useRef(null)

  const imageCount = galleryItems.length
  const angleStep = 360 / imageCount

  // Radius calculation (responsive: 460px desktop, 220px mobile)
  const [radius, setRadius] = useState(460)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setRadius(mobile ? 200 : window.innerWidth < 1024 ? 340 : 460)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate active index normalized to 0..imageCount-1
  const rawActiveIdx = Math.round(-rotation / angleStep) % imageCount
  const activeIdx = (rawActiveIdx + imageCount) % imageCount

  // Frictional momentum decay loop
  useEffect(() => {
    let active = true

    const loop = () => {
      if (!isDragging && Math.abs(velocityRef.current) > 0.02) {
        velocityRef.current *= 0.95
        setRotation((prev) => prev + velocityRef.current)
      }
      if (active) {
        animFrameRef.current = requestAnimationFrame(loop)
      }
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      active = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isDragging])

  // Scroll-linked spin when in view
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (isDragging) return
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delta = window.scrollY - lastScrollY
        velocityRef.current += delta * 0.04
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDragging])

  // Drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true)
    velocityRef.current = 0
    dragStartRef.current = {
      x: e.clientX,
      rotation: rotation
    }
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStartRef.current.x
    const newRot = dragStartRef.current.rotation + deltaX * 0.35
    velocityRef.current = deltaX * 0.08
    setRotation(newRot)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    e.target.releasePointerCapture?.(e.pointerId)
  }

  // Navigation handlers
  const rotateToPrev = () => {
    velocityRef.current = 0
    setRotation((prev) => Math.round(prev / angleStep) * angleStep + angleStep)
  }

  const rotateToNext = () => {
    velocityRef.current = 0
    setRotation((prev) => Math.round(prev / angleStep) * angleStep - angleStep)
  }

  const rotateToIndex = (idx) => {
    velocityRef.current = 0
    setRotation(-idx * angleStep)
  }

  return (
    <section id="gallery" ref={containerRef} className="relative section-gap overflow-hidden bg-slate-50/30 py-20">
      <div className="section-padding max-w-7xl mx-auto relative z-10">

        {/* ── 1. GALLERY TYPOGRAPHY ANIMATION ─────────────────────────────── */}
        <div className="mb-10 border-b border-border/60 pb-8 relative text-center sm:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '-10%' }}
            className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2"
          >
            MEMORIES &amp; COMMUNITY ARCHIVE
          </motion.span>

          <div className="relative py-2">
            {/* GALLERY — per-character stagger animation */}
            <div className="relative w-full flex items-center justify-center sm:justify-start">
              <h2
                className="font-brand text-heading font-bold tracking-tight leading-[1.0] text-light-sweep-dark flex flex-wrap"
                style={{ fontSize: 'clamp(1.5rem, 7vw, 5.5rem)' }}
              >
                {'GALLERY'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
                    whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    viewport={{ once: false, margin: '-10%' }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="font-inter text-body text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto sm:mx-0"
          >
            Drag or scroll to rotate the 3D visual wheel. Click front card for full details.
          </motion.p>
        </div>

        {/* ── 2. 3D DRAGGABLE ENERGY WHEEL ────────────────────────────────── */}
        <div className="relative my-6 sm:my-12 h-[300px] sm:h-[420px] lg:h-[540px] flex items-center justify-center select-none">

          {/* Perspective Outer Container */}
          <div
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
            style={{ perspective: isMobile ? '700px' : '1200px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 3D Ring Wrapper */}
            <div
              ref={ringRef}
              className="relative w-52 sm:w-72 lg:w-96 h-44 sm:h-64 lg:h-80 transition-transform duration-75 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
                willChange: 'transform'
              }}
            >
              {galleryItems.map((item, idx) => {
                const itemAngle = idx * angleStep
                const isFront = idx === activeIdx

                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      if (isFront) {
                        flipOriginRef.current = e.currentTarget.getBoundingClientRect()
                        setSelectedImage(item)
                      } else {
                        rotateToIndex(idx)
                      }
                    }}
                    className={`absolute inset-0 rounded-none overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isFront
                        ? 'border-cyan-400 border-t-2 border-t-cyan-400 shadow-[0_0_30px_rgba(50,197,232,0.4)] z-30 opacity-100 scale-105'
                        : 'border-slate-300/60 shadow-md opacity-45 hover:opacity-80 scale-90'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Photo Content */}
                    <div className="relative w-full h-full bg-slate-900">
                      <ImagePlaceholder
                        src={item.image}
                        alt={item.title}
                        type="cover"
                        aspectRatio="w-full h-full"
                        className="w-full h-full object-cover rounded-none"
                      />

                      {/* Front Card Glowing PCB Node Frame Accent */}
                      {isFront && (
                        <div className="absolute inset-0 border-2 border-cyan-400/80 rounded-none pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(50,197,232,0.3)] animate-pulse" />
                      )}

                      {/* Card Overlay Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white z-10">
                        <span className="text-[10px] font-brand uppercase tracking-widest text-cyan-300 font-semibold mb-1">
                          {item.category} &bull; {item.date}
                        </span>
                        <h4 className="font-brand text-base sm:text-lg font-bold truncate">
                          {item.title}
                        </h4>
                        {isFront && (
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-cyan-400 font-semibold">
                            <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Central Ambient Radial Glow */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-400/10 blur-[90px] pointer-events-none z-0" />
        </div>

        {/* ── 3. WHEEL CONTROLS & PAGINATION ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-border/40">
          
          {/* Active Status Badge */}
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-primary animate-spin-slow" />
            <span className="font-mono text-xs text-slate-600 font-semibold">
              IMAGE {activeIdx + 1} OF {imageCount} &bull; <span className="text-primary">{galleryItems[activeIdx]?.title}</span>
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={rotateToPrev}
              className="w-11 h-11 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-primary transition-all shadow-sm cursor-pointer"
              aria-label="Rotate Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {galleryItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => rotateToIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIdx ? 'bg-primary w-6' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Rotate to image ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={rotateToNext}
              className="w-11 h-11 rounded-none bg-white border border-border/80 flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-primary transition-all shadow-sm cursor-pointer"
              aria-label="Rotate Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Explore All Modal Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            EXPLORE COMPLETE GALLERY ARCHIVE
          </PcbLightButton>
        </motion.div>

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
                  <h3 className="font-brand text-xl text-heading font-bold">ExESS COMMUNITY GALLERY</h3>
                  <p className="text-xs font-inter text-gray-500">Complete photo archive of hardware events and workshops</p>
                </div>
                <button onClick={() => setShowAllModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item, idx) => (
                  <div key={item.id} onClick={() => { setShowAllModal(false); rotateToIndex(idx); setSelectedImage(item) }} className="rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50 p-3">
                    <ImagePlaceholder src={item.image} alt={item.title} type="cover" aspectRatio="aspect-[16/10]" className="rounded-xl mb-3" />
                    <h4 className="font-brand text-sm font-bold text-heading truncate">{item.title}</h4>
                    <span className="text-[10px] font-inter text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual FLIP Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (() => {
          const origin = flipOriginRef.current
          const initX = origin ? (origin.left + origin.width / 2) - (window.innerWidth / 2) : 0
          const initY = origin ? (origin.top + origin.height / 2) - (window.innerHeight / 2) : 0
          const initSx = origin ? origin.width / Math.min(window.innerWidth * 0.9, 768) : 0.95
          const initSy = origin ? origin.height / (window.innerHeight * 0.75) : 0.95
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/70 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ x: initX, y: initY, scaleX: initSx, scaleY: initSy, opacity: 0.7 }}
                animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-[#071826] rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20 text-white my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
              >
                <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                  <button onClick={() => setSelectedImage(null)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="-mt-6">
                  <ImagePlaceholder src={selectedImage.image} alt={selectedImage.title} type="cover" aspectRatio="aspect-[16/10]" className="mb-6 rounded-2xl" />
                  <span className="text-[10px] font-brand uppercase tracking-wider text-cyan-400 font-semibold block mb-2">{selectedImage.category} &bull; {selectedImage.date}</span>
                  <h3 className="text-xl sm:text-2xl font-brand text-white font-bold mb-3">{selectedImage.title}</h3>
                  <p className="font-inter text-sm text-slate-300 leading-relaxed mb-4">{selectedImage.caption || selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
