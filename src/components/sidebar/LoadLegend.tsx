import { LOAD_LEGEND } from '@/assets/palette'

export function LoadLegend() {
  return (
    <section>
      <h3>Load</h3>
      {LOAD_LEGEND.map(([c, t]) => <div className="lg" key={t}><i style={{ background: c }} />{t}</div>)}
    </section>
  )
}
