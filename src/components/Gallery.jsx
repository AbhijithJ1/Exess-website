import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react'
import PcbLightButton from './PcbLightButton'
import { galleryItems } from '../data/galleryData'

/**
 * Gallery — Pure Photography 3D Editorial Wheel & Restrained Editorial Lightbox
 *
 * Cinematic Behavior & Art Direction:
 *   - Continuous, smooth, slow 3D auto-rotation when section is in viewport.
 *   - Seamless infinite loop (01 -> 02 -> ... -> 08 -> 01) with zero blank states or sudden stops.
 *   - Normal page scrolling completely untouched (no scroll-hijacking).
 *   - User drag/button interactions temporarily pause auto-rotation; resumes after 4s inactivity.
 *   - Pauses when out of viewport to conserve resources; resumes when visible.
 *   - Restrained, clean white editorial lightbox modal with natural photo scaling and 0 right-side overflow artifacts.
 */
const Gallery = () => {
  const [rotation, setRotation] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const containerRef = useRef(null)
  const ringRef = useRef(null)
  const dragStartRef = useRef({ x: 0, rotation: 0 })
  const velocityRef = useRef(0)
  const animFrameRef = useRef(null)
  const flipOriginRef = useRef(null)
  const userTimerRef = useRef(null)

  const imageCount = galleryItems.length
  const angleStep = 360 / imageCount

  // Responsive 3D ring radius (mobile: 320px, tablet: 420px, desktop: 540px)
  const [radius, setRadius] = useState(540)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setRadius(mobile ? 320 : window.innerWidth < 1024 ? 420 : 540)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Viewport Observer — pause animation when section is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // User Interaction Activity Register (pauses auto-rotation for 4s after interaction)
  const registerInteraction = useCallback(() => {
    setUserInteracted(true)
    if (userTimerRef.current) clearTimeout(userTimerRef.current)
    userTimerRef.current = setTimeout(() => {
      setUserInteracted(false)
    }, 4000)
  }, [])

  // Calculate active index normalized to 0..imageCount-1
  const rawActiveIdx = Math.round(-rotation / angleStep) % imageCount
  const activeIdx = (rawActiveIdx + imageCount) % imageCount
  const activeItem = galleryItems[activeIdx] || galleryItems[0]

  // Continuous Cinematic 3D Auto-Rotation + Frictional Drag Momentum Loop
  useEffect(() => {
    let active = true

    const loop = () => {
      if (active) {
        if (!isDragging && !selectedImage && !showAllModal && isInView) {
          if (!userInteracted && Math.abs(velocityRef.current) < 0.05) {
            // Calm, slow cinematic auto-rotation (-0.14 deg per frame)
            setRotation((prev) => (prev - 0.14) % 360)
          } else if (Math.abs(velocityRef.current) > 0.02) {
            // Momentum decay from drag velocity
            velocityRef.current *= 0.94
            setRotation((prev) => (prev + velocityRef.current) % 360)
          }
        }
        animFrameRef.current = requestAnimationFrame(loop)
      }
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      active = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isDragging, selectedImage, showAllModal, isInView, userInteracted])

  // Pointer Drag Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true)
    registerInteraction()
    velocityRef.current = 0
    dragStartRef.current = {
      x: e.clientX,
      rotation: rotation
    }
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    registerInteraction()
    const deltaX = e.clientX - dragStartRef.current.x
    const newRot = dragStartRef.current.rotation + deltaX * 0.3
    velocityRef.current = deltaX * 0.05
    setRotation(newRot)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    registerInteraction()
    e.target.releasePointerCapture?.(e.pointerId)
  }

  // Navigation Button Handlers
  const rotateToPrev = () => {
    registerInteraction()
    velocityRef.current = 0
    setRotation((prev) => Math.round(prev / angleStep) * angleStep + angleStep)
  }

  const rotateToNext = () => {
    registerInteraction()
    velocityRef.current = 0
    setRotation((prev) => Math.round(prev / angleStep) * angleStep - angleStep)
  }

  const rotateToIndex = (idx) => {
    registerInteraction()
    velocityRef.current = 0
    setRotation(-idx * angleStep)
  }

  return (
    <section id="gallery" ref={containerRef} className="relative section-gap overflow-hidden bg-white/60 py-16 sm:py-24">
      <div className="section-padding max-w-7xl mx-auto relative z-10">

        {/* ── 1. GALLERY HEADING — CLEAN & PURPOSEFUL ─────────────────────── */}
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
            <div className="relative w-full flex items-center justify-center sm:justify-start">
              <h2
                className="font-brand text-heading font-bold tracking-tight leading-[1.0] text-light-sweep-dark flex flex-wrap"
                style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)' }}
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
            transition={{ duration: 0.5, delay: 0.9 }}
            className="font-inter text-body text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto sm:mx-0"
          >
            Cinematic 3D gallery collection. Drag or click arrows to explore photos.
          </motion.p>
        </div>

        {/* ── 2. 3D DRAGGABLE IMAGE WHEEL (PURE PHOTOGRAPHY, NO TEXT ON IMAGES) ── */}
        <div className="relative my-6 sm:my-10 h-[280px] sm:h-[420px] lg:h-[500px] flex items-center justify-center select-none overflow-visible">

          {/* Perspective Outer Container */}
          <div
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
            style={{ perspective: isMobile ? '900px' : '1200px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 3D Ring Wrapper */}
            <div
              ref={ringRef}
              className="relative w-52 sm:w-72 lg:w-[360px] h-44 sm:h-60 lg:h-[260px] transition-transform duration-75 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
                willChange: 'transform'
              }}
            >
              {galleryItems.map((item, idx) => {
                const itemAngle = idx * angleStep
                const isFront = idx === activeIdx

                // Calculate angular distance for depth opacity
                let diffAngle = (itemAngle + rotation) % 360
                if (diffAngle > 180) diffAngle -= 360
                if (diffAngle < -180) diffAngle += 360
                const absDiff = Math.abs(diffAngle)

                const cardOpacity = isFront ? 1 : Math.max(0.25, 1 - absDiff / 130)

                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      registerInteraction()
                      if (isFront) {
                        flipOriginRef.current = e.currentTarget.getBoundingClientRect()
                        setSelectedImage(item)
                      } else {
                        rotateToIndex(idx)
                      }
                    }}
                    className={`absolute inset-0 rounded-none overflow-hidden transition-all duration-300 cursor-pointer ${
                      isFront
                        ? 'shadow-2xl z-30 scale-100'
                        : 'shadow-md scale-90'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                      opacity: cardOpacity,
                      backfaceVisibility: 'hidden',
                      border: isFront ? '1px solid rgba(30, 107, 147, 0.35)' : '1px solid rgba(148, 163, 184, 0.25)'
                    }}
                  >
                    {/* Pure Photograph (No text overlays on image) */}
                    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-none transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      {/* Hairline corner marks — active card only, extremely subtle */}
                      {isFront && (
                        <>
                          {/* Top-left */}
                          <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: '1.5px solid rgba(30,107,147,0.5)', borderLeft: '1.5px solid rgba(30,107,147,0.5)' }} />
                          {/* Top-right */}
                          <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: '1.5px solid rgba(30,107,147,0.5)', borderRight: '1.5px solid rgba(30,107,147,0.5)' }} />
                          {/* Bottom-left */}
                          <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: '1.5px solid rgba(30,107,147,0.5)', borderLeft: '1.5px solid rgba(30,107,147,0.5)' }} />
                          {/* Bottom-right */}
                          <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: '1.5px solid rgba(30,107,147,0.5)', borderRight: '1.5px solid rgba(30,107,147,0.5)' }} />
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 3. DEDICATED ACTIVE IMAGE CAPTION PANEL (CLEAN BELOW THE WHEEL) ───── */}
        <div className="max-w-2xl mx-auto text-center px-4 min-h-[120px] flex flex-col items-center justify-center my-6">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-[11px] font-brand uppercase tracking-[0.2em] text-primary font-bold mb-1">
              {activeItem.category} &bull; {activeItem.date}
            </span>
            <h3 className="font-brand text-lg sm:text-2xl font-bold text-heading">
              {activeItem.title}
            </h3>
            <p className="font-inter text-xs sm:text-sm text-gray-600 mt-1 max-w-lg leading-relaxed">
              {activeItem.caption}
            </p>
            <button
              onClick={(e) => {
                registerInteraction()
                const frontEl = ringRef.current?.children[activeIdx]
                if (frontEl) flipOriginRef.current = frontEl.getBoundingClientRect()
                setSelectedImage(activeItem)
              }}
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono text-primary font-bold hover:underline cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> CLICK PHOTO TO EXPAND
            </button>
          </motion.div>
        </div>

        {/* ── 4. WHEEL CONTROLS & PAGINATION ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-border/40">
          
          {/* Active Status Badge */}
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-primary animate-spin-slow" />
            <span className="font-mono text-xs text-slate-600 font-semibold">
              IMAGE {activeIdx + 1} OF {imageCount}
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

      {/* Complete Directory Modal */}
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
                    <img src={item.image} alt={item.title} className="w-full aspect-[16/10] object-cover rounded-xl mb-3" loading="lazy" />
                    <h4 className="font-brand text-sm font-bold text-heading truncate">{item.title}</h4>
                    <span className="text-[10px] font-inter text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Lightbox Modal (Clean White Surface, 0 Right-Side Artifacts, No Internal Scrollbar) */}
      <AnimatePresence>
        {selectedImage && (() => {
          const origin = flipOriginRef.current
          const initX = origin ? (origin.left + origin.width / 2) - (window.innerWidth / 2) : 0
          const initY = origin ? (origin.top + origin.height / 2) - (window.innerHeight / 2) : 0
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6 bg-slate-950/25 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ x: initX, y: initY, scale: 0.6, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-200/90 text-slate-900 my-auto overflow-hidden flex flex-col"
              >
                {/* Header with Category & Minimal Close Button */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-shrink-0">
                  <span className="text-xs font-brand uppercase tracking-wider text-primary font-bold">
                    {selectedImage.category} &bull; {selectedImage.date}
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Close image lightbox"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Photograph (Uncropped, Natural Aspect Ratio, No Overflow) */}
                <div className="relative w-full bg-slate-950/5 rounded-xl overflow-hidden mb-4 border border-slate-200/60 shadow-sm flex items-center justify-center flex-shrink-0">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full max-h-[60vh] object-contain rounded-xl"
                  />
                </div>

                {/* Caption Details */}
                <div className="flex-shrink-0">
                  <h3 className="text-xl sm:text-2xl font-brand font-bold text-slate-900 mb-1">
                    {selectedImage.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedImage.caption || selectedImage.description}
                  </p>
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
