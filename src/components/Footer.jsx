import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa6'
import Logo from './Logo'

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
 * Footer — Premium Electronics Studio Mobile/Desktop Refinement
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading overflow-hidden z-10 border-t border-border/60 mt-8 sm:mt-12 px-4 sm:px-6 md:px-8 py-8 sm:py-10">

      <div className="max-w-7xl mx-auto relative z-20">

        {/* ── SECTION 1 — BRAND LOGO + NAVIGATION ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 group py-1">
            <Logo size={32} color="#1E6B93" />
            <span className="font-brand text-xl sm:text-2xl font-bold tracking-tight text-heading group-hover:text-primary transition-colors">
              Ex<span className="text-primary">ESS</span>
            </span>
          </a>

          {/* Navigation Links */}
          <ul className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-end gap-x-8 sm:gap-x-8 gap-y-3 font-inter text-sm sm:text-sm font-medium w-full sm:w-auto">
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

        {/* ── SECTION 2 — DIVIDER ────────────────────────────────────────────── */}
        <div className="my-6 sm:my-8 border-t border-border/60" />

        {/* ── SECTION 3 & 4 — BRAND CLOSING STATEMENT + DEDICATED SOCIAL ROW ──── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8">
          
          {/* Tagline & Animated ExESS Wordmark CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="font-brand text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
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
                style={{ fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
              >
                Ex<span className="text-primary">ESS</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="text-heading group-hover:text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 flex-shrink-0"
              >
                <ArrowUpRight className="w-9 h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 stroke-[2]" />
              </motion.div>
            </a>
          </div>

          {/* Dedicated Social Links Row */}
          <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-0 w-full sm:w-auto justify-start sm:justify-end">
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

        {/* ── SECTION 5 — FINAL DIVIDER ──────────────────────────────────────── */}
        <div className="my-6 sm:my-8 border-t border-border/60" />

        {/* ── SECTION 6 — LEGAL & COPYRIGHT ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Legal Links */}
          <div className="flex items-center gap-6 order-1 sm:order-2">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright Notice */}
          <p className="font-inter text-xs text-gray-500 order-2 sm:order-1 leading-relaxed">
            &copy; {new Date().getFullYear()} ExESS — Electronics Students Society CEC. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer
