import type { ReactNode } from 'react'
import type { SlideProps } from '../types'

interface ExplainerSlideProps extends SlideProps {
  title: string
  content: ReactNode
  visual: ReactNode
}

export function ExplainerSlide({ title, content, visual, className = '' }: ExplainerSlideProps) {
  return (
    <div className={`h-full grid grid-cols-2 gap-0 bg-gray-950 ${className}`}>
      {/* Left side: title + body content */}
      <div className="flex flex-col justify-center px-12 py-10 overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-6 leading-tight">
          {title}
        </h1>
        <div className="text-lg text-gray-300 leading-relaxed space-y-4">
          {content}
        </div>
      </div>

      {/* Right side: visual area */}
      <div className="flex items-center justify-center px-8 py-10 bg-gray-900/50 border-l border-gray-800">
        {visual}
      </div>
    </div>
  )
}
