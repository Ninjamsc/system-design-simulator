import type { Clip, Graph, SEdge, SNode } from '@/models'
import { uid } from '@/utils/id'

/** Copies the selected nodes and the links between them. */
export const copySelection = (g: Graph): Clip => {
  const nodes = g.nodes.filter((n) => n.selected)
  const edges = g.edges.filter((e) => nodes.some((n) => n.id === e.source) && nodes.some((n) => n.id === e.target))
  return { nodes: structuredClone(nodes), edges: structuredClone(edges) }
}

/** Creates new nodes/links from a clip (offset by 40px). `next` is the clip to use for the following paste. */
export const pasteClip = (clip: Clip): { nodes: SNode[]; edges: SEdge[]; next: Clip } => {
  const map: Record<string, string> = {}
  const nodes = clip.nodes.map((n) => {
    const id = uid(); map[n.id] = id
    return { ...n, id, selected: true, position: { x: n.position.x + 40, y: n.position.y + 40 } }
  })
  const edges = clip.edges.map((e) => ({ ...e, id: uid(), source: map[e.source], target: map[e.target], selected: false }))
  return { nodes, edges, next: { nodes: structuredClone(nodes), edges: structuredClone(edges) } }
}
