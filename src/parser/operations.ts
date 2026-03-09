export interface OpDefinition {
  name: string
  inputs: number // number of input args (-1 = variadic)
  category: 'data' | 'op' | 'eval' | 'compile'
  label: string // display label on node
}

export const MLX_OPS: Record<string, OpDefinition> = {
  'mx.array':    { name: 'mx.array',    inputs: 1,  category: 'data',    label: 'array' },
  'mx.add':      { name: 'mx.add',      inputs: 2,  category: 'op',      label: 'add' },
  'mx.subtract': { name: 'mx.subtract', inputs: 2,  category: 'op',      label: 'subtract' },
  'mx.multiply': { name: 'mx.multiply', inputs: 2,  category: 'op',      label: 'multiply' },
  'mx.matmul':   { name: 'mx.matmul',   inputs: 2,  category: 'op',      label: 'matmul' },
  'mx.reshape':  { name: 'mx.reshape',  inputs: 2,  category: 'op',      label: 'reshape' },
  'mx.exp':      { name: 'mx.exp',      inputs: 1,  category: 'op',      label: 'exp' },
  'mx.log':      { name: 'mx.log',      inputs: 1,  category: 'op',      label: 'log' },
  'mx.sum':      { name: 'mx.sum',      inputs: 1,  category: 'op',      label: 'sum' },
  'mx.mean':     { name: 'mx.mean',     inputs: 1,  category: 'op',      label: 'mean' },
  'mx.eval':     { name: 'mx.eval',     inputs: -1, category: 'eval',    label: 'eval' },
  'mx.compile':  { name: 'mx.compile',  inputs: -1, category: 'compile', label: 'compile' },
}
