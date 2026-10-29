import { KIND_META } from '@/assets/nodeKinds'
import { PROJECT_APP, PROJECT_VERSION, type EdgeData, type Graph, type NData, type ProjectFile, type SEdge, type SNode } from '@/models'
import { makeData } from './nodeFactory'

const NUM_KEYS = ['capacity', 'latency', 'emit', 'key', 'ratio', 'hit'] as const
const DIRS = ['forward', 'backward', 'bidirectional']
const LINKS = ['sync', 'async']
const HANDLES = ['t', 'b', 'l', 'r']

/** Graph → JSON text. Only user-editable data is stored (simulation results are recomputed on load). */
export function serializeProject(g: Graph): string {
  const file: ProjectFile = {
    app: PROJECT_APP, version: PROJECT_VERSION, savedAt: new Date().toISOString(),
    nodes: g.nodes.map((n) => {
      const { inn, lat, e2e, avg, ...data } = n.data
      return { id: n.id, position: { x: Math.round(n.position.x), y: Math.round(n.position.y) }, data: data as NData }
    }),
    edges: g.edges.map((e) => ({
      id: e.id, source: e.source, target: e.target, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle,
      data: { weight: e.data?.weight ?? 1, dir: e.data?.dir ?? 'forward', link: e.data?.link ?? 'sync' },
    })),
  }
  return JSON.stringify(file, null, 2)
}

/** JSON text → validated Graph. Throws an Error with a readable message for invalid files. */
export function parseProject(text: string): Graph {
  let raw: any
  try { raw = JSON.parse(text) } catch { throw new Error('The file is not valid JSON.') }
  if (!raw || raw.app !== PROJECT_APP || !Array.isArray(raw.nodes) || !Array.isArray(raw.edges)) throw new Error('This is not a System Design Simulator project file.')
  if (typeof raw.version === 'number' && raw.version > PROJECT_VERSION) throw new Error('The project was saved by a newer version of the app.')

  const ids = new Set<string>()
  const nodes: SNode[] = raw.nodes.map((n: any, i: number) => {
    const kind = n?.data?.kind
    if (typeof n?.id !== 'string' || !(kind in KIND_META)) throw new Error(`Node #${i + 1} is invalid.`)
    if (ids.has(n.id)) throw new Error(`Duplicate node id “${n.id}”.`)
    ids.add(n.id)
    const data: NData = makeData(kind)
    if (typeof n.data.name === 'string') data.name = n.data.name
    if (typeof n.data.text === 'string') data.text = n.data.text
    if (typeof n.data.dead === 'boolean') data.dead = n.data.dead
    for (const k of NUM_KEYS) if (Number.isFinite(n.data[k])) data[k] = n.data[k]
    const x = Number(n.position?.x), y = Number(n.position?.y)
    return { id: n.id, type: 'sys', position: { x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 }, data }
  })

  const edges: SEdge[] = raw.edges
    .filter((e: any) => typeof e?.id === 'string' && ids.has(e.source) && ids.has(e.target)) // drop dangling links
    .map((e: any): SEdge => {
      const data: EdgeData = {
        weight: Number.isFinite(e.data?.weight) && e.data.weight >= 0 ? e.data.weight : 1,
        dir: DIRS.includes(e.data?.dir) ? e.data.dir : 'forward',
        link: LINKS.includes(e.data?.link) ? e.data.link : 'sync',
      }
      return {
        id: e.id, source: e.source, target: e.target, data,
        sourceHandle: HANDLES.includes(e.sourceHandle) ? e.sourceHandle : undefined,
        targetHandle: HANDLES.includes(e.targetHandle) ? e.targetHandle : undefined,
      }
    })
  return { nodes, edges }
}
