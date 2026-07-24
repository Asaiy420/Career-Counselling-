import { Link } from 'react-router-dom';
import type { Career, SavedCareerRecord } from '../types';
import { SaveCareerButton } from './SaveCareerButton';

type DashboardSavedCareersWidgetProps = {
  savedCareers: SavedCareerRecord[];
  loading: boolean;
  onToggleSave: (career: Career) => void | Promise<void>;
  isSaved: (careerId: string) => boolean;
};

export function DashboardSavedCareersWidget({
  savedCareers,
  loading,
  onToggleSave,
  isSaved,
}: DashboardSavedCareersWidgetProps) {
  const recent = savedCareers.slice(0, 3);

  return (
    <article className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-emerald-600'>
            Saved careers
          </p>
          <h2 className='mt-1 text-lg font-bold text-slate-900'>
            Your favorites
          </h2>
        </div>
        <Link
          to='/saved-careers'
          className='text-sm font-semibold text-emerald-600 hover:text-emerald-500'
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className='space-y-4'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='h-16 animate-pulse rounded-xl bg-slate-100 w-full'
            />
          ))}
        </div>
      ) : recent.length ? (
        <div className='space-y-4'>
          {recent.map(entry => (
            <div
              key={entry._id}
              className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50'
            >
              <div>
                <p className='text-sm font-semibold text-slate-900'>
                  {entry.career?.title ?? 'Career'}
                </p>
                <p className='text-xs text-slate-500'>
                  {entry.career?.category ?? 'Saved career'}
                </p>
              </div>
              {entry.career ? (
                <SaveCareerButton
                  career={entry.career}
                  isSaved={isSaved(entry.career._id)}
                  onToggle={onToggleSave}
                />
              ) : null}
            </div>
          ))}
          <div className='pt-2 text-center text-xs font-medium text-slate-500'>
            {savedCareers.length} saved career
            {savedCareers.length === 1 ? '' : 's'}
          </div>
        </div>
      ) : (
        <div className='rounded-xl bg-slate-50 p-6 text-center ring-1 ring-inset ring-slate-900/5'>
          <p className='text-sm text-slate-500'>
            You have no saved careers yet. Save one from the careers list to see
            it here.
          </p>
        </div>
      )}
    </article>
  );
}
