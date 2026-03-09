import type { Node, Edge } from '@xyflow/react'

/**
 * Given a set of nodes and edges and an eval node ID,
 * compute the topological execution order by walking backward
 * from the eval node through all its ancestors.
 *
 * Returns node IDs in topological order: sources first, eval node last.
 */
export function computeExecutionOrder(
  nodes: Node[],
  edges: Edge[],
  evalNodeId: string
): string[] {
  // BFS backward from evalNodeId: find all ancestor nodes
  // by traversing edges in reverse (target -> source)
  const ancestors = new Set<string>()
  const queue = [evalNodeId]

  while (queue.length > 0) {
    const current = queue.shift()!
    if (ancestors.has(current)) continue
    ancestors.add(current)
    // Find all nodes that feed into current
    for (const edge of edges) {
      if (edge.target === current && !ancestors.has(edge.source)) {
        queue.push(edge.source)
      }
    }
  }

  // Topological sort using DFS: sources first, dependents after
  const sorted: string[] = []
  const visited = new Set<string>()

  function visit(nodeId: string) {
    if (visited.has(nodeId) || !ancestors.has(nodeId)) return
    visited.add(nodeId)
    // Visit all sources (dependencies) first
    for (const edge of edges) {
      if (edge.target === nodeId) {
        visit(edge.source)
      }
    }
    sorted.push(nodeId)
  }

  visit(evalNodeId)
  return sorted
}
