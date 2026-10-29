import { useStore } from '@/store/AppStore'

/** Short status message (save / import result or error). */
export function Toast() {
  const { notice } = useStore()
  return notice ? <div key={notice.id} className={`toast${notice.kind === 'error' ? ' error' : ''}`} role="status">{notice.text}</div> : null
}
