import { addEdge, ConnectionMode, type ReactFlowInstance, type ReactFlowProps } from '@xyflow/react'
import type { SEdge, SNode } from '@/models'
import { uid } from '@/utils/id'

/** Static props of the React Flow canvas. */
export const FLOW_PROPS: Partial<ReactFlowProps<SNode, SEdge>> = {
  connectionMode: ConnectionMode.Loose,
  deleteKeyCode: ['Delete', 'Backspace'],
  multiSelectionKeyCode: 'Shift',
  colorMode: 'dark',
  fitView: true,
  minZoom: 0.2,
  maxZoom: 2,
  nodeDragThreshold: 2,
}

export type LinkParams = { source: string; target: string; sourceHandle?: string | null; targetHandle?: string | null }

/** Adds a link with default data. */
export const linkEdge = (edges: SEdge[], params: LinkParams): SEdge[] => addEdge({ ...params, id: uid(), data: { weight: 1 } } as SEdge, edges) as SEdge[]

/** A point in flow coordinates near the middle of the screen (with jitter) for newly added nodes. */
export const randomPointNearCenter = (rf: ReactFlowInstance) =>
  rf.screenToFlowPosition({ x: window.innerWidth / 2 + (Math.random() - 0.5) * 240, y: window.innerHeight / 2 + (Math.random() - 0.5) * 200 })
