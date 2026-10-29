import type { Graph } from '@/models'

/** Undo / redo stacks of graph snapshots. */
export class HistoryStack {
  private past: Graph[] = []
  private future: Graph[] = []
  constructor(private limit = 100) {}

  push(g: Graph) {
    this.past.push(structuredClone(g))
    this.future = []
    if (this.past.length > this.limit) this.past.shift()
  }
  undo(current: Graph): Graph | null {
    const s = this.past.pop()
    if (!s) return null
    this.future.push(structuredClone(current))
    return s
  }
  redo(current: Graph): Graph | null {
    const s = this.future.pop()
    if (!s) return null
    this.past.push(structuredClone(current))
    return s
  }
}
