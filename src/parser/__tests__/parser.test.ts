/**
 * Verification test for the MLX parser engine.
 *
 * Run with: npx tsx src/parser/__tests__/parser.test.ts
 */

import { parseMLXCode } from '../index.ts'
import { tokenize } from '../tokenizer.ts'

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`)
  }
}

// ── Test 1: Main integration test ──────────────────────────────────────────

const result = parseMLXCode(`
import mlx.core as mx

a = mx.array([1.0, 2.0, 3.0])
b = mx.array([4.0, 5.0, 6.0])
c = mx.add(a, b)
d = mx.matmul(c, c)
mx.eval(d)
`)

console.log('=== Test 1: Integration test ===')
console.log('Nodes:', result.nodes.length)
console.log('Edges:', result.edges.length)
console.log('Errors:', result.errors.length)
console.log()

// Verify node count: a, b, c, d, eval_0 = 5
assert(result.nodes.length === 5, `Expected 5 nodes, got ${result.nodes.length}`)

// Verify node IDs
const nodeIds = result.nodes.map((n: { id: string }) => n.id).sort()
assert(
  JSON.stringify(nodeIds) === JSON.stringify(['a', 'b', 'c', 'd', 'eval_0']),
  `Unexpected node IDs: ${JSON.stringify(nodeIds)}`
)

// Verify edges
const edgeDescriptions = result.edges.map((e: { source: string; target: string }) => `${e.source}->${e.target}`)
console.log('Edge descriptions:', edgeDescriptions)

// We expect: a->c, b->c, c->d, c->d, d->eval_0
assert(result.edges.length === 5, `Expected 5 edges, got ${result.edges.length}`)

// Verify no errors
assert(result.errors.length === 0, `Expected 0 errors, got ${result.errors.length}: ${JSON.stringify(result.errors)}`)

// Verify all nodes have positions (dagre layout applied)
for (const node of result.nodes) {
  assert(typeof node.position.x === 'number', `Node ${node.id} missing x position`)
  assert(typeof node.position.y === 'number', `Node ${node.id} missing y position`)
}

// Verify node data has expected fields
for (const node of result.nodes) {
  assert(Boolean(node.data.label), `Node ${node.id} missing label`)
  assert(Boolean(node.data.category), `Node ${node.id} missing category`)
  assert(Boolean(node.data.lineNumber), `Node ${node.id} missing lineNumber`)
}

console.log('PASS: Integration test')
console.log()

// ── Test 2: Empty input ────────────────────────────────────────────────────

console.log('=== Test 2: Empty input ===')
const emptyResult = parseMLXCode('')
assert(emptyResult.nodes.length === 0, 'Expected 0 nodes for empty input')
assert(emptyResult.edges.length === 0, 'Expected 0 edges for empty input')
assert(emptyResult.errors.length === 0, 'Expected 0 errors for empty input')
console.log('PASS: Empty input')
console.log()

// ── Test 3: Comments and imports only ──────────────────────────────────────

console.log('=== Test 3: Comments and imports only ===')
const commentsResult = parseMLXCode(`
# This is a comment
import mlx.core as mx
# Another comment
`)
assert(commentsResult.nodes.length === 0, 'Expected 0 nodes for comments/imports only')
assert(commentsResult.errors.length === 0, 'Expected 0 errors for comments/imports only')
console.log('PASS: Comments and imports')
console.log()

// ── Test 4: Unknown operation ──────────────────────────────────────────────

console.log('=== Test 4: Unknown operation ===')
const unknownResult = parseMLXCode(`
x = mx.unknown_op(a)
`)
assert(unknownResult.nodes.length === 0, 'Expected 0 nodes for unknown op')
assert(unknownResult.errors.length === 1, `Expected 1 error for unknown op, got ${unknownResult.errors.length}`)
assert(
  unknownResult.errors[0].message.includes('Unknown operation'),
  `Error message should mention unknown operation: ${unknownResult.errors[0].message}`
)
console.log('PASS: Unknown operation')
console.log()

// ── Test 5: Nested calls (unsupported) ─────────────────────────────────────

console.log('=== Test 5: Nested calls ===')
const nestedResult = parseMLXCode(`
c = mx.add(mx.array([1]), mx.array([2]))
`)
assert(nestedResult.errors.length === 1, `Expected 1 error for nested calls, got ${nestedResult.errors.length}`)
assert(
  nestedResult.errors[0].message.includes('Nested'),
  `Error should mention nesting: ${nestedResult.errors[0].message}`
)
console.log('PASS: Nested calls')
console.log()

// ── Test 6: Tokenizer detail check ────────────────────────────────────────

console.log('=== Test 6: Tokenizer details ===')
const { lines } = tokenize(`
a = mx.array([1.0, 2.0, 3.0])
c = mx.add(a, b)
mx.eval(c)
`)
assert(lines.length === 3, `Expected 3 parsed lines, got ${lines.length}`)
assert(lines[0].variable === 'a', `First line variable should be 'a', got '${lines[0].variable}'`)
assert(lines[0].operation === 'mx.array', `First line op should be 'mx.array'`)
assert(lines[0].args.length === 1, `mx.array should have 1 arg (the list literal), got ${lines[0].args.length}`)
assert(lines[0].args[0] === '[1.0, 2.0, 3.0]', `mx.array arg should be the list literal, got '${lines[0].args[0]}'`)
assert(lines[1].args.length === 2, `mx.add should have 2 args`)
assert(lines[1].args[0] === 'a' && lines[1].args[1] === 'b', `mx.add args should be ['a', 'b']`)
assert(lines[2].variable === undefined, `Bare call should not have a variable`)
assert(lines[2].operation === 'mx.eval', `Bare call operation should be mx.eval`)
console.log('PASS: Tokenizer details')
console.log()

// ── Test 7: Multiple bare calls get unique IDs ─────────────────────────────

console.log('=== Test 7: Multiple bare calls ===')
const multiEvalResult = parseMLXCode(`
a = mx.array([1.0])
mx.eval(a)
mx.eval(a)
`)
const evalNodes = multiEvalResult.nodes.filter((n: { data: Record<string, unknown> }) => n.data.label === 'eval')
assert(evalNodes.length === 2, `Expected 2 eval nodes, got ${evalNodes.length}`)
assert(evalNodes[0].id !== evalNodes[1].id, `Eval nodes should have different IDs`)
console.log('PASS: Multiple bare calls')
console.log()

console.log('=== All tests passed! ===')
