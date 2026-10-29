import { useEffect } from 'react'
import { isTextInput } from '@/utils/dom'

type Handlers = { undo: () => void; redo: () => void; copy: () => void; cut: () => void; paste: () => void; save: () => void }

/** Ctrl/Cmd + Z, Shift+Z, Y, C, X, V, S (all but S are ignored while typing in a field). */
export function useKeyboardShortcuts(h: Handlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return
      const k = e.key.toLowerCase()
      if (k === 's') { e.preventDefault(); h.save(); return }
      if (isTextInput(e.target)) return
      if (k === 'z') { e.preventDefault(); e.shiftKey ? h.redo() : h.undo() }
      else if (k === 'y') { e.preventDefault(); h.redo() }
      else if (k === 'c') h.copy()
      else if (k === 'x') h.cut()
      else if (k === 'v') h.paste()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
}
