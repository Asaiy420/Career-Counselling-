import { Link } from 'react-router-dom'
import { SaveCareerButton } from './SaveCareerButton'
import type { Career } from '../types'

type CareerCardProps = {
  career: Career
  isSaved: boolean
  onToggleSave: (career: Career) => void | Promise<void>
}

export function CareerCard({ career, isSaved, onToggleSave }: CareerCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{career.category}</p>
            <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
          </div>
          <SaveCareerButton career={career} isSaved={isSaved} onToggle={onToggleSave} />
        </div>
        <p className="mb-4 text-sm leading-6 text-slate-600">{career.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {career.requiredSkills.map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Salary: {career.averageSalary}</span>
          <Link to={`/careers/${career._id}`} className="font-semibold text-sky-600 hover:text-sky-700">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
