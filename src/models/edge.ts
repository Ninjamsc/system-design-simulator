export type FlowDir = 'forward' | 'backward' | 'bidirectional'
export type LinkType = 'sync' | 'async'

export type EdgeData = {
  weight: number
  dir?: FlowDir
  link?: LinkType
  active?: boolean // injected for display only
}
