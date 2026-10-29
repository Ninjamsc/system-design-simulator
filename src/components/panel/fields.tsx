import { clamp } from '@/utils/math'

type NumberProps = { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; bounded?: boolean; hint?: string }

/** Labelled number input. With `bounded`, the typed value is clamped to [min, max]. */
export function NumberField({ label, value, onChange, min, max, step, bounded, hint }: NumberProps) {
  return (
    <label>{label}
      <input type="number" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(bounded ? clamp(+e.target.value, min ?? -Infinity, max ?? Infinity) : +e.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  )
}

export function TextField({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label>{label}
      {multiline ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  )
}

export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="sw"><span>{label}</span>
      <button role="switch" aria-checked={checked} aria-label={label} className={checked ? 'on' : ''} onClick={() => onChange(!checked)}><i /></button>
    </div>
  )
}

type SegProps<T extends string> = { id: string; label: string; options: [T, string][]; value: T; onChange: (v: T) => void }

export function Segmented<T extends string>({ id, label, options, value, onChange }: SegProps<T>) {
  return (
    <>
      <div className="sl" id={id}>{label}</div>
      <div className={`seg${options.length === 2 ? ' two' : ''}`} role="radiogroup" aria-labelledby={id}>
        {options.map(([v, t]) => (
          <button key={v} role="radio" aria-checked={value === v} className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{t}</button>
        ))}
      </div>
    </>
  )
}
