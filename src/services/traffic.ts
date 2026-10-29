import type { SEdge, SNode } from '@/models'
import { edgeWeight, ends } from '@/utils/graph'

/** For every node: the fraction of its processed requests that goes over each outgoing link (the rest terminates there). */
export type Dist = Record<string, { e: SEdge; f: number }[]>

const split = (list: SEdge[], frac: number) => {
  const w = list.reduce((s, e) => s + edgeWeight(e), 0) || 1
  return list.map((e) => ({ e, f: (frac * edgeWeight(e)) / w }))
}

export function buildDistribution(nodes: SNode[], edges: SEdge[]): Dist {
  const byId: Record<string, SNode> = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const tKind = (e: SEdge) => byId[ends(e).t].data.kind
  const dist: Dist = {}
  for (const n of nodes) {
    const d = n.data
    const outs = edges.filter((e) => ends(e).s === n.id && byId[ends(e).t] && tKind(e) !== 'note')
    if (d.kind === 'note' || !outs.length) { dist[n.id] = []; continue }
    if (d.kind === 'redis') { dist[n.id] = split(outs, 1 - d.hit); continue } // only cache misses go downstream
    const dbs = outs.filter((e) => ['db', 'redis'].includes(tKind(e)))
    const rest = outs.filter((e) => !dbs.includes(e))
    dist[n.id] = ['api', 'app', 'chat'].includes(d.kind) && dbs.length
      ? [...split(dbs, d.ratio), ...(rest.length ? split(rest, 1 - d.ratio) : [])]
      : split(outs, 1)
  }
  return dist
}

/** Steady-state load propagation: client emit → every node serves min(in, capacity) → split across outgoing links. */
export function propagate(nodes: SNode[], dist: Dist) {
  let inn: Record<string, number> = {}
  let flow: Record<string, number> = {}
  for (let it = 0; it < 40; it++) {
    const nin: Record<string, number> = {}
    const nf: Record<string, number> = {}
    for (const n of nodes) {
      const d = n.data
      if (d.kind === 'note') continue
      const out = d.dead ? 0 : d.kind === 'client' ? d.emit : Math.min(inn[n.id] || 0, d.capacity)
      if (!out) continue
      for (const { e, f } of dist[n.id]) { const x = out * f; nf[e.id] = x; const t = ends(e).t; nin[t] = (nin[t] || 0) + x }
    }
    inn = nin
    flow = nf
  }
  return { inn, flow }
}
