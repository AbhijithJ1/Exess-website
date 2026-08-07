import { useState, useRef } from 'react'
import { Github, Instagram, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  Society: [
    { name: 'About Us', href: '#circuits' },
    { name: 'Our Team', href: '#team' },
    { name: 'Events', href: '#events' },
    { name: 'Projects', href: '#projects' },
  ],
  Resources: [
    { name: 'Study Materials', href: '#resources' },
    { name: 'Lab Manuals', href: '#resources' },
    { name: 'Video Lectures', href: '#resources' },
    { name: 'Gallery', href: '#gallery' },
  ],
  Connect: [
    { name: 'Join ExESS', href: '#contact' },
    { name: 'Alumni Network', href: '#alumni' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Sponsorship', href: '#contact' },
  ],
}

/**
 * CursorFollowingTypography — Handcrafted Cursor-Tracking Light Reflection
 *
 * Base layer: Normal subtle typography color (rgba(30,107,147,0.05)).
 * Top layer: Bright primary blue text overlaid with a dynamic radial-gradient mask
 * positioned strictly at (mouse.x, mouse.y). Soft highlight smoothly tracks mouse
 * position in real time like light reflecting across brushed metal.
 */
const CursorFollowingTypography = () => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isInside, setIsInside] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 flex items-center justify-center pointer-events-auto select-none overflow-hidden cursor-default"
    >
      {/* ── BASE SUBTLE TYPOGRAPHY ───────────────────────────────────────── */}
      <div
        className="font-grotesk font-black tracking-tighter whitespace-nowrap text-slate-200/50"
        style={{
          fontSize: 'clamp(8rem, 26vw, 25rem)',
          letterSpacing: '-0.06em',
          lineHeight: 1,
        }}
      >
        EXESS
      </div>

      {/* ── REAL-TIME CURSOR-TRACKING LIGHT REFLECTION LAYER ───────────── */}
      <div
        className="font-grotesk font-black tracking-tighter whitespace-nowrap text-primary absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 26vw, 25rem)',
          letterSpacing: '-0.06em',
          lineHeight: 1,
          opacity: isInside ? 1 : 0,
          WebkitMaskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)`,
          maskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)`,
        }}
      >
        EXESS
      </div>
    </div>
  )
}

const Footer = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background border-t border-border/80 text-heading overflow-hidden z-10">
      {/* Accent top border hairline gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── VERY LARGE BACKGROUND EXESS TYPOGRAPHY — Cursor-Following Light Reflection ── */}
      <CursorFollowingTypography />

      <div className="section-padding pt-16 sm:pt-20 pb-8 sm:pb-10 relative z-10 pointer-events-none">
        <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 mb-14 sm:mb-16 pointer-events-auto">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Logo size={44} color="#1E6B93" />
              <div>
                <span className="text-xl font-bold font-grotesk tracking-tight text-heading">Ex<span className="text-primary">ESS</span></span>
                <span className="block text-[10px] text-body/60 uppercase tracking-[0.2em] -mt-0.5">
                  Electronics Students Society
                </span>
              </div>
            </div>
            <p className="text-body leading-relaxed mb-6 sm:mb-8 max-w-sm text-sm sm:text-base">
              Empowering future electronics engineers through hands-on learning,
              collaborative projects, and industry exposure at College of Engineering Chengannur.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white text-body transition-all duration-300 border border-border shadow-sm hover:border-primary/50 pointer-events-auto"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="pointer-events-auto">
              <h4 className="font-semibold font-grotesk mb-5 sm:mb-6 text-heading text-sm tracking-wide">{category}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-body hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16 border border-border/80 shadow-sm backdrop-blur-md pointer-events-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-grotesk mb-1.5 text-heading">Stay Updated</h3>
              <p className="text-body text-sm">Get notified about upcoming events, workshops, and opportunities.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 sm:px-5 py-3 rounded-xl bg-background border border-border text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-64 text-sm"
              />
              <button className="px-5 sm:px-6 py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-secondary transition-colors duration-300 w-full sm:w-auto flex-shrink-0 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pointer-events-auto">
          <p className="text-body/70 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} ExESS &mdash; College of Engineering Chengannur. All rights reserved.
          </p>
          <div className="flex gap-5 sm:gap-6 text-xs sm:text-sm text-body/70">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
