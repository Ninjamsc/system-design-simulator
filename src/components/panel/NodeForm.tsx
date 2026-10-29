import type { NData, SNode } from '@/models'
import { useStore } from '@/store/AppStore'
import { isPassive } from '@/utils/load'
import { NumberField, Switch, TextField } from './fields'

export function NodeForm({ node }: { node: SNode }) {
  const { editNode } = useStore()
  const d = node.data
  const set = (p: Partial<NData>) => editNode(node.id, p)
  return (<>
    <TextField label="Name" value={d.name} onChange={(name) => set({ name })} />
    {d.kind === 'client' && (<>
      <NumberField label="Emit (RPS)" min={0} value={d.emit} onChange={(emit) => set({ emit })} />
      <NumberField label="Key" value={d.key} onChange={(key) => set({ key })} />
    </>)}
    {d.kind === 'note' && <TextField label="Text" multiline value={d.text} onChange={(text) => set({ text })} />}
    {!isPassive(d) && (<>
      <NumberField label="Capacity (RPS)" min={1} value={d.capacity} onChange={(capacity) => set({ capacity })} />
      <NumberField label="Latency (ms)" min={0} value={d.latency} onChange={(latency) => set({ latency })} />
    </>)}
    {d.kind === 'redis' && <NumberField label="Cache hit ratio" bounded min={0} max={1} step={0.05} value={d.hit} onChange={(hit) => set({ hit })} hint="Hits are served here; misses go downstream" />}
    {['api', 'app', 'chat'].includes(d.kind) && <NumberField label="DB query ratio" bounded min={0} max={1} step={0.1} value={d.ratio} onChange={(ratio) => set({ ratio })} hint="Fraction of requests sent to DB / Redis" />}
    {d.kind !== 'note' && <Switch label="Kill node" checked={d.dead} onChange={(dead) => set({ dead })} />}
  </>)
}
