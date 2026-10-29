import { Trash2, X } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { EdgeForm } from './EdgeForm'
import { NodeForm } from './NodeForm'

export function ConfigPanel() {
  const { selection: { node, edge }, deselectAll, deleteSelected } = useStore()
  if (!node && !edge) return null
  return (
    <aside className="right">
      <div className="rh">Configure<button className="ic" aria-label="Close" onClick={deselectAll}><X size={15} /></button></div>
      <div className="rb">{node ? <NodeForm node={node} /> : <EdgeForm edge={edge!} />}</div>
      <button className="del" onClick={deleteSelected}><Trash2 size={14} />{node ? 'Delete Node' : 'Delete Edge'}</button>
    </aside>
  )
}
