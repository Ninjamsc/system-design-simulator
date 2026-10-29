import { BASE_DATA, KIND_DEFAULTS, type Kind, type NData, type SNode } from '@/models'
import { KIND_META } from '@/assets/nodeKinds'
import { uid } from '@/utils/id'

export const makeData = (kind: Kind): NData => ({ kind, name: KIND_META[kind].label, ...BASE_DATA, ...KIND_DEFAULTS[kind] })

export const createNode = (kind: Kind, position: { x: number; y: number }): SNode => ({
  id: uid(), type: 'sys', position, selected: true, data: makeData(kind),
})

export const cloneNode = (n: SNode, dx: number, dy: number): SNode => ({
  ...structuredClone(n), id: uid(), selected: true, position: { x: n.position.x + dx, y: n.position.y + dy },
})
