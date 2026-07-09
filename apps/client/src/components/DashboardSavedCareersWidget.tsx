import { Link } from 'react-router-dom'
import type { Career, DashboardSavedCareersSummary } from '../types'
import { SaveCareerButton } from './SaveCareerButton'

type DashboardSavedCareersWidgetProps = {
  summary: DashboardSavedCareersSummary | null
  loading: boolean
  onToggleSave: (career: Career) => void | Promise<void>
  isSaved: (careerId: string) => boolean
}

export function DashboardSavedCareersWidget({ summary, loading, onToggleSave, isSaved }: DashboardSavedCareersWidgetProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Saved careers</p>
          <h2 className="text-xl font-semibold text-slate-900">Your favorites</h2>
        </div>
        <Link to="/saved-careers" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          View all
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-16 rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : summary && summary.recent.length ? (
        <div className="space-y-3">
          {summary.recent.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900">{entry.career?.title ?? entry.careerId}</p>
                <p className="text-sm text-slate-600">{entry.career?.category ?? 'Saved career'}</p>
              </div>
              {entry.career ? <SaveCareerButton career={entry.career} isSaved={isSaved(entry.career.id)} onToggle={onToggleSave} /> : null}
            </div>
          ))}
          <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
            {summary.count} saved career{summary.count === 1 ? '' : 's'}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
          You have no saved careers yet. Save one from the careers list to see it here.
        </div>
      )}
    </section>
  )
}
