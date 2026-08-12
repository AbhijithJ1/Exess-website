import { motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Linkedin, Github, Mail } from 'lucide-react'
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
  { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/exess.cec', label: 'Instagram' },
  { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/company/exess-cec', label: 'LinkedIn' },
  { icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
  { icon: <Mail className="w-4 h-4" />, href: 'mailto:exess@ceconline.edu', label: 'Email' },
]

/**
 * Footer — Clean White ExESS Architecture
 *
 * White background (#ffffff)
 * Removed Headquarters / Address section (already in Contact Us)
 * Removed "Navigation" header label
 * Tagline: "SHAPING THE FUTURE OF ELECTRONICS & HARDWARE"
 * Massive EXESS headline with primary cyan-blue hover & ArrowUpRight CTA
 */
const Footer = () => {
  return (
    <footer className="relative bg-white text-heading pt-20 pb-12 overflow-hidden z-10 border-t border-border/60 mt-16">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">

        {/* ── Top Section: Logo & Socials + Direct Navigation Links ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 mb-16 items-start">

          {/* Left Column — Brand & Description */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 mb-6 bg-slate-50 rounded-2xl border border-border/60 p-2 flex items-center justify-center">
                <Logo />
              </div>
              <p className="font-inter text-body text-sm sm:text-base leading-relaxed max-w-md mb-6">
                ExESS (Electronics Students Society) is the flagship departmental body powering hardware, embedded systems, and robotics at College of Engineering Chengannur.
              </p>
            </div>

            {/* Social Icons Buttons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 border border-border/60 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all group"
                  aria-label={social.label}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Direct Navigation Links (Without "Navigation" Heading) */}
          <div className="md:col-span-6 md:flex md:justify-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-inter text-sm font-medium">
              {essentialNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body hover:text-primary transition-colors relative group inline-block py-1"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── MASSIVE BRAND HEADLINE "EXESS" & BIG ARROW CTA ───────────────── */}
        <div className="pt-12 border-t border-border/60 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-brand text-xs font-bold uppercase tracking-[0.24em] text-primary">
              SHAPING THE FUTURE OF ELECTRONICS &amp; HARDWARE
            </span>
          </motion.div>

          <a
            href="#contact"
            className="group flex items-end justify-between gap-6 cursor-pointer"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="font-brand text-6xl sm:text-8xl lg:text-[10rem] font-extrabold tracking-tight text-heading group-hover:text-primary transition-colors duration-300 leading-none"
            >
              ExESS
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="mb-2 sm:mb-4 text-heading group-hover:text-primary group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-300 flex-shrink-0"
            >
              <ArrowUpRight className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 stroke-[1.5]" />
            </motion.div>
          </a>
        </div>

        {/* ── FOOTER BOTTOM ────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-inter text-xs text-gray-400 order-2 md:order-1">
            &copy; {new Date().getFullYear()} ExESS — Electronics Students Society CEC. All rights reserved.
          </p>

          <div className="flex gap-6 order-1 md:order-2">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-xs text-gray-400 hover:text-primary transition-colors"
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
