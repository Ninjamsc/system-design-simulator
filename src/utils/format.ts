export const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
export const ms = (n: number) => (n < 10 ? n.toFixed(1) : String(Math.round(n)))
export const pct = (n: number) => `${Math.round(n * 100)}%`
