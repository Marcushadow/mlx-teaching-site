import { useState, useEffect, useRef, useCallback } from 'react'
import type { Node, Edge } from '@xyflow/react'
import { CodeEditor } from './CodeEditor'
import { GraphView } from './GraphView'
import { parseMLXCode } from '../parser'
import { computeExecutionOrder } from '../parser/animator'

interface PlaygroundProps {
  initialCode: string
}

export function Playground({ initialCode }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)
  const [graphNodes, setGraphNodes] = useState<Node[]>([])
  const [graphEdges, setGraphEdges] = useState<Edge[]>([])
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([])

  // Animation state
  const [activeNodeIds, setActiveNodeIds] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)
  const [, setAnimationStep] = useState(0)
  const animationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const executionOrderRef = useRef<string[]>([])
  const hasEvalNodes = useRef(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Parse code on initial mount
  useEffect(() => {
    const result = parseMLXCode(initialCode)
    setGraphNodes(result.nodes)
    setGraphEdges(result.edges)
    setErrors(result.errors)
  }, [initialCode])

  // Debounced code change handler
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const result = parseMLXCode(newCode)
      setGraphNodes(result.nodes)
      setGraphEdges(result.edges)
      setErrors(result.errors)
    }, 300)
  }, [])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  // Stop any running animation timer
  const stopAnimation = useCallback(() => {
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current)
      animationTimerRef.current = null
    }
    setIsAnimating(false)
  }, [])

  // Start animation from scratch
  const startAnimation = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      // Stop any existing animation
      stopAnimation()

      // Find eval nodes
      const evalNodes = nodes.filter((n) => n.type === 'eval')
      if (evalNodes.length === 0) {
        hasEvalNodes.current = false
        return
      }

      hasEvalNodes.current = true

      // Compute execution order for the first eval node
      // (if there are multiple eval nodes, use the first one)
      const order = computeExecutionOrder(nodes, edges, evalNodes[0].id)
      executionOrderRef.current = order

      // Reset animation state: all nodes start grayed out
      setActiveNodeIds(new Set())
      setAnimationStep(0)
      setIsAnimating(true)

      // Animate: light up one node every 500ms
      let step = 0
      animationTimerRef.current = setInterval(() => {
        if (step < order.length) {
          setActiveNodeIds((prev) => {
            const next = new Set(prev)
            next.add(order[step])
            return next
          })
          step++
          setAnimationStep(step)
        } else {
          // Animation complete
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current)
            animationTimerRef.current = null
          }
          setIsAnimating(false)
        }
      }, 500)
    },
    [stopAnimation]
  )

  // Start animation when graph changes and has eval nodes
  useEffect(() => {
    if (graphNodes.length > 0) {
      startAnimation(graphNodes, graphEdges)
    } else {
      hasEvalNodes.current = false
      stopAnimation()
      setActiveNodeIds(new Set())
    }

    return () => {
      stopAnimation()
    }
  }, [graphNodes, graphEdges]) // eslint-disable-line react-hooks/exhaustive-deps

  // Replay handler
  const handleReplay = useCallback(() => {
    startAnimation(graphNodes, graphEdges)
  }, [graphNodes, graphEdges, startAnimation])

  const handleNodeHover = useCallback((lineNumber: number | null) => {
    setHoveredLine(lineNumber)
  }, [])

  // Only pass activeNodeIds when there are eval nodes (animation mode)
  const animationActive = hasEvalNodes.current
  const activeSet = animationActive ? activeNodeIds : undefined

  return (
    <div className="flex flex-row w-full h-full overflow-hidden">
      {/* Code Editor - left panel */}
      <div className="w-[45%] h-full border-r border-gray-800">
        <CodeEditor
          code={code}
          onChange={handleCodeChange}
          highlightLine={hoveredLine ?? undefined}
          errors={errors}
        />
      </div>

      {/* Graph View - right panel */}
      <div className="w-[55%] h-full relative">
        <GraphView
          nodes={graphNodes}
          edges={graphEdges}
          onNodeHover={handleNodeHover}
          activeNodeIds={activeSet}
        />

        {/* Replay button - only shown when animation mode is active */}
        {animationActive && !isAnimating && (
          <button
            onClick={handleReplay}
            className="absolute bottom-4 right-4 z-10 bg-gray-800 hover:bg-gray-700
              text-gray-300 hover:text-white text-xs font-medium
              px-3 py-1.5 rounded-md border border-gray-600
              transition-colors duration-200 shadow-lg"
          >
            Replay
          </button>
        )}
      </div>
    </div>
  )
}
