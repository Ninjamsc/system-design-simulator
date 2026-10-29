import type { Kind, NData } from './node'

export const BASE_DATA = { capacity: 1000, latency: 10, emit: 0, key: 0, ratio: 1, hit: 0.8, dead: false, text: '' }

export const KIND_DEFAULTS: Record<Kind, Partial<NData>> = {
  client: { emit: 1000, key: 42 },
  lb: { capacity: 10000, latency: 5 },
  api: { capacity: 2000, latency: 20, ratio: 0.5 },
  app: { capacity: 3000, latency: 15, ratio: 0.5 },
  redis: { capacity: 50000, latency: 1, hit: 0.8 },
  db: { capacity: 2000, latency: 10 },
  ws: { capacity: 5000, latency: 8 },
  chat: { capacity: 1500, latency: 25, ratio: 0.5 },
  note: { text: 'Note' },
}
