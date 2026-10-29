import { Canvas } from '@/components/canvas/Canvas'
import { Header } from '@/components/Header'
import { ConfigPanel } from '@/components/panel/ConfigPanel'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { useStore } from '@/store/AppStore'

export default function App() {
  const { speed } = useStore()
  return (
    <div className="app" style={{ ['--dur' as string]: `${0.35 + speed * 0.65}s` }}>
      <Header />
      <div className="body">
        <Sidebar />
        <Canvas />
        <ConfigPanel />
      </div>
    </div>
  )
}
