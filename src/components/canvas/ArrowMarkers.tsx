import { MARKER_COLORS } from '@/assets/palette'
import { markerId } from '@/utils/graph'

/** Sharp arrow heads, one per link colour; `auto-start-reverse` lets the same marker serve both ends. */
export function ArrowMarkers() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {MARKER_COLORS.map((c) => (
          <marker key={c} id={markerId(c)} viewBox="0 0 11 8" refX="9.5" refY="4" markerWidth="22" markerHeight="16" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,.6 L11,4 L0,7.4 L2.4,4 Z" fill={c} />
          </marker>
        ))}
      </defs>
    </svg>
  )
}
