import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchActiveAssessment, submitAssessment, fetchAssessmentStatus } from '../api'
import type { Assessment, AssessmentAnswer } from '../types'
import '../styles/assessment.css'

/* ── Category emoji map ──────────────────────────────────────── */
const CATEGORY_ICONS: Record<string, string> = {
  Technology:      '💻',
  Healthcare:      '🏥',
  Engineering:     '⚙️',
  'Arts & Design': '🎨',
  Business:        '📊',
  Science:         '🔬',
  Marketing:       '📣',
  Legal:           '⚖️',
  Education:       '📚',
  Finance:         '💰',
}

/* Derive a display category from the question's option weights */
function deriveCategory(question: Assessment['questions'][0]): string {
  const tallied: Record<string, number> = {}
  for (const opt of question.options) {
    for (const [cat, w] of Object.entries(opt.categoryWeights ?? {})) {
      tallied[cat] = (tallied[cat] ?? 0) + Number(w)
    }
  }
  const sorted = Object.entries(tallied).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] ?? 'General'
}

/* Option letter: A, B, C, D … */
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

/* ── Confirmation screen ─────────────────────────────────────── */
function ConfirmationScreen({ onViewResults }: { onViewResults: () => void }) {
  return (
    <div className="asmnt-page">
      <div className="asmnt-container">
        <div className="asmnt-confirm">
          <div className="asmnt-confirm-icon" aria-hidden="true">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="asmnt-confirm-title">Assessment Complete! 🎉</h1>
          <p className="asmnt-confirm-sub">
            Great job! We've analysed your responses and matched you to careers that align
            with your interests and strengths. Your personalised results are ready.
          </p>
          <div className="asmnt-confirm-actions">
            <button
              id="view-results-btn"
              type="button"
              onClick={onViewResults}
              className="asmnt-btn asmnt-btn--primary"
            >
              View my career matches
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <Link to="/dashboard" className="asmnt-btn asmnt-btn--ghost">
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */
function AssessmentPage() {
  const navigate = useNavigate()

  const [assessment, setAssessment]       = useState<Assessment | null>(null)
  const [answers, setAnswers]             = useState<Record<string, string>>({})
  const [currentIndex, setCurrentIndex]   = useState(0)
  const [loading, setLoading]             = useState(true)
  const [submitting, setSubmitting]       = useState(false)
  const [error, setError]                 = useState<string | null>(null)
  const [validationError, setValidationError] = useState(false)
  const [submitted, setSubmitted]         = useState(false)
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false)
  const [previousDate, setPreviousDate]   = useState<string | null>(null)

  /* ── Fetch assessment + status ─────────────────────────────── */
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const token = localStorage.getItem('token')

        const [data, status] = await Promise.all([
          fetchActiveAssessment(),
          token ? fetchAssessmentStatus().catch(() => null) : Promise.resolve(null),
        ])

        if (!cancelled) {
          setAssessment(data)
          if (status?.hasSubmitted) {
            setHasSubmittedBefore(true)
            setPreviousDate(status.submittedAt ?? null)
          }
        }
      } catch {
        if (!cancelled) setError('Unable to load the assessment. Please try again later.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [])

  /* ── Answer selection ──────────────────────────────────────── */
  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
    setValidationError(false)
  }, [])

  /* ── Navigation ────────────────────────────────────────────── */
  const goTo = useCallback((index: number) => {
    if (!assessment) return
    const clamped = Math.max(0, Math.min(index, assessment.questions.length - 1))
    setCurrentIndex(clamped)
    setValidationError(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [assessment])

  const handleNext = useCallback(() => {
    if (!assessment) return
    const question = assessment.questions[currentIndex]
    if (!question) return

    if (!answers[question.questionId]) {
      setValidationError(true)
      return
    }

    setValidationError(false)
    if (currentIndex < assessment.questions.length - 1) {
      goTo(currentIndex + 1)
    }
  }, [assessment, currentIndex, answers, goTo])

  const handlePrev = useCallback(() => {
    goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  /* ── Submission ────────────────────────────────────────────── */
  const handleSubmit = useCallback(async () => {
    if (!assessment) return

    // Validate all questions answered
    const unanswered = assessment.questions.filter(q => !answers[q.questionId])
    if (unanswered.length > 0) {
      // Jump to first unanswered
      const firstUnansweredIndex = assessment.questions.findIndex(q => !answers[q.questionId])
      goTo(firstUnansweredIndex)
      setValidationError(true)
      setError(`Please answer question ${firstUnansweredIndex + 1} before submitting.`)
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const payload: AssessmentAnswer[] = Object.entries(answers).map(
        ([questionId, optionId]) => ({ questionId, optionId })
      )
      await submitAssessment(assessment._id, payload)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your answers. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }, [assessment, answers, goTo])

  /* ── Loading state ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="asmnt-page">
        <div className="asmnt-topbar">
          <div className="asmnt-topbar-inner">
            <div className="asmnt-skeleton" style={{ width: 80, height: 32 }} />
            <div style={{ flex: 1 }}>
              <div className="asmnt-skeleton" style={{ width: 160, height: 14, marginBottom: 6 }} />
              <div className="asmnt-skeleton" style={{ width: 100, height: 11 }} />
            </div>
          </div>
        </div>
        <div className="asmnt-container">
          <div className="asmnt-skeleton" style={{ height: 120, marginBottom: 24 }} />
          <div className="asmnt-skeleton" style={{ height: 320 }} />
        </div>
      </div>
    )
  }

  /* ── Error (no assessment found) ───────────────────────────── */
  if (error && !assessment) {
    return (
      <div className="asmnt-page">
        <div className="asmnt-container" style={{ paddingTop: 60 }}>
          <div className="asmnt-error" role="alert">
            <span aria-hidden="true">⚠️</span>
            {error}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/dashboard" className="asmnt-btn asmnt-btn--ghost">
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!assessment) return null

  /* ── Submitted confirmation ────────────────────────────────── */
  if (submitted) {
    return <ConfirmationScreen onViewResults={() => navigate('/recommendations')} />
  }

  /* ── Main assessment UI ────────────────────────────────────── */
  const totalQuestions    = assessment.questions.length
  const answeredCount     = Object.keys(answers).length
  const progressPercent   = Math.round((answeredCount / totalQuestions) * 100)
  const currentQuestion   = assessment.questions[currentIndex]!
  const isLastQuestion    = currentIndex === totalQuestions - 1
  const allAnswered       = answeredCount === totalQuestions
  const currentCategory   = deriveCategory(currentQuestion)
  const categoryIcon      = CATEGORY_ICONS[currentCategory] ?? '🎯'
  const currentAnswered   = Boolean(answers[currentQuestion.questionId])

  return (
    <div className="asmnt-page">
      {/* ── Sticky top bar ─────────────────────────────────── */}
      <div className="asmnt-topbar" role="banner">
        <div className="asmnt-topbar-inner">
          <Link to="/dashboard" className="asmnt-back-btn" aria-label="Back to dashboard">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>

          <div className="asmnt-topbar-meta">
            <p className="asmnt-topbar-title">{assessment.title}</p>
            <p className="asmnt-topbar-sub">
              {answeredCount} of {totalQuestions} answered · {progressPercent}% complete
            </p>
          </div>

          <span className="asmnt-question-counter" aria-live="polite">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* ── Progress bar ──────────────────────────────────── */}
        <div
          className="asmnt-progress-wrap"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${progressPercent}% of assessment completed`}
        >
          <div
            className="asmnt-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="asmnt-container">

        {/* ── Hero (shown only on first question) ──────────── */}
        {currentIndex === 0 && (
          <div className="asmnt-hero" aria-label="Assessment introduction">
            <div className="asmnt-hero-badge">
              <span aria-hidden="true">✦</span>
              Career Interest Assessment
            </div>
            <h1 className="asmnt-hero-title">Discover Your Ideal Career Path</h1>
            <p className="asmnt-hero-desc">
              Answer {totalQuestions} quick questions and we'll match you to careers that
              align with your interests, strengths, and personality.
            </p>
          </div>
        )}

        {/* ── Retake banner ─────────────────────────────────── */}
        {hasSubmittedBefore && currentIndex === 0 && (
          <div className="asmnt-retake-banner" role="status">
            <div className="asmnt-retake-banner-icon" aria-hidden="true">⚡</div>
            <div className="asmnt-retake-banner-text">
              <p className="asmnt-retake-banner-title">You're retaking the assessment</p>
              <p className="asmnt-retake-banner-sub">
                {previousDate
                  ? `Last completed on ${new Date(previousDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'Your previous results will be updated with your new answers.'}
              </p>
            </div>
          </div>
        )}

        {/* ── Question card ─────────────────────────────────── */}
        <article
          key={currentQuestion.questionId}
          className="asmnt-question-card"
          aria-label={`Question ${currentIndex + 1}`}
        >
          {/* Category tag */}
          <div className="asmnt-category-label" aria-label={`Category: ${currentCategory}`}>
            <span aria-hidden="true">{categoryIcon}</span>
            {currentCategory}
          </div>

          <p className="asmnt-question-num" aria-hidden="true">
            Question {currentIndex + 1} of {totalQuestions}
          </p>

          <h2 className="asmnt-question-text" id={`q-label-${currentQuestion.questionId}`}>
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div
            className="asmnt-options"
            role="radiogroup"
            aria-labelledby={`q-label-${currentQuestion.questionId}`}
          >
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.questionId] === option.optionId
              return (
                <label
                  key={option.optionId}
                  className={`asmnt-option${isSelected ? ' selected' : ''}`}
                  htmlFor={`opt-${option.optionId}`}
                >
                  <input
                    type="radio"
                    id={`opt-${option.optionId}`}
                    name={currentQuestion.questionId}
                    value={option.optionId}
                    checked={isSelected}
                    onChange={() => selectAnswer(currentQuestion.questionId, option.optionId)}
                    aria-label={option.text}
                  />
                  {/* Custom radio indicator */}
                  <span className="asmnt-radio-indicator" aria-hidden="true">
                    <span className="asmnt-radio-dot" />
                  </span>
                  {/* Letter badge */}
                  <span className="asmnt-option-letter" aria-hidden="true">
                    {LETTERS[idx] ?? String.fromCharCode(65 + idx)}
                  </span>
                  <span className="asmnt-option-text">{option.text}</span>
                </label>
              )
            })}
          </div>
        </article>

        {/* ── Validation warning ────────────────────────────── */}
        {validationError && !currentAnswered && (
          <div className="asmnt-validation-warning" role="alert" aria-live="assertive">
            <span aria-hidden="true" style={{ fontSize: 16 }}>⚠️</span>
            <span>Please select an answer before continuing.</span>
          </div>
        )}

        {/* ── Submission error ──────────────────────────────── */}
        {error && (
          <div className="asmnt-error" role="alert">
            <span aria-hidden="true">⚠️</span>
            {error}
          </div>
        )}

        {/* ── Prev / Next / Submit navigation ──────────────── */}
        <nav className="asmnt-nav" aria-label="Question navigation">
          {/* Previous */}
          <button
            id="prev-question-btn"
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="asmnt-btn asmnt-btn--ghost"
            aria-label="Previous question"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Previous
          </button>

          {/* Next OR Submit */}
          {isLastQuestion ? (
            <button
              id="submit-assessment-btn"
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="asmnt-btn asmnt-btn--submit"
              aria-label="Submit assessment and get results"
            >
              {submitting ? (
                <>
                  <svg
                    style={{ animation: 'spin 1s linear infinite' }}
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Analysing your answers…
                </>
              ) : (
                <>
                  {allAnswered ? '✓ Get My Career Matches' : 'Submit Assessment'}
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              id="next-question-btn"
              type="button"
              onClick={handleNext}
              className="asmnt-btn asmnt-btn--primary"
              aria-label="Next question"
            >
              Next
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          )}
        </nav>

        {/* ── Progress dots ──────────────────────────────────── */}
        <div className="asmnt-dot-row" role="list" aria-label="Question progress">
          {assessment.questions.map((q, idx) => {
            const isAnswered = Boolean(answers[q.questionId])
            const isCurrent  = idx === currentIndex
            return (
              <button
                key={q.questionId}
                type="button"
                role="listitem"
                className={`asmnt-dot${isAnswered ? ' answered' : ''}${isCurrent ? ' current' : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to question ${idx + 1}${isAnswered ? ' (answered)' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={`Question ${idx + 1}${isAnswered ? ' ✓' : ''}`}
              />
            )
          })}
        </div>

        {/* ── Skip hint ─────────────────────────────────────── */}
        <p className="asmnt-skip-hint">
          Click a dot to jump to any question •{' '}
          {allAnswered
            ? '✓ All questions answered — ready to submit!'
            : `${totalQuestions - answeredCount} question${totalQuestions - answeredCount !== 1 ? 's' : ''} remaining`}
        </p>
      </div>

      {/* Inline spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default AssessmentPage
