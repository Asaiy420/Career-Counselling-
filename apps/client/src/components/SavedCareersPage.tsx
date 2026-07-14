import { Link } from 'react-router-dom'
import type { Career } from '../types'
import { SaveCareerButton } from './SaveCareerButton'

type SavedCareersPageProps = {
  careers: Array<Career & { createdAt?: string; image?: string }>
  loading: boolean
  error: string | null
  onRemove: (careerId: string) => void | Promise<void>
  onToggleSave: (career: Career) => void | Promise<void>
  isSaved: (careerId: string) => boolean
}

export function SavedCareersPage({ careers, loading, error, onRemove, onToggleSave, isSaved }: SavedCareersPageProps) {
  if (loading) {
    return (
      <section className="space-y-4">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-4 w-24 rounded bg-slate-200" />
              <div className="mb-2 h-6 w-40 rounded bg-slate-200" />
              <div className="h-20 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>
  }

  if (!careers.length) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h2 className="mb-3 text-2xl font-semibold text-slate-900">No saved careers yet</h2>
        <p className="mb-6 text-slate-600">Bookmark careers you like and they’ll appear here for quick access later.</p>
        <Link to="/" className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
          Browse careers
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Saved careers</p>
          <h2 className="text-3xl font-semibold text-slate-900">Your shortlist</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {careers.map((career) => (
          <article key={career._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            {career.image ? <img src={career.image} alt="" className="h-40 w-full object-cover" /> : null}
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{career.category}</p>
                  <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
                </div>
                <SaveCareerButton career={career} isSaved={isSaved(career._id)} onToggle={onToggleSave} />
              </div>
              <p className="mb-4 text-sm leading-6 text-slate-600">{career.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {career.requiredSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                <span>Salary: {career.averageSalary}</span>
                <span>{career.createdAt ? new Date(career.createdAt).toLocaleDateString() : ''}</span>
              </div>
              <div className="flex gap-3">
                <Link to={`/careers/${career._id}`} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                  View details
                </Link>
                <button type="button" onClick={() => void onRemove(career._id)} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
