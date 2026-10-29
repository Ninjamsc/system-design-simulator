import { useRef, type Dispatch, type SetStateAction } from 'react'
import type { ReactFlowInstance } from '@xyflow/react'
import { openTextFile, saveTextFile } from '@/client/file'
import { linkEdge, randomPointNearCenter, type LinkParams } from '@/client/flow'
import type { Clip, EdgeData, Kind, NData, SEdge, SNode } from '@/models'
import { copySelection, pasteClip } from '@/services/clipboard'
import { createInitialGraph } from '@/services/initialGraph'
import { cloneNode, createNode } from '@/services/nodeFactory'
import { parseProject, serializeProject } from '@/services/projectFile'
import { deselect } from '@/utils/graph'
import type { History } from './useHistory'
import type { Notify } from './useNotice'

type Args = {
  nodes: SNode[]; edges: SEdge[]
  setNodes: Dispatch<SetStateAction<SNode[]>>; setEdges: Dispatch<SetStateAction<SEdge[]>>
  history: History; rf: ReactFlowInstance; notify: Notify
}

/** All graph mutations. Every structural change records an undo step first. */
export function useGraphActions({ nodes, edges, setNodes, setEdges, history, rf, notify }: Args) {
  const clip = useRef<Clip | null>(null)

  const addNode = (kind: Kind) => { history.push(); setNodes((ns) => [...deselect(ns), createNode(kind, randomPointNearCenter(rf))]) }
  const editNode = (id: string, patch: Partial<NData>) => { history.burst(); setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))) }
  const editEdge = (id: string, patch: Partial<EdgeData>) => { history.burst(); setEdges((es) => es.map((e) => (e.id === id ? { ...e, data: { ...e.data, ...patch } as EdgeData } : e))) }

  const duplicateNode = (id: string) => {
    const n = nodes.find((x) => x.id === id)
    if (!n) return
    history.push(); setNodes((ns) => [...deselect(ns), cloneNode(n, 40, 60)])
  }
  const deleteNode = (id: string) => {
    history.push()
    setNodes((ns) => ns.filter((n) => n.id !== id))
    setEdges((es) => es.filter((e) => e.source !== id && e.target !== id))
  }
  const deleteSelected = () => {
    history.push()
    const ids = new Set(nodes.filter((n) => n.selected).map((n) => n.id))
    setNodes((ns) => ns.filter((n) => !ids.has(n.id)))
    setEdges((es) => es.filter((e) => !e.selected && !ids.has(e.source) && !ids.has(e.target)))
  }

  const copy = () => { clip.current = copySelection({ nodes, edges }) }
  const cut = () => { copy(); deleteSelected() }
  const paste = () => {
    if (!clip.current) return
    history.push()
    const r = pasteClip(clip.current)
    clip.current = r.next
    setNodes((ns) => [...deselect(ns), ...r.nodes]); setEdges((es) => [...es, ...r.edges])
  }

  const connectNodes = (p: LinkParams) => { history.push(); setEdges((es) => linkEdge(es, p)) }
  const reset = () => { history.push(); const g = createInitialGraph(); setNodes(g.nodes); setEdges(g.edges) }
  const clear = () => { history.push(); setNodes([]); setEdges([]) }
  const deselectAll = () => { setNodes(deselect); setEdges(deselect) }

  const saveProject = async () => {
    try {
      const name = `system-design-${new Date().toISOString().slice(0, 10)}.json`
      if (await saveTextFile(name, serializeProject({ nodes, edges }))) notify('Project saved')
    } catch { notify('Could not save the project.', 'error') }
  }
  const importProject = async () => {
    try {
      const file = await openTextFile()
      if (!file) return
      const g = parseProject(file.text)
      history.push(); setNodes(g.nodes); setEdges(g.edges)
      requestAnimationFrame(() => rf.fitView({ padding: 0.2 }))
      notify(`Imported “${file.name}” — ${g.nodes.length} nodes, ${g.edges.length} links`)
    } catch (e) { notify(e instanceof Error ? e.message : 'Could not import the file.', 'error') }
  }

  return { saveProject, importProject, addNode, editNode, editEdge, duplicateNode, deleteNode, deleteSelected, copy, cut, paste, connectNodes, reset, clear, deselectAll }
}
