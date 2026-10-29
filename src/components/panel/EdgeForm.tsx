import type { FlowDir, LinkType, SEdge } from '@/models'
import { useStore } from '@/store/AppStore'
import { fmt } from '@/utils/format'
import { edgeDir, edgeLink, edgeWeight, ends } from '@/utils/graph'
import { NumberField, Segmented } from './fields'

export function EdgeForm({ edge }: { edge: SEdge }) {
  const { editEdge, nodeName, sim } = useStore()
  const link = edgeLink(edge)
  return (<>
    <p className="hint">{nodeName(ends(edge).s)} → {nodeName(ends(edge).t)}</p>
    <Segmented<FlowDir> id="lf" label="Data Flow" value={edgeDir(edge)} onChange={(dir) => editEdge(edge.id, { dir })}
      options={[['forward', 'Forward'], ['backward', 'Backward'], ['bidirectional', 'Bidirectional']]} />
    <Segmented<LinkType> id="lt" label="Link type" value={link} onChange={(l) => editEdge(edge.id, { link: l })}
      options={[['sync', 'SYNC'], ['async', 'ASYNC']]} />
    <p className="hint" style={{ marginBottom: 14 }}>
      {link === 'sync' ? 'SYNC: the caller waits — downstream latency is added to the path.' : 'ASYNC: fire-and-forget — downstream latency is not added to the path.'}
    </p>
    <NumberField label="Traffic weight" bounded min={0} step={0.5} value={edgeWeight(edge)} onChange={(weight) => editEdge(edge.id, { weight })} hint="Share of the source's output sent over this link" />
    <div className="row"><span>Flow</span><b>{fmt(sim.flow[edge.id] || 0)} req/s</b></div>
  </>)
}
