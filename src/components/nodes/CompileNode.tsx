import { Handle, Position } from '@xyflow/react'
import type { NodeProps, Node } from '@xyflow/react'

type CompileNodeType = Node<
  {
    label: string
    category: string
    operation: string
    lineNumber: number
    isActive?: boolean
    isCompileSource?: boolean
  },
  'compile'
>

export function CompileNode({ data }: NodeProps<CompileNodeType>) {
  const isActive = data.isActive ?? true

  return (
    <div
      className={`bg-gray-900 text-orange-300 rounded-lg px-4 py-2 text-sm font-medium
        border-2 border-dashed border-orange-400
        transition-all duration-300 cursor-default
        ${isActive ? 'opacity-100 scale-100 shadow-[0_0_15px_rgba(251,146,60,0.5)] hover:scale-105' : 'opacity-40 scale-95 shadow-lg'}`}
      style={{
        width: 150,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-orange-300 !w-2 !h-2" />
      <span className="truncate">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-orange-300 !w-2 !h-2" />
    </div>
  )
}
