import { Link } from 'react-router-dom'
import type { RecommendationResult } from '../types'

type RecommendationCardProps = {
  result: RecommendationResult
  rank: number
}

function matchColor(percentage: number) {
  if (percentage >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (percentage >= 50) return 'bg-sky-50 text-sky-700 border-sky-200'
  if (percentage >= 25) return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-slate-50 text-slate-600 border-slate-200'
}

export function RecommendationCard({ result, rank }: RecommendationCardProps) {
  const { career, matchPercentage } = result

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {rank}
            </span>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{career.category}</p>
              <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
            </div>
          </div>
          <span className={`flex-none rounded-full border px-3 py-1 text-sm font-semibold ${matchColor(matchPercentage)}`}>
            {matchPercentage}% match
          </span>
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-600">{career.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {career.requiredSkills.slice(0, 4).map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Salary: {career.averageSalary}</span>
          <Link
            to={`/careers/${career._id}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
