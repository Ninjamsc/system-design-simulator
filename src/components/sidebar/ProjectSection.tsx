import { FolderOpen, Save } from 'lucide-react'
import { useStore } from '@/store/AppStore'

export function ProjectSection() {
  const { saveProject, importProject } = useStore()
  return (
    <section>
      <h3>Project</h3>
      <button className="it" onClick={saveProject} title="Save to a .json file (Ctrl+S)"><Save size={15} />Save Project</button>
      <button className="it" onClick={importProject} title="Load a project from a .json file"><FolderOpen size={15} />Import Project</button>
    </section>
  )
}
