import { Link2 } from 'lucide-react'
import { useStore } from '@/store/AppStore'

export function ConnectSection() {
  const { connectMode, nodeName } = useStore()
  return (
    <section>
      <h3>Connect</h3>
      <button className={`it${connectMode.on ? ' on' : ''}`} onClick={connectMode.toggle}><Link2 size={15} />Connect Mode</button>
      {connectMode.on && <p className="hint">{connectMode.pending ? `From “${nodeName(connectMode.pending)}” — click the target node` : 'Click a source node, then a target'}</p>}
    </section>
  )
}
