import type { SEdge, SNode } from './graph'

export const PROJECT_APP = 'system-design-simulator'
export const PROJECT_VERSION = 1

/** On-disk project format (JSON). */
export type ProjectFile = {
  app: typeof PROJECT_APP
  version: number
  savedAt: string
  nodes: Pick<SNode, 'id' | 'position' | 'data'>[]
  edges: Pick<SEdge, 'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle' | 'data'>[]
}
