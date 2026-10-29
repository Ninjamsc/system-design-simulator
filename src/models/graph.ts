import type { Edge, Node } from '@xyflow/react'
import type { EdgeData } from './edge'
import type { NData } from './node'

export type SNode = Node<NData>
export type SEdge = Edge<EdgeData>
export type Graph = { nodes: SNode[]; edges: SEdge[] }
export type Clip = Graph
