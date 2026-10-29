import type { FlowDir, LinkType, SEdge } from '@/models'

export const edgeDir = (e: SEdge): FlowDir => e.data?.dir ?? 'forward'
export const edgeLink = (e: SEdge): LinkType => e.data?.link ?? 'sync'
export const edgeWeight = (e: SEdge) => e.data?.weight ?? 1
export const isSync = (e: SEdge) => edgeLink(e) === 'sync'

/** Effective traffic direction: forward = source→target, backward = target→source, bidirectional = requests go source→target. */
export const ends = (e: SEdge) => (edgeDir(e) === 'backward' ? { s: e.target, t: e.source } : { s: e.source, t: e.target })

export const markerId = (color: string) => `arr-${color.slice(1)}`

/** Clears the `selected` flag on nodes or edges. */
export const deselect = <T extends { selected?: boolean }>(items: T[]): T[] => items.map((i) => ({ ...i, selected: false }))
