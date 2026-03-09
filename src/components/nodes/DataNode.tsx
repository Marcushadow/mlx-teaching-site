import { Handle, Position } from '@xyflow/react'
import type { NodeProps, Node } from '@xyflow/react'

type DataNodeType = Node<
  { label: string; category: string; operation: string; lineNumber: number },
  'data'
>

export function DataNode({ data }: NodeProps<DataNodeType>) {
  return (
    <div
      className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-lg
        hover:scale-105 transition-transform duration-150 cursor-default"
      style={{ width: 150, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-300 !w-2 !h-2" />
      <span className="truncate">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-300 !w-2 !h-2" />
    </div>
  )
}
