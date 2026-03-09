import type { Node, Edge } from '@xyflow/react'
import { tokenize } from './tokenizer'
import type { ParseError } from './tokenizer'
import { buildGraph } from './graphBuilder'

export type { ParsedLine, ParseError } from './tokenizer'
export type { OpDefinition } from './operations'
export { MLX_OPS } from './operations'

export interface ParseResult {
  nodes: Node[]
  edges: Edge[]
  errors: ParseError[]
}

/**
 * Parse MLX pseudo-code and produce a React Flow graph.
 *
 * Pipeline: code string -> tokenizer -> graph builder -> layouted nodes/edges
 *
 * @param code - The MLX pseudo-code string to parse
 * @returns Nodes, edges, and any parse errors
 */
export function parseMLXCode(code: string): ParseResult {
  // Step 1: Tokenize
  const { lines, errors: tokenErrors } = tokenize(code)

  // Step 2: Build graph (includes layout)
  const { nodes, edges, errors: graphErrors } = buildGraph(lines)

  // Combine errors from both stages
  const errors: ParseError[] = [...tokenErrors, ...graphErrors]

  return { nodes, edges, errors }
}
