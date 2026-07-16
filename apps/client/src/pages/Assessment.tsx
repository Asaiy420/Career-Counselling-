import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchActiveAssessment, submitAssessment } from '../api'
import type { Assessment, AssessmentAnswer } from '../types'

function AssessmentPage() {
  const navigate = useNavigate()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchActiveAssessment()
      .then((data) => {
        if (!cancelled) setAssessment(data)
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load the assessment. Please try again later.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const selectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const allAnswered = assessment
    ? assessment.questions.every((q) => Boolean(answers[q.questionId]))
    : false

  const handleSubmit = async () => {
    if (!assessment || !allAnswered) return

    setSubmitting(true)
    setError(null)

    try {
      const payload: AssessmentAnswer[] = Object.entries(answers).map(
        ([questionId, optionId]) => ({ questionId, optionId })
      )
      await submitAssessment(assessment._id, payload)
      navigate('/recommendations')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your answers. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center text-[var(--text)]">
          Loading assessment...
        </div>
      </div>
    )
  }

  if (error && !assessment) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>
        </div>
      </div>
    )
  }

  if (!assessment) return null

  const answeredCount = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-[var(--text-h)] mb-1">{assessment.title}</h1>
        <p className="text-[var(--text)] mb-2">{assessment.description}</p>
        <p className="text-sm text-[var(--text)] mb-6">
          {answeredCount} of {assessment.questions.length} answered
        </p>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
        )}

        <div className="space-y-6">
          {assessment.questions.map((question, index) => (
            <div key={question.questionId} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="mb-4 font-medium text-[var(--text-h)]">
                {index + 1}. {question.text}
              </p>
              <div className="space-y-2">
                {question.options.map((option) => {
                  const selected = answers[question.questionId] === option.optionId
                  return (
                    <label
                      key={option.optionId}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                        selected
                          ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
                          : 'border-[var(--border)] hover:bg-[var(--accent-bg)]/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.questionId}
                        value={option.optionId}
                        checked={selected}
                        onChange={() => selectAnswer(question.questionId, option.optionId)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-[var(--text-h)]">{option.text}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="mt-8 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? 'Submitting...' : 'Get my recommendations'}
        </button>
      </div>
    </div>
  )
}

export default AssessmentPage
