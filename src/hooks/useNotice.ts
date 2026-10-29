import { useEffect, useState } from 'react'

export type Notice = { id: number; text: string; kind: 'ok' | 'error' }

/** A short-lived message (auto-hides after 3.5 s). */
export function useNotice() {
  const [notice, setNotice] = useState<Notice | null>(null)
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 3500)
    return () => clearTimeout(t)
  }, [notice])
  const notify = (text: string, kind: Notice['kind'] = 'ok') => setNotice({ id: Date.now(), text, kind })
  return { notice, notify }
}
export type Notify = ReturnType<typeof useNotice>['notify']
