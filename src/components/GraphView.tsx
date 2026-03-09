import { useCallback, useMemo } from 'react'
import { ReactFlow } from '@xyflow/react'
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { DataNode } from './nodes/DataNode'
import { OpNode } from './nodes/OpNode'
import { EvalNode } from './nodes/EvalNode'
import { CompileNode } from './nodes/CompileNode'

// IMPORTANT: nodeTypes must be defined outside the component to prevent
// React Flow from re-registering types on every render.
const nodeTypes = {
  data: DataNode,
  op: OpNode,
  eval: EvalNode,
  compile: CompileNode,
}

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#6b7280' },
}

interface GraphViewProps {
  nodes: Node[]
  edges: Edge[]
  onNodeHover?: (lineNumber: number | null) => void
  activeNodeIds?: Set<string>
}

export function GraphView({ nodes, edges, onNodeHover, activeNodeIds }: GraphViewProps) {
  const handleNodeMouseEnter: NodeMouseHandler = useCallback(
    (_event, node) => {
      const lineNumber = (node.data as Record<string, unknown>)?.lineNumber
      if (typeof lineNumber === 'number' && onNodeHover) {
        onNodeHover(lineNumber)
      }
    },
    [onNodeHover]
  )

  const handleNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    onNodeHover?.(null)
  }, [onNodeHover])

  // When activeNodeIds is provided (animation mode), inject isActive into node data.
  // Also detect compile-related nodes: when a compile node becomes active,
  // its source nodes get an orange border flag.
  const processedNodes = useMemo(() => {
    if (!activeNodeIds) return nodes

    // Find active compile nodes and their source node IDs
    const compileSourceIds = new Set<string>()
    for (const node of nodes) {
      if (node.type === 'compile' && activeNodeIds.has(node.id)) {
        // Find all direct sources feeding into this compile node
        for (const edge of edges) {
          if (edge.target === node.id) {
            compileSourceIds.add(edge.source)
          }
        }
      }
    }

    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isActive: activeNodeIds.has(node.id),
        isCompileSource: compileSourceIds.has(node.id),
      },
    }))
  }, [nodes, edges, activeNodeIds])

  return (
    <div className="w-full h-full bg-gray-900">
      <ReactFlow
        nodes={processedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
      />
    </div>
  )
}
