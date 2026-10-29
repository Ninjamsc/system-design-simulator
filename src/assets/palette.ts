/** Load colours shared by links, node load bars and the legend. */
export const LOAD = { ok: '#22c55e', warn: '#eab308', high: '#f97316', over: '#ef4444', idle: '#525252' } as const

export const LOAD_LEGEND: [string, string][] = [
  [LOAD.ok, '< 50%'], [LOAD.warn, '50–80%'], [LOAD.high, '80–99%'], [LOAD.over, '≥ 100%'],
]

export const MARKER_COLORS: string[] = Object.values(LOAD)
