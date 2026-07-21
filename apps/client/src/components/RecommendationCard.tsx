import { Link } from 'react-router-dom';
import type { RecommendationResult } from '../types';

type RecommendationCardProps = {
  result: RecommendationResult;
  rank: number;
};

function matchColor(percentage: number) {
  if (percentage >= 80)
    return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
  if (percentage >= 50) 
    return 'bg-blue-50 text-blue-700 ring-blue-600/20';
  if (percentage >= 25) 
    return 'bg-amber-50 text-amber-700 ring-amber-600/20';
  return 'bg-slate-50 text-slate-600 ring-slate-500/20';
}

export function RecommendationCard({ result, rank }: RecommendationCardProps) {
  const { career, matchPercentage } = result;

  return (
    <article className='group relative flex flex-col items-start justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-slate-900/10'>
      <div className='w-full'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600 ring-1 ring-inset ring-indigo-500/20'>
              #{rank}
            </span>
            <div>
              <p className='text-xs font-medium uppercase tracking-wider text-slate-500'>
                {career.category}
              </p>
              <h3 className='mt-1 text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600'>
                {career.title}
              </h3>
            </div>
          </div>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${matchColor(matchPercentage)}`}
          >
            {matchPercentage}% Match
          </span>
        </div>

        <p className='mt-4 line-clamp-3 text-sm leading-6 text-slate-600'>
          {career.description}
        </p>

        <div className='mt-6 flex flex-wrap gap-2'>
          {career.requiredSkills.slice(0, 4).map(skill => (
            <span
              key={skill}
              className='inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10'
            >
              {skill}
            </span>
          ))}
          {career.requiredSkills.length > 4 && (
            <span className='inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10'>
              +{career.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className='mt-8 flex w-full items-center justify-between border-t border-slate-100 pt-5'>
        <div>
          <p className='text-xs font-medium text-slate-500'>Average Salary</p>
          <p className='mt-1 text-sm font-semibold text-slate-900'>
            {career.averageSalary}
          </p>
        </div>
        <Link
          to={`/careers/${career._id}`}
          className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
