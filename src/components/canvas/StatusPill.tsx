import { Activity } from 'lucide-react'
import { useStore } from '@/store/AppStore'
import { fmt } from '@/utils/format'

export function StatusPill() {
  const { running, sim } = useStore()
  return <div className={`pill${running ? '' : ' off'}`}><Activity size={12} />{running ? `Simulating — ${fmt(sim.emit)} req/s` : 'Paused'}</div>
}
