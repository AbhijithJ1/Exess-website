import { useScrollProgress } from '../hooks/useScrollAnimation'

const ScrollProgress = () => {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export default ScrollProgress
