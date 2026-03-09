import { Handle, Position } from '@xyflow/react'
import type { NodeProps, Node } from '@xyflow/react'

type EvalNodeType = Node<
  {
    label: string
    category: string
    operation: string
    lineNumber: number
    isActive?: boolean
    isCompileSource?: boolean
  },
  'eval'
>

export function EvalNode({ data }: NodeProps<EvalNodeType>) {
  const isActive = data.isActive ?? true

  return (
    <div
      className={`bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-lg
        transition-all duration-300 cursor-default
        ${isActive ? 'opacity-100 scale-100 animate-pulse hover:scale-105' : 'opacity-40 scale-95'}`}
      style={{
        width: 150,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-emerald-200 !w-2 !h-2" />
      <span className="truncate">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-200 !w-2 !h-2" />
    </div>
  )
}
