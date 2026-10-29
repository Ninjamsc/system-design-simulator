import { AddNodeSection } from './AddNodeSection'
import { ConnectSection } from './ConnectSection'
import { LoadLegend } from './LoadLegend'
import { ProjectSection } from './ProjectSection'
import { SimulationSection } from './SimulationSection'
import { StatsSection } from './StatsSection'

export function Sidebar() {
  return (
    <aside className="left">
      <AddNodeSection />
      <ConnectSection />
      <ProjectSection />
      <SimulationSection />
      <StatsSection />
      <LoadLegend />
      <p className="keys">Click node or edge to configure · Drag a handle to connect · Wheel to zoom · Del · Ctrl+Z/Y · Ctrl+C/X/V · Ctrl+S</p>
    </aside>
  )
}
