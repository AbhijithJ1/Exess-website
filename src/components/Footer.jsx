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
  { icon: <FaInstagram className="w-5 h-5 text-[#E4405F]" />, href: 'https://instagram.com/exess.cec', label: 'Instagram' },
  { icon: <FaLinkedinIn className="w-5 h-5 text-[#0A66C2]" />, href: 'https://linkedin.com/company/exess-cec', label: 'LinkedIn' },
  { icon: <FaGithub className="w-5 h-5 text-[#181717]" />, href: '#', label: 'GitHub' },
  { icon: <FaEnvelope className="w-5 h-5 text-[#EA4335]" />, href: 'mailto:exess@ceconline.edu', label: 'Email' },
]

/**
 * Footer — Refined Flexbox Architecture
 * - Padding of '32px 24px' for ample breathing room
 * - Direct navigation links top
 * - Closing statement & animated ExESS wordmark as visual climax
 * - Copyright on the left side, Social Icons & Legal Links grouped on the right side with 20px gap
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading overflow-hidden z-10 border-t border-border/60 mt-8 sm:mt-12" style={{ padding: '32px 24px' }}>

      <div className="max-w-7xl mx-auto relative z-20">

        {/* ── Top Section: Direct Navigation Links along clean baseline ───── */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <ul className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 font-inter text-xs sm:text-sm font-medium">
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

        {/* ── CLOSING BRAND STATEMENT "SHAPING THE FUTURE..." & EXESS → ──────── */}
        <div className="pt-8 border-t border-border/60 mb-8">
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

        {/* ── FOOTER BOTTOM: FLEXBOX (Left: Copyright | Right: Social Icons + Legal Links) ── */}
        <div className="pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6" style={{ gap: '20px' }}>
          
          {/* Left Side — Copyright Notice */}
          <p className="font-inter text-xs text-gray-500 order-2 md:order-1 text-center md:text-left">
            &copy; {new Date().getFullYear()} ExESS — Electronics Students Society CEC. All rights reserved.
          </p>

          {/* Right Side — Grouped Social Media Icons & Legal Links with 20px gap */}
          <div className="flex items-center order-1 md:order-2 flex-wrap justify-center md:justify-end" style={{ gap: '20px' }}>
            
            {/* Social Icons */}
            <div className="flex items-center" style={{ gap: '16px' }}>
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

            {/* Vertical Divider */}
            <span className="hidden sm:inline-block w-px h-4 bg-border/80" />

            {/* Legal Links */}
            <div className="flex items-center" style={{ gap: '16px' }}>
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-inter text-xs text-gray-500 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
