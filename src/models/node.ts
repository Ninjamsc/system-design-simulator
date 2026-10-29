export type Kind = 'client' | 'lb' | 'api' | 'app' | 'redis' | 'db' | 'ws' | 'chat' | 'note'

export type NData = {
  kind: Kind
  name: string
  capacity: number // requests per second the node can serve
  latency: number  // base latency, ms
  emit: number     // client: requests per second
  key: number      // client: request key
  ratio: number    // api / app / chat: fraction of requests sent to DB / Redis
  hit: number      // redis: cache hit ratio
  dead: boolean
  text: string     // note
  // Injected by the simulation for display only:
  inn?: number     // incoming load, req/s
  lat?: number     // effective (load-adjusted) latency, ms
  e2e?: number     // client: sum of latencies on the slowest sync path, ms
  avg?: number     // client: probability-weighted average latency, ms
}
