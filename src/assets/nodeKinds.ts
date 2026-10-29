import type { LucideIcon } from 'lucide-react'
import type { Kind } from '@/models'
import { KIND_ICONS } from './icons'

/** Visual identity of every node type. Object order = order in the "Add node" menu. */
export const KIND_META: Record<Kind, { label: string; icon: LucideIcon; color: string; bg: string }> = {
  client: { label: 'Client', icon: KIND_ICONS.client, color: '#3b6fd4', bg: '#0f1d4a' },
  lb: { label: 'Load Balancer', icon: KIND_ICONS.lb, color: '#a855f7', bg: '#2a1248' },
  api: { label: 'API GW', icon: KIND_ICONS.api, color: '#16a34a', bg: '#0a2a20' },
  app: { label: 'Application Service', icon: KIND_ICONS.app, color: '#84cc16', bg: '#1c2a08' },
  redis: { label: 'Redis', icon: KIND_ICONS.redis, color: '#dc382d', bg: '#3a1210' },
  db: { label: 'Database', icon: KIND_ICONS.db, color: '#b8860b', bg: '#2e1608' },
  ws: { label: 'WS Gateway', icon: KIND_ICONS.ws, color: '#06b6d4', bg: '#082c36' },
  chat: { label: 'Chat API', icon: KIND_ICONS.chat, color: '#ec4899', bg: '#3a0f2a' },
  note: { label: 'Text Note', icon: KIND_ICONS.note, color: '#d97706', bg: '#2e1e08' },
}

export const KIND_ORDER = Object.keys(KIND_META) as Kind[]
