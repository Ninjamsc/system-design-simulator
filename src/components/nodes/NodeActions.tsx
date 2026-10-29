import { Copy, Trash2 } from 'lucide-react'
import { useStore } from '@/store/AppStore'

/** Copy / delete buttons shown when hovering a node. */
export function NodeActions({ id }: { id: string }) {
  const { duplicateNode, deleteNode } = useStore()
  return (
    <div className="ntb nodrag nopan">
      <button aria-label="Copy node" title="Copy" onClick={(e) => { e.stopPropagation(); duplicateNode(id) }}><Copy size={14} /></button>
      <button aria-label="Delete node" title="Delete" className="x" onClick={(e) => { e.stopPropagation(); deleteNode(id) }}><Trash2 size={14} /></button>
    </div>
  )
}
