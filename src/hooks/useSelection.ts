import type { SEdge, SNode } from '@/models'

/** The single selected node or link (if exactly one thing is selected). */
export function useSelection(nodes: SNode[], edges: SEdge[]) {
  const sn = nodes.filter((n) => n.selected), se = edges.filter((e) => e.selected)
  return { node: sn.length === 1 && !se.length ? sn[0] : null, edge: se.length === 1 && !sn.length ? se[0] : null }
}
