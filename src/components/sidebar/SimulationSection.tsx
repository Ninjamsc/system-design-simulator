import { Eraser, Pause, Play, RotateCcw } from 'lucide-react'
import { useStore } from '@/store/AppStore'

export function SimulationSection() {
  const { running, setRunning, speed, setSpeed, reset, clear } = useStore()
  return (
    <section>
      <h3>Simulation</h3>
      <div className="ctl">
        <button className={`pause${running ? '' : ' play'}`} onClick={() => setRunning(!running)}>
          {running ? <Pause size={13} /> : <Play size={13} />}{running ? 'Pause' : 'Run'}
        </button>
        <button className="ic" aria-label="Reset" onClick={reset}><RotateCcw size={15} /></button>
        <button className="ic" aria-label="Clear canvas" onClick={clear}><Eraser size={15} /></button>
      </div>
      <div className="row"><span>Speed</span><span>{speed.toFixed(1)}s/tick</span></div>
      <input type="range" min="0.2" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} aria-label="Speed" />
    </section>
  )
}
