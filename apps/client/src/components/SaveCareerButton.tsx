import type { Career } from '../types'

type SaveCareerButtonProps = {
  career: Career
  isSaved: boolean
  loading?: boolean
  onToggle: (career: Career) => void | Promise<void>
}

export function SaveCareerButton({ career, isSaved, loading = false, onToggle }: SaveCareerButtonProps) {
  return (
    <button
      type="button"
      onClick={() => void onToggle(career)}
      aria-label={isSaved ? `Remove ${career.title} from saved careers` : `Save ${career.title} to saved careers`}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
        isSaved
          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
      } ${loading ? 'opacity-70' : ''}`}
    >
      <span aria-hidden="true">{isSaved ? '♥' : '♡'}</span>
      {isSaved ? 'Saved' : 'Save'}
    </button>
  )
}
