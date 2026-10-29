import { useMemo, useRef, useState } from 'react'
import { useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import type { SEdge, SNode } from '@/models'
import { createInitialGraph } from '@/services/initialGraph'
import { toDisplayEdges, toDisplayNodes } from '@/services/presentation'
import { useConnectMode } from './useConnectMode'
import { useGraphActions } from './useGraphActions'
import { useHistory } from './useHistory'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import { useNotice } from './useNotice'
import { useSelection } from './useSelection'
import { useSimulation } from './useSimulation'

/** Composes graph state, history, actions, simulation and selection into the application store. */
export function useAppStore() {
  const initial = useMemo(createInitialGraph, [])
  const [nodes, setNodes, onNodesChange] = useNodesState<SNode>(initial.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<SEdge>(initial.edges)
  const rf = useReactFlow()
  const [running, setRunning] = useState(true)
  const [speed, setSpeed] = useState(1)

  const latest = useRef({ nodes, edges })
  latest.current = { nodes, edges }
  const history = useHistory(() => latest.current, (g) => { setNodes(g.nodes); setEdges(g.edges) })
  const { notice, notify } = useNotice()
  const actions = useGraphActions({ nodes, edges, setNodes, setEdges, history, rf, notify })
  const connectMode = useConnectMode(actions.connectNodes)
  useKeyboardShortcuts({ undo: history.undo, redo: history.redo, copy: actions.copy, cut: actions.cut, paste: actions.paste, save: actions.saveProject })

  const sim = useSimulation(nodes, edges, running)
  const selection = useSelection(nodes, edges)
  const nodeName = (id: string) => nodes.find((n) => n.id === id)?.data.name

  return {
    nodes, edges, onNodesChange, onEdgesChange,
    displayNodes: toDisplayNodes(nodes, sim),
    displayEdges: toDisplayEdges(nodes, edges, sim, running),
    sim, running, setRunning, speed, setSpeed,
    selection, nodeName, connectMode, history, notice,
    ...actions,
  }
}
export type Store = ReturnType<typeof useAppStore>
