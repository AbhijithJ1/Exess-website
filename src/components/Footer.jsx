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
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Sponsorship', href: '#contact' },
  ],
}

/**
 * FooterEngineeringBackground — Clean Engineering-Inspired Background
 * Animated PCB traces, thin blueprint line art, soft electrical signal pulses.
 * Replaces oversized glowing background typography.
 */
const FooterEngineeringBackground = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none"
    viewBox="0 0 1440 400"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Thin blueprint line art */}
    <g stroke="rgba(30,107,147,0.08)" strokeWidth="1" fill="none">
      <path d="M0 80 H400 V160 H800 V240 H1440" strokeDasharray="6 6" />
      <path d="M0 320 H300 V220 H900 V120 H1440" strokeDasharray="6 6" />
      <path d="M400 0 V400" strokeDasharray="4 4" opacity="0.5" />
      <path d="M1040 0 V400" strokeDasharray="4 4" opacity="0.5" />
    </g>

    {/* Soft animated electrical signal pulses */}
    <g fill="#32C5E8" opacity="0.6">
      <circle r="2.5">
        <animateMotion dur="6s" repeatCount="indefinite" path="M0 80 H400 V160 H800 V240 H1440" />
      </circle>
      <circle r="2.5">
        <animateMotion dur="8s" repeatCount="indefinite" path="M1440 120 H900 V220 H300 V320 H0" />
      </circle>
    </g>

    {/* Via pads at intersections */}
    <g fill="rgba(30,107,147,0.18)">
      <circle cx="400" cy="80" r="3" />
      <circle cx="800" cy="160" r="3" />
      <circle cx="300" cy="220" r="3" />
      <circle cx="900" cy="120" r="3" />
    </g>
  </svg>
)

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

      {/* Clean Engineering Background Graphics */}
      <FooterEngineeringBackground />

      <div className="section-padding pt-16 sm:pt-20 pb-8 sm:pb-10 relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 mb-14 sm:mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Logo size={40} color="#1E6B93" />
              <div>
                <span className="text-lg font-brand tracking-tight text-heading">
                  Ex<span className="text-primary">ESS</span>
                </span>
                <span className="block text-[9px] font-brand text-body/60 uppercase tracking-[0.20em] mt-0.5">
                  Electronics Students Society
                </span>
              </div>
            </div>
            <p className="font-inter text-body leading-relaxed mb-6 sm:mb-8 max-w-sm text-sm sm:text-base">
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
                  className="w-10 h-10 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white text-body transition-all duration-300 border border-border shadow-sm hover:border-primary/50"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-brand mb-5 sm:mb-6 text-heading text-xs uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-inter text-body hover:text-primary transition-colors text-sm flex items-center gap-1 group"
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

        <div className="bg-card rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16 border border-border/80 shadow-sm backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-brand mb-1.5 text-heading">Stay Updated</h3>
              <p className="font-inter text-body text-sm">Get notified about upcoming events, workshops, and opportunities.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 sm:px-5 py-3 rounded-xl bg-background border border-border text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-64 text-sm font-inter"
              />
              <button className="px-5 sm:px-6 py-3 bg-primary text-white font-brand text-xs uppercase tracking-wider rounded-xl hover:bg-secondary transition-colors duration-300 w-full sm:w-auto flex-shrink-0 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="font-inter text-body/70 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} ExESS &mdash; College of Engineering Chengannur. All rights reserved.
          </p>
          <div className="flex gap-5 sm:gap-6 text-xs sm:text-sm font-inter text-body/70">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
