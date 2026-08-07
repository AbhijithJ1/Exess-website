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
 * FooterEngineeringBackground — Clean Minimal Background
 * Features subtle via pads and soft electrical signal pulses.
 * Removed decorative dashed PCB connector lines for a clean aesthetic.
 */
const FooterEngineeringBackground = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-40"
    viewBox="0 0 1440 320"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Soft animated electrical signal pulses */}
    <g fill="#32C5E8" opacity="0.5">
      <circle r="2">
        <animateMotion dur="7s" repeatCount="indefinite" path="M0 60 H400 V120 H800 V180 H1440" />
      </circle>
    </g>

    {/* Via pads at intersections */}
    <g fill="rgba(30,107,147,0.15)">
      <circle cx="400" cy="60" r="2.5" />
      <circle cx="800" cy="120" r="2.5" />
      <circle cx="1040" cy="180" r="2.5" />
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

      {/* Clean Minimal Engineering Background */}
      <FooterEngineeringBackground />

      <div className="section-padding pt-10 sm:pt-14 pb-6 sm:pb-8 relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={36} color="#1E6B93" />
              <div>
                <span className="text-base font-brand tracking-tight text-heading">
                  Ex<span className="text-primary">ESS</span>
                </span>
                <span className="block text-[8.5px] font-brand text-body/60 uppercase tracking-[0.20em] mt-0.5">
                  Electronics Students Society
                </span>
              </div>
            </div>
            <p className="font-inter text-body text-xs sm:text-sm leading-relaxed mb-5 max-w-sm">
              Empowering future electronics engineers through hands-on learning,
              collaborative projects, and industry exposure at College of Engineering Chengannur.
            </p>
            <div className="flex gap-2">
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
                  className="w-8 h-8 rounded-lg bg-card flex items-center justify-center hover:bg-primary hover:text-white text-body transition-all duration-300 border border-border/80 shadow-sm"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-brand mb-4 text-heading text-[11px] uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-inter text-body hover:text-primary transition-colors text-xs flex items-center gap-1 group"
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

        {/* Compact Newsletter Row */}
        <div className="py-4 px-6 sm:px-8 mb-8 border-y border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-brand text-heading">Stay Updated</h3>
            <p className="font-inter text-body text-xs">Get notified about upcoming events, workshops, and opportunities.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3.5 py-2 rounded-xl bg-background border border-border text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-60 text-xs font-inter"
            />
            <button className="px-4 py-2 bg-primary text-white font-brand text-[10px] uppercase tracking-wider rounded-xl hover:bg-secondary transition-colors duration-300 w-full sm:w-auto flex-shrink-0 shadow-sm">
              Subscribe
            </button>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-inter text-body/70 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} ExESS &mdash; College of Engineering Chengannur. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-inter text-body/70">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

        {/* Proddec CEC Footer Credit */}
        <div className="mt-4 pt-3 border-t border-border/40 text-center">
          <p className="font-inter text-xs text-body/70 group inline-flex items-center justify-center cursor-default">
            Crafted with{' '}
            <span className="inline-block text-primary mx-1 transition-transform duration-300 group-hover:scale-125 group-hover:text-accent">
              ❤️
            </span>{' '}
            by{' '}
            <span className="font-medium text-heading ml-1 hover:text-primary transition-colors duration-300">
              Proddec CEC
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
