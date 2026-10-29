import { LOAD } from '@/assets/palette'
import type { NData } from '@/models'

/** <50% green, 50–80% yellow, 80–99% orange, ≥100% red. */
export const loadColor = (l: number) => (l >= 1 ? LOAD.over : l >= 0.8 ? LOAD.high : l >= 0.5 ? LOAD.warn : LOAD.ok)
export const isPassive = (d: NData) => d.kind === 'client' || d.kind === 'note'
export const loadOf = (d: NData, inn: number) => (isPassive(d) ? 0 : inn / Math.max(1, d.capacity))
