import type { SEdge, SNode, Sim } from '@/models'
import { nodeLatencies, pathLatencies } from './latency'
import { buildDistribution, propagate } from './traffic'

export function simulate(nodes: SNode[], edges: SEdge[]): Sim {
  const dist = buildDistribution(nodes, edges)
  const { inn, flow } = propagate(nodes, dist)
  const lat = nodeLatencies(nodes, inn)
  const { slowest, average } = pathLatencies(nodes, dist, lat)

  let errors = 0, over = 0, emit = 0, slowSum = 0, avgSum = 0
  const e2e: Record<string, number> = {}, avg: Record<string, number> = {}
  const peak = { load: 0, name: '—' }
  for (const n of nodes) {
    const d = n.data
    if (d.kind === 'note') continue
    if (d.kind === 'client') {
      e2e[n.id] = slowest[n.id] || 0; avg[n.id] = average[n.id] || 0
      if (!d.dead) { emit += d.emit; slowSum += d.emit * e2e[n.id]; avgSum += d.emit * avg[n.id] }
      continue
    }
    const i = inn[n.id] || 0
    if (d.dead) { errors += i; continue }
    if (i > d.capacity) { errors += i - d.capacity; over++ }
    const l = i / Math.max(1, d.capacity)
    if (l > peak.load) { peak.load = l; peak.name = d.name }
  }
  return { in: inn, flow, lat, e2e, avg, latency: emit ? slowSum / emit : 0, latencyAvg: emit ? avgSum / emit : 0, emit, errors, over, peak }
}
