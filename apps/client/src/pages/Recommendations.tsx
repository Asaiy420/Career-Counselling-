import { Link } from 'react-router-dom'
import { useRecommendations } from '../hooks/useRecommendations'
import { RecommendationCard } from '../components/RecommendationCard'

function RecommendationsPage() {
  const { recommendations, submittedAt, topCategories, loading, error, hasTakenAssessment } =
    useRecommendations()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Recommendations</p>
            <h1 className="text-3xl font-semibold text-[var(--text-h)]">Careers matched to you</h1>
          </div>
          <Link
            to="/assessment"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-h)] hover:bg-[var(--accent-bg)]"
          >
            {hasTakenAssessment ? 'Retake assessment' : 'Take the assessment'}
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-40 rounded-3xl border border-[var(--border)] bg-slate-100" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>
        ) : !hasTakenAssessment ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">You haven't taken the assessment yet</h2>
            <p className="mb-6 text-slate-600">
              Answer a few questions about your interests and strengths, and we'll match you to careers that fit.
            </p>
            <Link
              to="/assessment"
              className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Start the assessment
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Your summary</p>
              <p className="mt-1 text-[var(--text-h)]">
                {topCategories.length
                  ? `Your responses show the strongest alignment with ${topCategories.join(' and ')}.`
                  : 'Your responses didn\u2019t strongly favor a single field — here are some broad options to explore.'}
                {' '}
                {recommendations.length > 0 && (
                  <>
                    Your top match is{' '}
                    <span className="font-semibold">{recommendations[0].career.title}</span> at{' '}
                    <span className="font-semibold">{recommendations[0].matchPercentage}%</span>.
                  </>
                )}
              </p>
              {submittedAt && (
                <p className="mt-2 text-xs text-slate-500">
                  Based on your assessment from {new Date(submittedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {recommendations.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
                We couldn't generate recommendations from those answers. Try retaking the assessment.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {recommendations.map((result, index) => (
                  <RecommendationCard key={result.career._id} result={result} rank={index + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default RecommendationsPage
