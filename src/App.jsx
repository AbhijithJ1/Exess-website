import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroAnimation from './components/IntroAnimation'
import GlobalCircuitNetwork from './components/GlobalCircuitNetwork'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Events from './components/Events'
import Projects from './components/Projects'
import Resources from './components/Resources'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CircuitDivider from './components/CircuitDivider'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [showIntro])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <div className={`relative transition-opacity duration-700 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <GlobalCircuitNetwork />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Hero />

          {/* Circuit trace flows from Hero → About */}
          <CircuitDivider variant="default" className="section-padding" />

          <About />

          {/* Trace between About → Team */}
          <CircuitDivider variant="left" className="section-padding" />

          <Team />

          {/* Trace between Team → Events */}
          <CircuitDivider variant="right" className="section-padding" />

          <Events />

          {/* Trace between Events → Projects */}
          <CircuitDivider variant="center" className="section-padding" />

          <Projects />

          {/* Trace between Projects → Resources */}
          <CircuitDivider variant="default" className="section-padding" />

          <Resources />

          {/* Trace between Resources → Gallery */}
          <CircuitDivider variant="left" className="section-padding" />

          <Gallery />

          {/* Trace between Gallery → Testimonials */}
          <CircuitDivider variant="right" className="section-padding" />

          <Testimonials />

          {/* Trace between Testimonials → Contact */}
          <CircuitDivider variant="center" className="section-padding" />

          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
