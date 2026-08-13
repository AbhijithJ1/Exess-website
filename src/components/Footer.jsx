import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa6'

const essentialNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Projects', href: '#projects' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
]

const SOCIAL_LINKS = [
  { icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#E4405F]" />, href: 'https://instagram.com/exess.cec', label: 'Instagram' },
  { icon: <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A66C2]" />, href: 'https://linkedin.com/company/exess-cec', label: 'LinkedIn' },
  { icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-[#181717]" />, href: '#', label: 'GitHub' },
  { icon: <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-[#EA4335]" />, href: 'mailto:exess@ceconline.edu', label: 'Email' },
]

/**
 * Footer — Refined Compact Editorial Architecture
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-hidden z-10 border-t border-border/60 mt-6 sm:mt-10">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">

        {/* ── Top Section: Social Links & Compact Navigation ───────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 sm:mb-8">

          {/* Social Icons — Clean bare FaIcons with original brand colors */}
          <div className="flex items-center gap-5 sm:gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110 p-0.5"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Navigation Links — Compact layout for mobile and desktop */}
          <div>
            <ul className="flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-2 font-inter text-xs sm:text-sm font-medium">
              {essentialNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body hover:text-primary transition-colors relative group inline-block py-0.5"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── CLOSING BRAND STATEMENT "SHAPING THE FUTURE..." & EXESS → ──────── */}
        <div className="pt-6 sm:pt-8 border-t border-border/60 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-brand text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary">
              SHAPING THE FUTURE OF ELECTRONICS &amp; HARDWARE
            </span>
          </motion.div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 sm:gap-6 cursor-pointer overflow-hidden py-1"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="font-brand font-extrabold tracking-tight text-heading duration-300 leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Ex<span className="text-primary">ESS</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="text-heading group-hover:text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 flex-shrink-0"
            >
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 stroke-[2]" />
            </motion.div>
          </a>
        </div>

        {/* ── FOOTER BOTTOM: LEGAL & COPYRIGHT ─────────────────────────────── */}
        <div className="pt-5 sm:pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="font-inter text-[11px] text-gray-400 order-2 sm:order-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ExESS — Electronics Students Society CEC. All rights reserved.
          </p>

          <div className="flex gap-5 order-1 sm:order-2">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-[11px] text-gray-400 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
