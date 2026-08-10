import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import Logo from './Logo'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const essentialNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#circuits' },
  { name: 'Team', href: '#team' },
  { name: 'Events', href: '#events' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

/**
 * FooterEngineeringBackground — Low-contrast PCB background trace with subtle animated signal
 */
const FooterEngineeringBackground = ({ isVisible }) => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-25 z-0"
    viewBox="0 0 1440 240"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 40 H400 V120 H900 V180 H1440"
      stroke="rgba(30, 107, 147, 0.12)"
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="400" cy="40" r="2.5" fill="rgba(30,107,147,0.25)" />
    <circle cx="900" cy="120" r="2.5" fill="#32C5E8" />

    {isVisible && (
      <circle r="3.5" fill="#32C5E8">
        <animateMotion dur="2.2s" fill="freeze" path="M0 40 H400 V120 H900" />
      </circle>
    )}
  </svg>
)

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative bg-white border-t border-border/80 text-heading overflow-hidden z-10">
      {/* Hairline accent gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <FooterEngineeringBackground isVisible={isVisible} />

      <div className="section-padding max-w-7xl mx-auto pt-8 sm:pt-10 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/60">
          {/* LEFT: Logo & Subtitle */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <Logo size={32} color="#1E6B93" />
            <div>
              <span className="text-base font-brand tracking-tight text-heading font-bold">
                Ex<span className="text-primary">ESS</span>
              </span>
              <span className="block text-[9px] font-brand text-gray-500 uppercase tracking-[0.18em] font-semibold">
                Official Electronics Students Society &bull; CEC
              </span>
            </div>
          </div>

          {/* CENTER: Essential Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            {essentialNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-brand text-[10.5px] uppercase tracking-wider text-gray-600 hover:text-primary transition-colors font-semibold"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT: Social Links */}
          <div className="flex items-center gap-2">
            {[
              { icon: Linkedin, href: 'https://linkedin.com' },
              { icon: Github, href: 'https://github.com' },
              { icon: Instagram, href: 'https://instagram.com' },
              { icon: Mail, href: 'mailto:exess@cec.ac.in' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors"
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM: Copyright & PRODDEC CEC Credit */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-inter text-gray-500">
          <p className="text-center sm:text-left text-[11px]">
            &copy; {new Date().getFullYear()} ExESS &mdash; College of Engineering Chengannur. All rights reserved.
          </p>

          <p className="inline-flex items-center justify-center text-[11px]">
            Crafted with{' '}
            <span className="inline-block text-primary mx-1">
              ❤️
            </span>{' '}
            by{' '}
            <a
              href="https://www.proddec.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-brand font-semibold text-primary ml-1 hover:text-secondary hover:underline transition-all duration-300 tracking-wider"
            >
              PRODDEC CEC
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
