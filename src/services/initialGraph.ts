import type { Graph } from '@/models'
import { makeData } from './nodeFactory'

/** Starter diagram: Client → API GW → Database. Returns fresh objects on every call. */
export const createInitialGraph = (): Graph => ({
  nodes: [
    { id: 'c', type: 'sys', position: { x: 80, y: 360 }, data: makeData('client') },
    { id: 's', type: 'sys', position: { x: 520, y: 140 }, data: { ...makeData('api'), name: 'API GW' } },
    { id: 'd', type: 'sys', position: { x: 960, y: 360 }, data: makeData('db') },
  ],
  edges: [
    { id: 'e1', source: 'c', target: 's', sourceHandle: 'r', targetHandle: 'l', data: { weight: 1 } },
    { id: 'e2', source: 's', target: 'd', sourceHandle: 'r', targetHandle: 'l', data: { weight: 1 } },
  ],
})
