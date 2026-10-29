import { useState } from 'react'
import type { LinkParams } from '@/client/flow'

/** "Connect Mode": click a source node, then a target node. */
export function useConnectMode(connect: (p: LinkParams) => void) {
  const [on, setOn] = useState(false)
  const [pending, setPending] = useState<string | null>(null)
  return {
    on, pending,
    toggle: () => { setOn(!on); setPending(null) },
    onNodeClick: (_: unknown, n: { id: string }) => {
      if (!on) return
      if (pending && pending !== n.id) { connect({ source: pending, target: n.id, sourceHandle: 'r', targetHandle: 'l' }); setPending(null) }
      else setPending(n.id)
    },
  }
}
