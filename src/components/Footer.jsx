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
  { icon: <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7" />, href: 'https://instagram.com/exess.cec', label: 'Instagram' },
  { icon: <FaLinkedinIn className="w-6 h-6 sm:w-7 sm:h-7" />, href: 'https://linkedin.com/company/exess-cec', label: 'LinkedIn' },
  { icon: <FaGithub className="w-6 h-6 sm:w-7 sm:h-7" />, href: '#', label: 'GitHub' },
  { icon: <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />, href: 'mailto:exess@ceconline.edu', label: 'Email' },
]

/**
 * Footer — Clean White ExESS Architecture
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading pt-12 pb-8 overflow-hidden z-10 border-t border-border/60 mt-10">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">

        {/* ── Top Section: Logo & Socials + Direct Navigation Links ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-10 items-start">

          {/* Left Column — Brand & Description */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-slate-50 rounded-xl border border-border/60 p-1.5 flex items-center justify-center">
                  <Logo />
                </div>
                <span className="font-brand font-bold text-lg text-heading tracking-tight">ExESS</span>
              </div>
              <p className="font-inter text-body text-xs sm:text-sm leading-relaxed max-w-lg mb-5 text-gray-500">
                Electronics Students Society (ExESS) is the official departmental body powering hardware, embedded systems, and robotics innovation at College of Engineering Chengannur.
              </p>
            </div>

            {/* Social Icons — Clean bare FaIcons without container boxes */}
            <div className="flex items-center gap-5 sm:gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-all duration-300 transform hover:scale-110 p-0.5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Direct Navigation Links */}
          <div className="md:col-span-5 md:flex md:justify-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 font-inter text-xs sm:text-sm font-medium">
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

        {/* ── COMPACT BRAND HEADLINE "ExESS" & CTA ─────────────────────────── */}
        <div className="pt-8 border-t border-border/60 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
              className="font-brand font-extrabold tracking-tight text-heading group-hover:text-primary transition-colors duration-300 leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              ExESS
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

        {/* ── FOOTER BOTTOM ────────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px] text-gray-400 order-2 sm:order-1">
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
