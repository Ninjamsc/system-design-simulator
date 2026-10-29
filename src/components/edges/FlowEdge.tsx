import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'
import type { SEdge } from '@/models'

/** Link with animated flow. Forward flows source→target, backward target→source, bidirectional draws two lanes. */
export function FlowEdge(p: EdgeProps<SEdge>) {
  const [path, lx, ly] = getBezierPath(p)
  const d = p.data
  const dir = d?.dir ?? 'forward', bi = dir === 'bidirectional', back = dir === 'backward'
  const async = d?.link === 'async'
  const base = `ep ${async ? 'async' : 'sync'}${d?.active ? ' act' : ''}`
  return (
    <>
      <BaseEdge id={p.id} path={path} className={base + (back ? ' rev' : '')}
        style={{ ...p.style, ...(bi ? { transform: 'translateY(-3.5px)' } : {}) }}
        markerEnd={p.markerEnd} markerStart={back ? p.markerStart : undefined} interactionWidth={24}
        label={async ? 'ASYNC' : 'SYNC'} labelX={lx} labelY={ly}
        labelStyle={{ fill: '#d4d4d4', fontSize: 10, fontWeight: 600 }} labelShowBg labelBgPadding={[4, 2]} labelBgBorderRadius={3}
        labelBgStyle={{ fill: '#0a0a0c', fillOpacity: 0.9 }} />
      {bi && <path d={path} className={`react-flow__edge-path ${base} rev`} style={{ ...p.style, transform: 'translateY(3.5px)', pointerEvents: 'none' }} markerStart={p.markerStart} />}
    </>
  )
}
