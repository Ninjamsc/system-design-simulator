import { useRef } from 'react'
import type { Graph } from '@/models'
import { HistoryStack } from '@/services/history'

export function useHistory(getGraph: () => Graph, restore: (g: Graph) => void) {
  const stack = useRef(new HistoryStack())
  const last = useRef(0)
  return {
    /** Remember the current graph before a change. */
    push: () => stack.current.push(getGraph()),
    /** Like push, but a burst of rapid edits (typing) creates a single undo step. */
    burst: () => { if (Date.now() - last.current > 800) stack.current.push(getGraph()); last.current = Date.now() },
    undo: () => { const g = stack.current.undo(getGraph()); if (g) restore(g) },
    redo: () => { const g = stack.current.redo(getGraph()); if (g) restore(g) },
  }
}
export type History = ReturnType<typeof useHistory>
