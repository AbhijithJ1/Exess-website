import { useEffect, useRef, useState } from 'react'
import EnergyBus from '../lib/EnergyBus'

/**
 * useSectionActivation — Two-phase section entry hook.
 *
 * Phase 1 (approach): fires when ~5% of section visible ? emits section:approach
 *   GlobalCircuitNetwork begins converging traces toward section top edge.
 *
 * Phase 2 (activate): fires when ~15% of section visible ? emits section:activate
 *   GlobalCircuitNetwork triggers the energy bloom burst.
 *   Section content animation begins 250ms later (bloom peak timing).
 *
 * Both phases fire ONCE only (no repeat on scroll-back).
 *
 * Returns { ref, isApproaching, isActivated }
 */
export function useSectionActivation(sectionId) {
  const ref = useRef(null)
  const [isApproaching, setIsApproaching] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const hasApproached = useRef(false)
  const hasActivated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getTargetY = () => {
      const rect = el.getBoundingClientRect()
      return rect.top + window.scrollY
    }

    // Phase 1: Approach — section top just entering viewport
    const approachObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasApproached.current) {
          hasApproached.current = true
          setIsApproaching(true)
          EnergyBus.emit('section:approach', {
            sectionId,
            targetY: getTargetY(),
          })
        }
      },
      { threshold: 0.05 }
    )

    // Phase 2: Activate — section meaningfully visible
    const activateObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasActivated.current) {
          hasActivated.current = true
          setIsActivated(true)
          EnergyBus.emit('section:activate', {
            sectionId,
            targetY: getTargetY(),
          })
        }
      },
      { threshold: 0.15 }
    )

    approachObs.observe(el)
    activateObs.observe(el)

    return () => {
      approachObs.disconnect()
      activateObs.disconnect()
    }
  }, [sectionId])

  return { ref, isApproaching, isActivated }
}
