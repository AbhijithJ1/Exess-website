import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { galleryItems } from '../data/galleryData'

// Duplicate gallery list for continuous seamless infinite looping
const galleryMarqueeList = [...galleryItems, ...galleryItems]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)

  // Lock body scroll and add ESC key listener when image detail modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
        setShowAllModal(false)
      }
    }
    if (selectedImage || showAllModal) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage, showAllModal])

  return (
    <section id="gallery" className="relative section-gap overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        {/* ── 1. Unified Section Header Rhythm ─────────────────────────── */}
        <PowerOnHeader
          badge="VISUAL SHOWCASE"
          headline={<>Life at <span className="text-light-sweep-dark">ExESS</span></>}
          description="A glimpse into our fests, workshops, lab sessions, and community events."
          align="left"
        />

        {/* ── 2. Premier Infinite Horizontal Image Carousel ───────────── */}
        <div className="relative w-full overflow-hidden my-6 py-4 group">
          <div className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {galleryMarqueeList.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="w-72 sm:w-96 h-48 sm:h-60 flex-shrink-0 relative rounded-3xl overflow-hidden cursor-pointer border border-border/60 shadow-soft hover:shadow-soft-lg transition-all duration-300 group/card"
              >
                <ImagePlaceholder
                  src={item.image}
                  alt={item.title}
                  type="gallery"
                  aspectRatio="w-full h-full"
                  badge={item.category}
                  overlayContent={
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover/card:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-brand uppercase tracking-wider text-accent block font-semibold">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold font-brand text-white mt-0.5">
                            {item.title}
                          </h4>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Standalone Centered CTA ──────────────────────────────── */}
        <div className="flex justify-center mt-10">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL MOMENTS
          </PcbLightButton>
        </div>
      </div>

      {/* Full Moments Gallery Showcase Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ExESS MOMENTS &amp; GALLERY</h3>
                  <p className="text-xs font-inter text-gray-500">Complete visual archive of student activities and fests</p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowAllModal(false)
                      setSelectedImage(item)
                    }}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all"
                  >
                    <ImagePlaceholder
                      src={item.image}
                      alt={item.title}
                      type="gallery"
                      aspectRatio="aspect-[16/10]"
                      badge={item.category}
                    />
                    <div className="p-3 bg-white">
                      <span className="text-[9px] font-brand uppercase text-primary block font-semibold">{item.category}</span>
                      <h4 className="font-brand text-xs text-heading font-bold">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#071826] rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20 text-white my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="-mt-6">
                <ImagePlaceholder
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  type="gallery"
                  aspectRatio="aspect-[16/10]"
                  className="mb-5"
                  badge={selectedImage.category}
                />

                <div>
                  <span className="text-[10px] font-brand text-accent uppercase tracking-widest font-semibold">
                    {selectedImage.category} &bull; {selectedImage.date}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-brand text-white mt-1 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-300 leading-relaxed">
                    {selectedImage.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
