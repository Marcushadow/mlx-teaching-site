import type { SlideProps } from '../types'

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

      {/* Playground area (placeholder until Task 5) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-hidden">
        <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">
          Playground goes here
        </p>
        <pre className="w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-lg p-6 text-sm text-gray-300 font-mono overflow-auto max-h-[70vh]">
          {initialCode}
        </pre>
      </div>
    </div>
  )
}
