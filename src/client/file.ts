/** Browser file access: save-as dialog (when supported) with download fallback, and a file picker. */

export async function saveTextFile(suggestedName: string, text: string, mime = 'application/json'): Promise<boolean> {
  const w = window as any
  if (w.showSaveFilePicker) {
    try {
      const handle = await w.showSaveFilePicker({ suggestedName, types: [{ description: 'System Design project', accept: { [mime]: ['.json'] } }] })
      const stream = await handle.createWritable()
      await stream.write(text)
      await stream.close()
      return true
    } catch (e: any) {
      if (e?.name === 'AbortError') return false // user cancelled
      // otherwise fall back to a normal download
    }
  }
  const url = URL.createObjectURL(new Blob([text], { type: mime }))
  const a = document.createElement('a')
  a.href = url; a.download = suggestedName
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}

/** Opens a file picker and reads the chosen file as text. Resolves null if the dialog is cancelled. */
export function openTextFile(accept = '.json,application/json'): Promise<{ name: string; text: string } | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = accept
    input.onchange = async () => {
      const f = input.files?.[0]
      if (!f) return resolve(null)
      try { resolve({ name: f.name, text: await f.text() }) } catch (e) { reject(e) }
    }
    input.oncancel = () => resolve(null)
    input.click()
  })
}
