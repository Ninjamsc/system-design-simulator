export type Sim = {
  in: Record<string, number>    // incoming load per node
  flow: Record<string, number>  // traffic per link
  lat: Record<string, number>   // effective per-node latency (ms), grows with load
  e2e: Record<string, number>   // per client: sum of node latencies on the slowest sync path (ms)
  avg: Record<string, number>   // per client: average over all sync paths (ms)
  latency: number               // emit-weighted slowest path over clients (ms)
  latencyAvg: number            // emit-weighted average over clients (ms)
  emit: number
  errors: number
  over: number
  peak: { load: number; name: string }
}
