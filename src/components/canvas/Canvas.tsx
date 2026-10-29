import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react'
import { KIND_META } from '@/assets/nodeKinds'
import { FLOW_PROPS } from '@/client/flow'
import type { Kind, SEdge, SNode } from '@/models'
import { useStore } from '@/store/AppStore'
import { FlowEdge } from '../edges/FlowEdge'
import { SystemNode } from '../nodes/SystemNode'
import { ArrowMarkers } from './ArrowMarkers'
import { StatusPill } from './StatusPill'
import { Toast } from './Toast'

const nodeTypes = { sys: SystemNode }
const edgeTypes = { flow: FlowEdge }

export function Canvas() {
  const s = useStore()
  return (
    <main>
      <ArrowMarkers />
      <ReactFlow<SNode, SEdge> {...FLOW_PROPS} nodes={s.displayNodes} edges={s.displayEdges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
        onNodesChange={s.onNodesChange} onEdgesChange={s.onEdgesChange}
        onConnect={(c) => s.connectNodes(c)} onNodeDragStart={() => s.history.push()} onNodeClick={s.connectMode.onNodeClick}
        onBeforeDelete={async () => { s.history.push(); return true }}>
        <Background gap={22} size={1} color="#1f1f26" />
        <Controls />
        <MiniMap pannable zoomable nodeColor={(n) => KIND_META[(n.data as { kind: Kind }).kind].color} maskColor="rgba(10,10,12,.7)" style={{ width: 200, height: 150 }} />
      </ReactFlow>
      <StatusPill />
      <Toast />
    </main>
  )
}
