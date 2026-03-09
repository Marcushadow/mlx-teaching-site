import type { Node, Edge } from '@xyflow/react'
import dagre from 'dagre'
import type { ParsedLine, ParseError } from './tokenizer'
import { MLX_OPS } from './operations'

export interface GraphResult {
  nodes: Node[]
  edges: Edge[]
  errors: ParseError[]
}

/**
 * Use dagre to compute automatic top-to-bottom layout positions
 * for all nodes in the graph.
 */
function layoutGraph(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 80 })

  nodes.forEach((n) => g.setNode(n.id, { width: 150, height: 50 }))
  edges.forEach((e) => g.setEdge(e.source, e.target))

  dagre.layout(g)

  return {
    nodes: nodes.map((n) => {
      const pos = g.node(n.id)
      return { ...n, position: { x: pos.x - 75, y: pos.y - 25 } }
    }),
    edges,
  }
}

/**
 * Build a React Flow graph (nodes + edges) from parsed lines.
 * Each recognized operation becomes a node; edges connect arguments
 * that reference previous variable names.
 */
export function buildGraph(lines: ParsedLine[]): GraphResult {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const errors: ParseError[] = []

  // Track which variable names map to node IDs
  const variableToNodeId = new Map<string, string>()

  // Counter for auto-generated IDs (bare calls like mx.eval)
  let bareCallCounter = 0

  for (const line of lines) {
    const opDef = MLX_OPS[line.operation]

    if (!opDef) {
      errors.push({
        line: line.lineNumber,
        message: `Unknown operation: "${line.operation}"`,
      })
      continue
    }

    // Determine node ID: use the variable name if assigned, otherwise auto-generate
    const nodeId = line.variable ?? `${opDef.label}_${bareCallCounter++}`

    // Create the node
    const node: Node = {
      id: nodeId,
      type: 'default',
      position: { x: 0, y: 0 }, // will be overwritten by layout
      data: {
        label: opDef.label,
        category: opDef.category,
        operation: line.operation,
        lineNumber: line.lineNumber,
      },
    }
    nodes.push(node)

    // Register variable name for downstream edge resolution
    if (line.variable) {
      variableToNodeId.set(line.variable, nodeId)
    }

    // Create edges from arguments that reference known variables
    for (const arg of line.args) {
      const sourceNodeId = variableToNodeId.get(arg)
      if (sourceNodeId) {
        edges.push({
          id: `${sourceNodeId}->${nodeId}`,
          source: sourceNodeId,
          target: nodeId,
        })
      }
      // If the arg is not a known variable, it's a literal (e.g., [1.0, 2.0])
      // — no edge needed
    }
  }

  // Apply dagre layout if there are nodes
  if (nodes.length > 0) {
    const laid = layoutGraph(nodes, edges)
    return { nodes: laid.nodes, edges: laid.edges, errors }
  }

  return { nodes, edges, errors }
}
