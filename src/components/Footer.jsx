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
 * Footer — Premium Tech Editorial Architecture
 * - Top Bar: "CONNECT WITH ExESS" indicator (Left) + Direct Nav Links (Right)
 * - Middle Climax: Tagline & ExESS ↗ CTA (Left) + Sleek Social Media Dock (Right)
 * - Bottom Bar: Copyright (Left) + Legal Links (Right)
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading overflow-hidden z-10 border-t border-border/60 mt-8 sm:mt-12" style={{ padding: '36px 24px' }}>

      <div className="max-w-7xl mx-auto relative z-20">

        {/* ── Top Bar: Tag indicator (Left) & Direct Navigation Links (Right) ───── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-brand text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary">
              CONNECT WITH ExESS
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2 font-inter text-xs sm:text-sm font-medium">
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

        {/* ── Middle Climax: Brand Statement (Left) + Sleek Social Dock (Right) ── */}
        <div className="pt-8 border-t border-border/60 mb-8 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          
          {/* Left: Tagline & ExESS Wordmark CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="font-brand text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
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

          {/* Right: Sleek Premium Social Media Hardware Dock */}
          <div className="flex items-center gap-3 sm:gap-4 pb-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center transition-all duration-300 hover:bg-white hover:border-primary/40 hover:shadow-md hover:-translate-y-1 group cursor-pointer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

        {/* ── Bottom Bar: Copyright (Left) & Legal Links (Right) ────────────── */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ExESS — Electronics Students Society CEC. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
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
    </footer>
  )
}

export default Footer
