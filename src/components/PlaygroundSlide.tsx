import type { SlideProps } from '../types'
import { Playground } from './Playground'

interface PlaygroundSlideProps extends SlideProps {
  title: string
  initialCode: string
}

export function PlaygroundSlide({ title, initialCode, className = '' }: PlaygroundSlideProps) {
  return (
    <div className={`h-full flex flex-col bg-gray-950 ${className}`}>
      {/* Thin title bar */}
      <div className="shrink-0 px-6 py-3 bg-gray-900 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
      </div>

      {/* Playground area */}
      <div className="flex-1 overflow-hidden">
        <Playground initialCode={initialCode} />
      </div>
    </div>
  )
}
