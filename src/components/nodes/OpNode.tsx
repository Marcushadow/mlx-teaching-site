import { Handle, Position } from '@xyflow/react'
import type { NodeProps, Node } from '@xyflow/react'

type OpNodeType = Node<
  {
    label: string
    category: string
    operation: string
    lineNumber: number
    isActive?: boolean
    isCompileSource?: boolean
  },
  'op'
>

export function OpNode({ data }: NodeProps<OpNodeType>) {
  const isActive = data.isActive ?? true
  const isCompileSource = data.isCompileSource ?? false

  return (
    <div
      className={`bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-lg
        transition-all duration-300 cursor-default
        ${isActive ? 'opacity-100 scale-100 hover:scale-105' : 'opacity-40 scale-95'}
        ${isCompileSource && isActive ? 'border-2 border-orange-400' : ''}`}
      style={{
        width: 150,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-purple-300 !w-2 !h-2" />
      <span className="truncate">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-purple-300 !w-2 !h-2" />
    </div>
  )
}
