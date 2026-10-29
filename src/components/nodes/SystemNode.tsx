import { Handle, Position, type NodeProps } from '@xyflow/react'
import { LOAD } from '@/assets/palette'
import { KIND_META } from '@/assets/nodeKinds'
import type { SNode } from '@/models'
import { fmt, ms, pct } from '@/utils/format'
import { loadColor, loadOf } from '@/utils/load'
import { NodeActions } from './NodeActions'

const HANDLES = [['t', Position.Top], ['b', Position.Bottom], ['l', Position.Left], ['r', Position.Right]] as const

export function SystemNode({ id, data: d, selected }: NodeProps<SNode>) {
  const meta = KIND_META[d.kind], Icon = meta.icon
  const inn = d.inn ?? 0
  const load = loadOf(d, inn)
  const over = load > 1 && !d.dead
  const dot = d.dead ? LOAD.idle : d.kind === 'client' ? LOAD.ok : loadColor(load)
  return (
    <div className={`node${selected ? ' sel' : ''}${over ? ' over' : ''}${d.dead ? ' dead' : ''}`}
      style={{ ['--c' as string]: meta.color, ['--bg' as string]: meta.bg }}>
      <NodeActions id={id} />
      <div className="nh"><Icon size={17} />{d.name}<i className="dot" style={{ background: dot }} /></div>

      {d.kind === 'client' && (<>
        <div className="nr"><span>emit</span><b>{fmt(d.emit)}/s</b></div>
        <div className="nr"><span>key</span><b>{d.key}</b></div>
        <div className="nr"><span>path latency</span><b>{ms(d.e2e ?? 0)} ms</b></div>
        <div className="nr"><span>avg latency</span><b>{ms(d.avg ?? 0)} ms</b></div>
      </>)}

      {d.kind === 'note' && <div className="note">{d.text}</div>}

      {d.kind !== 'client' && d.kind !== 'note' && (<>
        <div className="nr"><span>in</span><b>{fmt(inn)}<em>/{fmt(d.capacity)}</em></b></div>
        <div className="bar"><div style={{ width: `${Math.min(100, load * 100)}%`, background: loadColor(load) }} /></div>
        {d.kind === 'redis' && <div className="nr sm"><span>hit ratio</span><b>{pct(d.hit)}</b></div>}
        <div className="nr sm">
          <span>{ms(d.lat ?? d.latency)} ms{d.lat !== undefined && Math.abs(d.lat - d.latency) > 0.05 ? <em> (base {d.latency})</em> : null}</span>
          {d.dead && <span className="killed">killed</span>}
        </div>
      </>)}

      {d.kind !== 'note' && HANDLES.map(([hid, pos]) => <Handle key={hid} id={hid} type="source" position={pos} />)}
    </div>
  )
}
