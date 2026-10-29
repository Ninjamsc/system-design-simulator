import { createRoot } from 'react-dom/client'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import '@/styles/index.css'
import { AppStoreProvider } from '@/store/AppStore'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ReactFlowProvider>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </ReactFlowProvider>
)
