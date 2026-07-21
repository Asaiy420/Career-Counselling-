import { Link } from 'react-router-dom';
import { useRecommendations } from '../hooks/useRecommendations';
import { RecommendationCard } from '../components/RecommendationCard';

function RecommendationsPage() {
  const {
    recommendations,
    submittedAt,
    topCategories,
    loading,
    error,
    hasTakenAssessment,
  } = useRecommendations();

  return (
    <div className='min-h-screen bg-slate-50 text-slate-600'>
      <div className='mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-12'>
        {/* Header Section */}
        <div className='mb-10 rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:p-10 lg:p-12'>
          <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl'>
              <span className='inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20'>
                Career Matches
              </span>
              <h1 className='mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl'>
                Your Personalized Recommendations
              </h1>
              <p className='mt-4 text-lg leading-relaxed text-slate-300'>
                Based on your assessment, we've identified the strongest career paths for you. Review your matches and explore the details of each role.
              </p>
            </div>
            <div className='shrink-0'>
              <Link
                to='/assessment'
                className='inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              >
                {hasTakenAssessment ? 'Retake Assessment' : 'Take Assessment'}
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className='grid gap-6 sm:grid-cols-2'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='h-64 animate-pulse rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-slate-200' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-1/3 rounded bg-slate-200' />
                    <div className='h-3 w-1/4 rounded bg-slate-200' />
                  </div>
                </div>
                <div className='mt-6 space-y-3'>
                  <div className='h-3 w-full rounded bg-slate-200' />
                  <div className='h-3 w-full rounded bg-slate-200' />
                  <div className='h-3 w-2/3 rounded bg-slate-200' />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className='rounded-2xl bg-red-50 p-6 text-red-700 ring-1 ring-inset ring-red-600/10'>
            <div className='flex items-center gap-3'>
              <svg className='h-5 w-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z' clipRule='evenodd' />
              </svg>
              <h3 className='text-sm font-medium'>Error loading recommendations</h3>
            </div>
            <p className='mt-2 text-sm'>{error}</p>
          </div>
        ) : !hasTakenAssessment ? (
          <div className='flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-900/5'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50'>
              <svg className='h-8 w-8 text-indigo-600' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' />
              </svg>
            </div>
            <h2 className='mt-6 text-2xl font-bold tracking-tight text-slate-900'>No Assessment Found</h2>
            <p className='mt-2 max-w-md text-slate-500'>
              Discover careers tailored to your unique strengths. Take our short assessment to get personalized recommendations.
            </p>
            <Link
              to='/assessment'
              className='mt-8 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Start the Assessment
            </Link>
          </div>
        ) : (
          <div className='space-y-8'>
            <div className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <h2 className='text-lg font-semibold text-slate-900'>Insights Summary</h2>
                  <p className='mt-2 max-w-3xl text-slate-600'>
                    {topCategories.length
                      ? `Your responses show the strongest alignment with ${topCategories.join(' and ')}.`
                      : 'Your responses did not strongly favor a single field, so the list below keeps the options broader.'}{' '}
                    {recommendations.length > 0 && (
                      <span className='block mt-1'>
                        Your top match is <span className='font-medium text-slate-900'>{recommendations[0].career.title}</span> at <span className='font-medium text-indigo-600'>{recommendations[0].matchPercentage}%</span>.
                      </span>
                    )}
                  </p>
                </div>
                {submittedAt && (
                  <div className='shrink-0'>
                    <span className='inline-flex items-center rounded-md bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10'>
                      Taken {new Date(submittedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {recommendations.length === 0 ? (
              <div className='rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center'>
                <h3 className='mt-2 text-sm font-semibold text-slate-900'>No matches found</h3>
                <p className='mt-1 text-sm text-slate-500'>We couldn't generate recommendations from your answers. Please try retaking the assessment.</p>
                <div className='mt-6'>
                  <Link
                    to='/assessment'
                    className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Retake Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <div className='grid gap-6 md:grid-cols-2'>
                {recommendations.map((result, index) => (
                  <RecommendationCard
                    key={result.career._id}
                    result={result}
                    rank={index + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationsPage;
