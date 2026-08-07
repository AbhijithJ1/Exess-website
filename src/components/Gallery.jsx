import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { galleryItems } from '../data/galleryData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
}

const Gallery = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" className="relative section-gap overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Visual Showcase"
          headline={<>Life at <span className="text-light-sweep-dark">ExESS</span></>}
          description="A glimpse into our fests, workshops, lab sessions, and community events."
        />

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] sm:auto-rows-[220px]"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedImage(item)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${
                i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              {/* Responsive Image Placeholder Frame */}
              <ImagePlaceholder
                src={item.image}
                alt={item.title}
                type="gallery"
                aspectRatio="w-full h-full"
                badge={item.category}
                overlayContent={
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-accent">
                          {item.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold font-grotesk text-white">
                          {item.title}
                        </h4>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#071826] rounded-3xl p-6 shadow-2xl border border-white/20 text-white overflow-hidden"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <ImagePlaceholder
                src={selectedImage.image}
                alt={selectedImage.title}
                type="gallery"
                aspectRatio="aspect-[16/10]"
                className="mb-5"
                badge={selectedImage.category}
              />

              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {selectedImage.category} &bull; {selectedImage.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-grotesk text-white mt-1 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
