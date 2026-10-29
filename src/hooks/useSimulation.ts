import { useMemo, useRef } from 'react'
import type { SEdge, SNode, Sim } from '@/models'
import { simulate } from '@/services/simulation'

/** Live simulation result; frozen at the last value while paused. */
export function useSimulation(nodes: SNode[], edges: SEdge[], running: boolean): Sim {
  const live = useMemo(() => simulate(nodes, edges), [nodes, edges])
  const frozen = useRef(live)
  if (running) frozen.current = live
  return frozen.current
}
