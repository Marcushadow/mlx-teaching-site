import { useState, useEffect, useCallback, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SlideProps } from '../types'

interface SlideContainerProps {
  slides: ComponentType<SlideProps>[]
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

const transition = {
  type: 'tween' as const,
  ease: 'easeInOut',
  duration: 0.35,
}

export function SlideContainer({ slides }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
  }, [slides.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }, [])

  const adjustFontSize = useCallback((delta: number) => {
    const root = document.documentElement
    const current = parseFloat(
      getComputedStyle(root).getPropertyValue('--slide-font-size') || '1'
    )
    const next = Math.max(0.5, Math.min(2, current + delta))
    root.style.setProperty('--slide-font-size', String(next))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing in input elements
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      switch (e.key) {
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case '+':
        case '=':
          adjustFontSize(0.1)
          break
        case '-':
          adjustFontSize(-0.1)
          break
        case '?':
          setShowHelp((prev) => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, toggleFullscreen, adjustFontSize])

  // Initialize the CSS variable on mount
  useEffect(() => {
    const root = document.documentElement
    if (!root.style.getPropertyValue('--slide-font-size')) {
      root.style.setProperty('--slide-font-size', '1')
    }
  }, [])

  const CurrentSlideComponent = slides[currentSlide]

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slide area */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Left arrow */}
      {currentSlide > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-gray-800/60 hover:bg-gray-700/80
                     text-gray-300 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {currentSlide < slides.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-gray-800/60 hover:bg-gray-700/80
                     text-gray-300 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Page indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1)
              setCurrentSlide(index)
            }}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-200
              ${index === currentSlide
                ? 'bg-purple-400 scale-125'
                : 'bg-gray-600 hover:bg-gray-400'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Help overlay */}
      {showHelp && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-100 mb-4">
              Keyboard Shortcuts
            </h2>
            <div className="space-y-3 text-sm">
              {[
                ['Arrow Left / Right', 'Navigate slides'],
                ['F', 'Toggle fullscreen'],
                ['+ / -', 'Adjust font size'],
                ['?', 'Toggle this help overlay'],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center gap-4">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-gray-300 font-mono text-xs min-w-[120px] text-center">
                    {key}
                  </kbd>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 text-center">
              Press <kbd className="px-1 bg-gray-800 border border-gray-700 rounded">?</kbd> or click outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
