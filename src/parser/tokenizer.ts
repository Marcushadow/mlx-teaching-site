export interface ParsedLine {
  lineNumber: number
  variable?: string // assigned variable name
  operation: string // e.g., 'mx.add'
  args: string[] // argument variable names or literals
  raw: string // original line text
}

export interface ParseError {
  line: number
  message: string
}

// Matches: varName = mx.opName(...)
const ASSIGNMENT_RE = /^(\w+)\s*=\s*(mx\.\w+)\((.*)?\)$/

// Matches: mx.opName(...)
const BARE_CALL_RE = /^(mx\.\w+)\((.*)?\)$/

// Matches import lines
const IMPORT_RE = /^import\s+/

// Matches comment lines
const COMMENT_RE = /^\s*#/

// Detects nested mx.* calls inside arguments (unsupported)
const NESTED_MX_RE = /mx\.\w+\(/

/**
 * Parse a single argument string, extracting individual arguments.
 * Handles bracket-delimited literals like [1.0, 2.0, 3.0] as single args.
 */
function parseArgs(argsStr: string): string[] {
  if (!argsStr || argsStr.trim() === '') return []

  const args: string[] = []
  let current = ''
  let bracketDepth = 0
  let parenDepth = 0

  for (const ch of argsStr) {
    if (ch === '[') {
      bracketDepth++
      current += ch
    } else if (ch === ']') {
      bracketDepth--
      current += ch
    } else if (ch === '(') {
      parenDepth++
      current += ch
    } else if (ch === ')') {
      parenDepth--
      current += ch
    } else if (ch === ',' && bracketDepth === 0 && parenDepth === 0) {
      args.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }

  if (current.trim()) {
    args.push(current.trim())
  }

  return args
}

/**
 * Tokenize MLX pseudo-code into an array of ParsedLine objects.
 * Returns both the parsed lines and any errors encountered.
 */
export function tokenize(code: string): { lines: ParsedLine[]; errors: ParseError[] } {
  const rawLines = code.split('\n')
  const parsed: ParsedLine[] = []
  const errors: ParseError[] = []

  for (let i = 0; i < rawLines.length; i++) {
    const lineNumber = i + 1
    const raw = rawLines[i]
    const trimmed = raw.trim()

    // Skip empty lines
    if (trimmed === '') continue

    // Skip comments
    if (COMMENT_RE.test(trimmed)) continue

    // Skip import lines
    if (IMPORT_RE.test(trimmed)) continue

    // Try assignment pattern: varName = mx.opName(...)
    const assignMatch = trimmed.match(ASSIGNMENT_RE)
    if (assignMatch) {
      const variable = assignMatch[1]
      const operation = assignMatch[2]
      const argsStr = assignMatch[3] ?? ''

      // Check for nested mx.* calls in arguments
      if (NESTED_MX_RE.test(argsStr)) {
        errors.push({
          line: lineNumber,
          message: `Nested mx.* calls are not supported. Break into separate assignments.`,
        })
        continue
      }

      parsed.push({
        lineNumber,
        variable,
        operation,
        args: parseArgs(argsStr),
        raw,
      })
      continue
    }

    // Try bare call pattern: mx.opName(...)
    const bareMatch = trimmed.match(BARE_CALL_RE)
    if (bareMatch) {
      const operation = bareMatch[1]
      const argsStr = bareMatch[2] ?? ''

      // Check for nested mx.* calls in arguments
      if (NESTED_MX_RE.test(argsStr)) {
        errors.push({
          line: lineNumber,
          message: `Nested mx.* calls are not supported. Break into separate assignments.`,
        })
        continue
      }

      parsed.push({
        lineNumber,
        operation,
        args: parseArgs(argsStr),
        raw,
      })
      continue
    }

    // If the line contains an mx.* call but didn't match our patterns,
    // flag it as unrecognized syntax
    if (/mx\.\w+/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Unrecognized syntax: "${trimmed}"`,
      })
    }
    // Non-mx lines are silently ignored (plain Python code we don't handle)
  }

  return { lines: parsed, errors }
}
