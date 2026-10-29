import { Monitor, GitBranch, Server, Database, Radio, MessageSquare, Type, Zap, Boxes, type LucideIcon } from 'lucide-react'
import type { Kind } from '@/models'

export const KIND_ICONS: Record<Kind, LucideIcon> = {
  client: Monitor, lb: GitBranch, api: Server, app: Boxes, redis: Zap, db: Database, ws: Radio, chat: MessageSquare, note: Type,
}
