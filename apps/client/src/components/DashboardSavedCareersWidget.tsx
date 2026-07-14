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
    <section className='dashboard-panel dashboard-saved-careers'>
      <div className='dashboard-panel__header'>
        <div>
          <p className='dashboard-kicker'>Saved careers</p>
          <h2>Your favorites</h2>
        </div>
        <Link to='/saved-careers' className='dashboard-link'>
          View all
        </Link>
      </div>

      {loading ? (
        <div className='dashboard-stack'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='dashboard-skeleton' />
          ))}
        </div>
      ) : recent.length ? (
        <div className='dashboard-stack'>
          {recent.map(entry => (
            <div key={entry._id} className='dashboard-saved-careers__item'>
              <div>
                <p className='dashboard-item-title'>
                  {entry.career?.title ?? 'Career'}
                </p>
                <p className='dashboard-item-subtitle'>
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
          <div className='dashboard-saved-careers__summary'>
            {savedCareers.length} saved career
            {savedCareers.length === 1 ? '' : 's'}
          </div>
        </div>
      ) : (
        <div className='dashboard-empty-state'>
          You have no saved careers yet. Save one from the careers list to see
          it here.
        </div>
      )}
    </section>
  );
}
