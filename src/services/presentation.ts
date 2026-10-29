import { LOAD } from '@/assets/palette'
import type { SEdge, SNode, Sim } from '@/models'
import { edgeDir, ends, markerId } from '@/utils/graph'
import { isPassive, loadColor } from '@/utils/load'

/** Nodes with simulation results injected for rendering. */
export const toDisplayNodes = (nodes: SNode[], sim: Sim): SNode[] =>
  nodes.map((n) => ({ ...n, data: { ...n.data, inn: sim.in[n.id] || 0, lat: sim.lat[n.id], e2e: sim.e2e[n.id], avg: sim.avg[n.id] } }))

/** Links coloured by load (traffic over the link / capacity of the receiving node); grey and still when paused or idle. */
export const toDisplayEdges = (nodes: SNode[], edges: SEdge[], sim: Sim, running: boolean): SEdge[] =>
  edges.map((e) => {
    const t = nodes.find((n) => n.id === ends(e).t)
    const f = sim.flow[e.id] || 0
    const load = t && !isPassive(t.data) ? f / Math.max(1, t.data.capacity) : 0
    const active = running && f > 0
    const color = active ? loadColor(load) : LOAD.idle
    const dir = edgeDir(e)
    return {
      ...e, type: 'flow', data: { weight: 1, ...e.data, active },
      style: { stroke: color, strokeWidth: e.selected ? 3.5 : 2.5 },
      markerEnd: dir !== 'backward' ? markerId(color) : undefined,
      markerStart: dir !== 'forward' ? markerId(color) : undefined,
    }
  })
