import type { NData, SNode } from '@/models'
import { isSync, ends } from '@/utils/graph'
import { isPassive, loadOf } from '@/utils/load'
import type { Dist } from './traffic'

/** M/D/1-style queueing: latency = base * (1 + ρ / (2(1-ρ))), ρ capped at 0.98. */
export const effectiveLatency = (d: NData, load: number) => {
  const r = Math.min(load, 0.98)
  return d.latency * (1 + r / (2 * (1 - r)))
}

export const nodeLatencies = (nodes: SNode[], inn: Record<string, number>): Record<string, number> =>
  Object.fromEntries(nodes.map((n) => [n.id, isPassive(n.data) ? 0 : effectiveLatency(n.data, loadOf(n.data, inn[n.id] || 0))]))

/**
 * Only SYNC links add the downstream latency to the caller; ASYNC links are fire-and-forget.
 *  slowest: lat(n) + max over sync links of slowest(target)
 *  average: lat(n) + Σ f · average(target)
 */
export function pathLatencies(nodes: SNode[], dist: Dist, lat: Record<string, number>) {
  let slowest: Record<string, number> = {}
  let average: Record<string, number> = {}
  for (let it = 0; it < nodes.length + 2; it++) {
    const ns: Record<string, number> = {}, na: Record<string, number> = {}
    for (const n of nodes) {
      const sync = dist[n.id].filter(({ e, f }) => isSync(e) && f > 0)
      ns[n.id] = n.data.dead ? 0 : lat[n.id] + Math.max(0, ...sync.map(({ e }) => slowest[ends(e).t] || 0))
      na[n.id] = n.data.dead ? 0 : lat[n.id] + sync.reduce((s, { e, f }) => s + f * (average[ends(e).t] || 0), 0)
    }
    slowest = ns; average = na
  }
  return { slowest, average }
}
