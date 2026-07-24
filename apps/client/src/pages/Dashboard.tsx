import { Link, Navigate, useLocation } from 'react-router-dom';
import { DashboardSavedCareersWidget } from '../components/DashboardSavedCareersWidget';
import { SaveCareerButton } from '../components/SaveCareerButton';
import { useSavedCareers } from '../hooks/useSavedCareers';
import { useRecommendations } from '../hooks/useRecommendations';

export default function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName ?? 'there';
  const {
    savedCareers,
    loading: loadingSaved,
    isSaved,
    toggleSave,
  } = useSavedCareers();
  const {
    recommendations,
    loading: loadingRecs,
    hasTakenAssessment,
    submittedAt,
  } = useRecommendations();

  if (!location.state?.userName) {
    return <Navigate to='/register' replace />;
  }

  // Derive dynamic metrics
  const assessmentScoreStr = hasTakenAssessment ? '100%' : '0%';
  const assessmentTrend = hasTakenAssessment ? 'Completed' : 'Pending';

  const metrics = [
    {
      label: 'Saved Careers',
      value: savedCareers.length.toString(),
      trend: 'Shortlisted',
      icon: '★',
    },
    {
      label: 'Assessment Score',
      value: assessmentScoreStr,
      trend: assessmentTrend,
      icon: '◌',
    },
    {
      label: 'Skills Matched',
      value: hasTakenAssessment ? '12' : '0',
      trend: 'Based on profile',
      icon: '✓',
    },
    {
      label: 'Mentor Sessions',
      value: '0',
      trend: 'Not booked yet',
      icon: '↗',
    },
  ];

  // Dynamic recommendations: take top 3
  const topRecommendations = recommendations.slice(0, 3).map(r => r.career);

  return (
    <main className='min-h-screen bg-slate-50 text-slate-600'>
      <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12'>
        {/* Header / Hero */}
        <header className='mb-10 flex flex-col justify-between gap-6 rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:flex-row md:items-center md:p-10'>
          <div>
            <p className='text-sm font-semibold tracking-wide text-emerald-300 uppercase'>
              SkillHive Digital
            </p>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Welcome Back, {userName}
            </h1>
            <p className='mt-2 text-lg text-slate-300'>
              Continue building your future today.
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-bold text-emerald-300 ring-1 ring-inset ring-emerald-500/30 transition hover:bg-emerald-500/30'>
              {userName.slice(0, 1).toUpperCase()}
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl transition hover:bg-white/10 ring-1 ring-inset ring-white/10'>
              ⌁
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl transition hover:bg-white/10 ring-1 ring-inset ring-white/10'>
              ⚙
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <section className='mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {metrics.map(metric => (
            <article
              key={metric.label}
              className='flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-xl font-bold text-emerald-600 ring-1 ring-inset ring-emerald-500/20'>
                  {metric.icon}
                </div>
                <span className='text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md ring-1 ring-inset ring-slate-200'>
                  {metric.trend}
                </span>
              </div>
              <div className='mt-6'>
                <p className='text-sm font-medium text-slate-500'>
                  {metric.label}
                </p>
                <p className='mt-1 text-3xl font-bold tracking-tight text-slate-900'>
                  {metric.value}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Main Grid */}
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2 space-y-8'>
            {/* Progress Panel */}
            <article className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>
                    Career Progress
                  </p>
                  <h2 className='mt-1 text-xl font-bold text-slate-900'>
                    Career Readiness
                  </h2>
                </div>
                <span className='inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20'>
                  {hasTakenAssessment ? '100% Complete' : '50% Complete'}
                </span>
              </div>
              <p className='mt-4 text-sm text-slate-600 leading-relaxed max-w-2xl'>
                {hasTakenAssessment
                  ? 'Your profile is fully ready! Explore your tailored recommendations below.'
                  : 'Your profile is nearly ready. Finish the assessment to unlock stronger recommendations.'}
              </p>
              <div className='mt-6'>
                <div className='h-3 w-full overflow-hidden rounded-full bg-slate-100'>
                  <div
                    className={`h-full rounded-full bg-emerald-600 transition-all duration-1000 ${hasTakenAssessment ? 'w-full' : 'w-1/2'}`}
                  />
                </div>
                <div className='mt-2 flex justify-between text-xs font-medium text-slate-500'>
                  <span>Profile readiness</span>
                  <span>{hasTakenAssessment ? '100%' : '50%'}</span>
                </div>
              </div>
            </article>

            {/* Recommended Careers Panel */}
            <article className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>
                    Recommended Careers
                  </p>
                  <h2 className='mt-1 text-xl font-bold text-slate-900'>
                    Matches for your journey
                  </h2>
                </div>
                <Link
                  to='/recommendations'
                  className='text-sm font-semibold text-emerald-600 hover:text-emerald-500'
                >
                  Explore all &rarr;
                </Link>
              </div>

              <div className='space-y-6'>
                {loadingRecs ? (
                  <div className='animate-pulse h-32 bg-slate-100 rounded-xl w-full' />
                ) : topRecommendations.length > 0 ? (
                  topRecommendations.map(career => (
                    <div
                      key={career._id}
                      className='group flex flex-col gap-4 rounded-2xl border border-slate-100 p-5 transition hover:border-emerald-100 hover:bg-emerald-50/30 sm:flex-row sm:items-center sm:justify-between'
                    >
                      <div className='flex-1'>
                        <p className='text-xs font-medium text-slate-500'>
                          {career.category}
                        </p>
                        <h3 className='text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600'>
                          {career.title}
                        </h3>
                        <p className='mt-1 text-sm text-slate-600 line-clamp-2'>
                          {career.description}
                        </p>
                        <div className='mt-3 flex flex-wrap gap-2'>
                          {career.requiredSkills.slice(0, 3).map(skill => (
                            <span
                              key={skill}
                              className='inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10'
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center gap-3 sm:flex-col sm:items-end'>
                        <Link
                          to={`/careers/${career._id}`}
                          className='rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500'
                        >
                          View path
                        </Link>
                        <SaveCareerButton
                          career={career}
                          isSaved={isSaved(career._id)}
                          onToggle={toggleSave}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='rounded-xl bg-slate-50 p-6 text-center ring-1 ring-inset ring-slate-900/5'>
                    <p className='text-sm text-slate-500 mb-4'>
                      Take the assessment to see your personalized
                      recommendations.
                    </p>
                    <Link
                      to='/assessment'
                      className='inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500'
                    >
                      Start Assessment
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </div>

          <div className='space-y-8'>
            <DashboardSavedCareersWidget
              savedCareers={savedCareers}
              loading={loadingSaved}
              onToggleSave={toggleSave}
              isSaved={isSaved}
            />

            {/* Tasks Panel */}
            <article className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5'>
              <div className='mb-6'>
                <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>
                  Upcoming tasks
                </p>
                <h2 className='mt-1 text-lg font-bold text-slate-900'>
                  Keep momentum going
                </h2>
              </div>
              <div className='space-y-4'>
                {!hasTakenAssessment && (
                  <div className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500'>
                      01
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold text-slate-900'>
                        Complete Assessment
                      </h3>
                      <p className='mt-1 text-xs text-slate-500'>
                        Unlock a sharper career match score.
                      </p>
                      <Link
                        to='/assessment'
                        className='mt-2 inline-block text-xs font-semibold text-emerald-600 hover:text-emerald-500'
                      >
                        Start &rarr;
                      </Link>
                    </div>
                  </div>
                )}
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500'>
                    02
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-slate-900'>
                      Explore Careers
                    </h3>
                    <p className='mt-1 text-xs text-slate-500'>
                      Review paths aligned to your strengths.
                    </p>
                    <Link
                      to='/careers'
                      className='mt-2 inline-block text-xs font-semibold text-emerald-600 hover:text-emerald-500'
                    >
                      Browse &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Recent Activity Panel */}
            <article className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5'>
              <div className='mb-6'>
                <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>
                  Recent activity
                </p>
                <h2 className='mt-1 text-lg font-bold text-slate-900'>
                  Latest progress
                </h2>
              </div>
              <div className='space-y-6'>
                {[
                  {
                    title: 'Dashboard Updated',
                    note: 'New dynamic layout loaded',
                    time: 'Just now',
                  },
                  hasTakenAssessment
                    ? {
                        title: 'Assessment Completed',
                        note: 'Personality and interest assessment finished',
                        time: submittedAt
                          ? new Date(submittedAt).toLocaleDateString()
                          : 'Recently',
                      }
                    : null,
                  {
                    title: 'Profile Created',
                    note: 'Welcome to SkillHive Digital',
                    time: 'Recently',
                  },
                ]
                  .filter(Boolean)
                  .map((item, idx, arr) => (
                    <div key={idx} className='relative flex gap-4'>
                      {idx !== arr.length - 1 && (
                        <div className='absolute left-3 top-6 h-full w-0.5 bg-slate-100' />
                      )}
                      <div className='relative mt-1 h-6 w-6 shrink-0 rounded-full bg-emerald-100 ring-4 ring-white flex items-center justify-center'>
                        <div className='h-2 w-2 rounded-full bg-emerald-600' />
                      </div>
                      <div>
                        <h3 className='text-sm font-semibold text-slate-900'>
                          {item!.title}
                        </h3>
                        <p className='mt-0.5 text-xs text-slate-500'>
                          {item!.note}
                        </p>
                        <span className='mt-1 block text-xs font-medium text-slate-400'>
                          {item!.time}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
