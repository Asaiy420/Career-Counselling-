import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCareerById } from '../api'
import type { Career } from '../types'
import { SaveCareerButton } from '../components/SaveCareerButton'
import { useSavedCareers } from '../hooks/useSavedCareers'

function CareerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isSaved, toggleSave } = useSavedCareers()

  useEffect(() => {
    if (!id) return
    let cancelled = false

    setLoading(true)
    fetchCareerById(id)
      .then((data) => {
        if (!cancelled) setCareer(data)
      })
      .catch(() => {
        if (!cancelled) setError('Career not found.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center text-[var(--text)]">Loading...</div>
      </div>
    )
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error ?? 'Career not found.'}
          </div>
          <Link to="/careers" className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700">
            &larr; Back to careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/careers" className="mb-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700">
          &larr; Back to careers
        </Link>

        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{career.category}</p>
            <h1 className="text-3xl font-semibold text-[var(--text-h)]">{career.title}</h1>
          </div>
          <SaveCareerButton career={career} isSaved={isSaved(career._id)} onToggle={toggleSave} />
        </div>

        <p className="mb-6 leading-7 text-[var(--text)]">{career.description}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average salary</p>
            <p className="mt-1 font-medium text-[var(--text-h)]">{career.averageSalary}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Education required</p>
            <p className="mt-1 font-medium text-[var(--text-h)]">{career.educationRequired}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Growth outlook</p>
            <p className="mt-1 font-medium text-[var(--text-h)]">{career.growthOutlook}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Work environment</p>
            <p className="mt-1 font-medium text-[var(--text-h)]">{career.workEnvironment}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Required skills</p>
          <div className="flex flex-wrap gap-2">
            {career.requiredSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetailPage
