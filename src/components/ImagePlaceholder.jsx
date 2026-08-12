import { useState } from 'react'
import { Camera, Cpu, Layers, Sparkles } from 'lucide-react'

/**
 * ImagePlaceholder Component
 *
 * Provides a production-ready, zero-layout-shift image wrapper that:
 * 1. Renders actual <img> with lazy loading if `src` URL is provided.
 * 2. Renders a handcrafted, neutral engineering PCB blueprint skeleton
 *    placeholder if `src` is null/empty.
 *
 * Types supported: 'cover' (Events/Projects), 'avatar' (Team), 'circle' (Alumni), 'gallery' (Gallery)
 */
const ImagePlaceholder = ({
  src = null,
  alt = 'ExESS Media',
  aspectRatio = 'aspect-video',
  type = 'cover',
  badge = null,
  initials = '',
  className = '',
  overlayContent = null,
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const showRealImage = src && !error

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden group select-none bg-[#071826]/90 border border-white/[0.08] rounded-none ${className}`}
    >
      {/* ── REAL IMAGE RENDERING (when src provided) ───────────────────────── */}
      {showRealImage && (
        <>
          {!loaded && (
            <div className="absolute inset-0 bg-[#0B2135] animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-accent animate-spin" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      {/* ── NEUTRAL ENGINEERING SKELETON PLACEHOLDER (when src is null) ────── */}
      {!showRealImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#071826] via-[#0B2135] to-[#05121D] transition-colors duration-500 group-hover:from-[#091F32] group-hover:to-[#081B2B]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="pcbMiniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(50, 197, 232, 0.25)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pcbMiniGrid)" />
            
            <path
              d="M0 40 H 40 V 80 H 120 M 100% 120 H calc(100% - 60) V 160"
              stroke="#32C5E8"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />
            <circle cx="40" cy="40" r="3" fill="#32C5E8" />
            <circle cx="40" cy="80" r="3" fill="#1E6B93" />
          </svg>

          {type === 'avatar' || type === 'circle' ? (
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-white font-grotesk font-bold text-lg sm:text-xl shadow-soft group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                {initials || <Cpu className="w-6 h-6 text-accent" />}
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-2.5 group-hover:border-accent/40 group-hover:bg-primary/20 transition-all duration-400 shadow-soft">
                {type === 'gallery' ? (
                  <Camera className="w-5 h-5 text-accent" />
                ) : (
                  <Layers className="w-5 h-5 text-accent" />
                )}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.04] transition-colors duration-500 pointer-events-none" />
        </div>
      )}

      {overlayContent && <div className="absolute inset-0 z-20 pointer-events-none">{overlayContent}</div>}
    </div>
  )
}

export default ImagePlaceholder
