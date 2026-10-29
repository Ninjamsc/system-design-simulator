import { useStore } from '@/store/AppStore'
import { fmt, ms, pct } from '@/utils/format'
import { loadColor } from '@/utils/load'

export function StatsSection() {
  const { sim } = useStore()
  return (
    <section>
      <h3>Stats</h3>
      <div className="row"><span>Emit</span><b>{fmt(sim.emit)}/s</b></div>
      <div className="row"><span>Latency (path)</span><b>{sim.emit ? `${ms(sim.latency)} ms` : '—'}</b></div>
      <div className="row"><span>Latency (avg)</span><b>{sim.emit ? `${ms(sim.latencyAvg)} ms` : '—'}</b></div>
      <div className="row"><span>Peak load</span><b style={{ color: loadColor(sim.peak.load) }}>{pct(sim.peak.load)}</b></div>
      <div className="row"><span>Busiest</span><b className="ell" title={sim.peak.name}>{sim.peak.name}</b></div>
      <div className="row"><span>Errors</span><b className={sim.errors ? 'bad' : 'ok'}>{fmt(sim.errors)}/s</b></div>
      <div className="row"><span>Overloaded</span><b className={sim.over ? 'bad' : 'ok'}>{sim.over} nodes</b></div>
    </section>
  )
}
