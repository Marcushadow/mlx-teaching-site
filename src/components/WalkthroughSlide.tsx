import { useState } from 'react'
import type { SlideProps } from '../types'

interface WalkthroughStep {
  lines: [number, number]
  description: string
}

interface WalkthroughSlideProps extends SlideProps {
  title: string
  code: string
  steps: WalkthroughStep[]
}

export function WalkthroughSlide({ title, code, steps, className = '' }: WalkthroughSlideProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const codeLines = code.split('\n')

  // Determine which lines should be highlighted based on the active step
  const highlightedLines = new Set<number>()
  if (activeStep !== null && steps[activeStep]) {
    const [start, end] = steps[activeStep].lines
    for (let i = start; i <= end; i++) {
      highlightedLines.add(i)
    }
  }

  return (
    <div className={`h-full flex flex-col bg-gray-950 ${className}`}>
      {/* Title bar */}
      <div className="shrink-0 px-6 py-3 bg-gray-900 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
      </div>

      {/* Main content: code on left, steps on right */}
      <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
        {/* Left: code display with line numbers */}
        <div className="overflow-auto border-r border-gray-800 bg-gray-900/50">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            {codeLines.map((line, index) => {
              const lineNumber = index + 1
              const isHighlighted = highlightedLines.has(lineNumber)
              return (
                <div
                  key={index}
                  className={`flex transition-colors duration-200 ${
                    isHighlighted
                      ? 'bg-purple-500/20 border-l-2 border-purple-400'
                      : 'border-l-2 border-transparent'
                  }`}
                >
                  <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none shrink-0">
                    {lineNumber}
                  </span>
                  <span className={isHighlighted ? 'text-gray-100' : 'text-gray-400'}>
                    {line || ' '}
                  </span>
                </div>
              )
            })}
          </pre>
        </div>

        {/* Right: step annotations */}
        <div className="overflow-y-auto p-6 space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            Steps &mdash; click to highlight code
          </p>
          {steps.map((step, index) => {
            const isActive = activeStep === index
            return (
              <button
                key={index}
                onClick={() => setActiveStep(isActive ? null : index)}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all duration-200
                  ${isActive
                    ? 'bg-purple-500/15 border-purple-500/50 text-gray-100'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`
                      shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${isActive
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-500'
                      }
                    `}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed">{step.description}</p>
                    <p className="text-xs text-gray-600 mt-1 font-mono">
                      Lines {step.lines[0]}&ndash;{step.lines[1]}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
