import { useState, useEffect, useRef, useCallback } from 'react'
import type { Node, Edge } from '@xyflow/react'
import { CodeEditor } from './CodeEditor'
import { GraphView } from './GraphView'
import { parseMLXCode } from '../parser'

interface PlaygroundProps {
  initialCode: string
}

export function Playground({ initialCode }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)
  const [graphNodes, setGraphNodes] = useState<Node[]>([])
  const [graphEdges, setGraphEdges] = useState<Edge[]>([])
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([])

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

  const handleNodeHover = useCallback((lineNumber: number | null) => {
    setHoveredLine(lineNumber)
  }, [])

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
      <div className="w-[55%] h-full">
        <GraphView
          nodes={graphNodes}
          edges={graphEdges}
          onNodeHover={handleNodeHover}
        />
      </div>
    </div>
  )
}
