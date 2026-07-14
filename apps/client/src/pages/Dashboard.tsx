import { Link, Navigate, useLocation } from 'react-router-dom';
import { DashboardSavedCareersWidget } from '../components/DashboardSavedCareersWidget';
import { SaveCareerButton } from '../components/SaveCareerButton';
import { useSavedCareers } from '../hooks/useSavedCareers';
import type { Career } from '../types';
import '../styles/Dashboard.css';

type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
  icon: string;
};

const recommendedCareers: Career[] = [
  {
    _id: 'career-ux',
    title: 'UI/UX Designer',
    description:
      'Shape intuitive learning experiences for students and educators.',
    category: 'Design',
    requiredSkills: ['Figma', 'User research', 'Prototyping'],
    educationRequired: 'Diploma / Degree',
    averageSalary: '$58k - $92k',
    growthOutlook: 'Strong',
    workEnvironment: 'Hybrid',
  },
  {
    _id: 'career-data',
    title: 'Data Analyst',
    description:
      'Translate progress and performance data into actionable student insights.',
    category: 'Analytics',
    requiredSkills: ['SQL', 'Dashboards', 'Reporting'],
    educationRequired: 'Degree',
    averageSalary: '$62k - $105k',
    growthOutlook: 'High',
    workEnvironment: 'Remote',
  },
  {
    _id: 'career-product',
    title: 'Product Manager',
    description:
      'Guide career product strategy and student journey improvements.',
    category: 'Product',
    requiredSkills: ['Roadmapping', 'Prioritization', 'Communication'],
    educationRequired: 'Degree / Experience',
    averageSalary: '$78k - $128k',
    growthOutlook: 'Very strong',
    workEnvironment: 'Hybrid',
  },
];

const metrics: DashboardMetric[] = [
  { label: 'Saved Careers', value: '12', trend: '+3 this week', icon: '★' },
  { label: 'Assessment Score', value: '84%', trend: '+8 pts', icon: '◌' },
  { label: 'Skills Completed', value: '18', trend: '+4 modules', icon: '✓' },
  { label: 'Mentor Sessions', value: '5', trend: '+1 booked', icon: '↗' },
];

function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName ?? 'there';
  const { savedCareers, loading, isSaved, toggleSave } = useSavedCareers();

  if (!location.state?.userName) {
    return <Navigate to='/register' replace />;
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-shell'>
        <header className='dashboard-hero'>
          <div className='dashboard-hero__copy'>
            <p className='dashboard-kicker'>SkillHive Digital</p>
            <h1>Welcome Back, {userName}</h1>
            <p>Continue building your future today.</p>
          </div>

          <div className='dashboard-hero__actions' aria-label='Quick actions'>
            <button
              type='button'
              className='dashboard-icon-button'
              aria-label='Profile avatar'
            >
              {userName.slice(0, 1).toUpperCase()}
            </button>
            <button
              type='button'
              className='dashboard-icon-button'
              aria-label='Notifications'
            >
              ⌁
            </button>
            <button
              type='button'
              className='dashboard-icon-button'
              aria-label='Settings'
            >
              ⚙
            </button>
          </div>
        </header>

        <section
          className='dashboard-metrics'
          aria-label='Dashboard statistics'
        >
          {metrics.map(metric => (
            <article key={metric.label} className='dashboard-stat-card'>
              <div className='dashboard-stat-card__icon' aria-hidden='true'>
                {metric.icon}
              </div>
              <div>
                <p className='dashboard-stat-card__label'>{metric.label}</p>
                <strong className='dashboard-stat-card__value'>
                  {metric.value}
                </strong>
              </div>
              <span className='dashboard-stat-card__trend'>{metric.trend}</span>
            </article>
          ))}
        </section>

        <section className='dashboard-grid' aria-label='Dashboard overview'>
          <div className='dashboard-column dashboard-column--primary'>
            <article className='dashboard-panel career-progress-card'>
              <div className='dashboard-panel__header'>
                <div>
                  <p className='dashboard-kicker'>Career progress</p>
                  <h2>Career readiness</h2>
                </div>
                <span className='dashboard-badge'>72% complete</span>
              </div>

              <p className='dashboard-panel__body'>
                Your profile is nearly ready. Finish assessments and skills
                modules to unlock stronger recommendations.
              </p>

              <div className='dashboard-progress'>
                <div className='dashboard-progress__track'>
                  <div
                    className='dashboard-progress__fill'
                    style={{ width: '72%' }}
                  />
                </div>
                <div className='dashboard-progress__meta'>
                  <span>Profile readiness</span>
                  <span>72%</span>
                </div>
              </div>
            </article>

            <article className='dashboard-panel'>
              <div className='dashboard-panel__header'>
                <div>
                  <p className='dashboard-kicker'>Recommended careers</p>
                  <h2>Matches for your journey</h2>
                </div>
                <Link to='/careers' className='dashboard-link'>
                  Explore all
                </Link>
              </div>

              <div className='dashboard-career-list'>
                {recommendedCareers.map(career => (
                  <article key={career._id} className='dashboard-career-card'>
                    <div className='dashboard-career-card__top'>
                      <div>
                        <p className='dashboard-career-card__field'>
                          {career.category}
                        </p>
                        <h3>{career.title}</h3>
                      </div>
                      <span className='dashboard-mini-pill'>
                        {career.growthOutlook}
                      </span>
                    </div>

                    <p className='dashboard-panel__body'>
                      {career.description}
                    </p>

                    <div className='dashboard-tag-row'>
                      {career.requiredSkills.slice(0, 3).map(skill => (
                        <span key={skill} className='dashboard-tag'>
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className='dashboard-career-card__actions'>
                      <Link
                        to='/careers'
                        className='dashboard-button dashboard-button--ghost'
                      >
                        View path
                      </Link>
                      <SaveCareerButton
                        career={career}
                        isSaved={isSaved(career._id)}
                        onToggle={toggleSave}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className='dashboard-panel'>
              <div className='dashboard-panel__header'>
                <div>
                  <p className='dashboard-kicker'>Upcoming tasks</p>
                  <h2>Keep momentum going</h2>
                </div>
              </div>

              <div className='dashboard-task-list'>
                {[
                  'Complete Assessment',
                  'Explore Careers',
                  'Book Mentor Session',
                ].map((task, index) => (
                  <div key={task} className='dashboard-task-item'>
                    <div className='dashboard-task-item__marker'>
                      0{index + 1}
                    </div>
                    <div>
                      <h3>{task}</h3>
                      <p>
                        {index === 0
                          ? 'Unlock a sharper career match score.'
                          : index === 1
                            ? 'Review paths aligned to your strengths.'
                            : 'Get guidance from a mentor in your target field.'}
                      </p>
                    </div>
                    <Link
                      to={index === 2 ? '/login' : '/careers'}
                      className='dashboard-task-item__link'
                    >
                      Start
                    </Link>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className='dashboard-column dashboard-column--secondary'>
            <DashboardSavedCareersWidget
              savedCareers={savedCareers}
              loading={loading}
              onToggleSave={toggleSave}
              isSaved={isSaved}
            />

            <article className='dashboard-panel'>
              <div className='dashboard-panel__header'>
                <div>
                  <p className='dashboard-kicker'>Recent activity</p>
                  <h2>Latest progress</h2>
                </div>
              </div>

              <div className='dashboard-activity-list'>
                {[
                  {
                    title: 'Saved Career',
                    note: 'UI/UX Designer added to your shortlist',
                    time: '2h ago',
                  },
                  {
                    title: 'Assessment Completed',
                    note: 'Personality and interest assessment finished',
                    time: 'Yesterday',
                  },
                  {
                    title: 'Profile Updated',
                    note: 'Education and goals updated successfully',
                    time: '2 days ago',
                  },
                ].map(item => (
                  <div key={item.title} className='dashboard-activity-item'>
                    <div className='dashboard-activity-item__dot' />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.note}</p>
                    </div>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className='dashboard-panel'>
              <div className='dashboard-panel__header'>
                <div>
                  <p className='dashboard-kicker'>Career goals</p>
                  <h2>Goal progress</h2>
                </div>
              </div>

              <div className='dashboard-goal-card'>
                <div className='dashboard-goal-card__progress'>
                  <div className='dashboard-progress__track'>
                    <div
                      className='dashboard-progress__fill'
                      style={{ width: '64%' }}
                    />
                  </div>
                  <div className='dashboard-progress__meta'>
                    <span>Target progress</span>
                    <span>64%</span>
                  </div>
                </div>

                <div className='dashboard-badge-row'>
                  {[
                    'Assessment Ready',
                    'Top 5 Careers',
                    'Mentor Connected',
                  ].map(badge => (
                    <span key={badge} className='dashboard-achievement-badge'>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className='dashboard-cta'>
          <div>
            <p className='dashboard-kicker dashboard-kicker--light'>
              Next step
            </p>
            <h2>Ready to discover your ideal career?</h2>
            <p>
              Take the assessment to refine your matches and unlock more
              personalized guidance.
            </p>
          </div>

          <Link
            to='/careers'
            className='dashboard-button dashboard-button--cta'
          >
            Take Career Assessment
          </Link>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
