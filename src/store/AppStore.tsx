import { createContext, useContext, type ReactNode } from 'react'
import { useAppStore, type Store } from '@/hooks/useAppStore'

const StoreContext = createContext<Store | null>(null)

/** Must be rendered inside <ReactFlowProvider>. */
export function AppStoreProvider({ children }: { children: ReactNode }) {
  return <StoreContext.Provider value={useAppStore()}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const s = useContext(StoreContext)
  if (!s) throw new Error('useStore must be used inside <AppStoreProvider>')
  return s
}
