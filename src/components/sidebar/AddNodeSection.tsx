import { Plus } from 'lucide-react'
import { KIND_META, KIND_ORDER } from '@/assets/nodeKinds'
import { useStore } from '@/store/AppStore'

export function AddNodeSection() {
  const { addNode } = useStore()
  return (
    <section>
      <h3>Add node</h3>
      {KIND_ORDER.map((k) => {
        const { icon: Icon, label, color } = KIND_META[k]
        return <button key={k} className="it" onClick={() => addNode(k)}><Plus size={11} /><Icon size={15} color={color} />{label}</button>
      })}
    </section>
  )
}
