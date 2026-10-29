import { Activity } from 'lucide-react'

export function Header() {
  return (
    <header>
      <div className="logo"><Activity size={18} /></div>
      <div>
        <h1>System Design Simulator</h1>
        <p>Design and simulate request load across distributed architectures — LBs, APIs, and databases with sharding</p>
      </div>
    </header>
  )
}
