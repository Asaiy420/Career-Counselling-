import React from 'react';

interface StepItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: React.FC = () => {
  const steps: StepItem[] = [
    {
      id: 1,
      title: 'Take Assessment',
      description:
        'Answer questions about your interests, skills, and values to build your cognitive profile.',
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
        >
          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
          <rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect>
          <path d='M9 14l2 2 4-4'></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Get Career Matches',
      description:
        'Our AI model analyzes your data to suggest top pathways, skill requirements, and market insights.',
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
          <line x1='11' y1='8' x2='11' y2='14'></line>
          <line x1='8' y1='11' x2='14' y2='11'></line>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Connect & Grow',
      description:
        'Schedule sessions with top industry professionals and complete personalized skill-building roadmaps.',
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
        >
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
          <polyline points='22 4 12 14.01 9 11.01'></polyline>
        </svg>
      ),
    },
  ];

  return (
    <section id='assessment' className='sh-section sh-how-it-works'>
      <div className='sh-container'>
        <div className='sh-section-title-wrap'>
          <span className='sh-section-subtitle'>Process</span>
          <h2 className='sh-section-title'>How SkillHive Works</h2>
          <p className='sh-section-description'>
            Your step-by-step roadmap from self-discovery to securing your dream
            role.
          </p>
        </div>

        <div className='sh-how-grid'>
          {steps.map(step => (
            <div key={step.id} className='sh-how-step'>
              <div className='sh-how-num-wrapper'>
                <div className='sh-how-num'>{step.id}</div>
                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    background: 'var(--color-light-gray)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {step.icon}
                </div>
              </div>
              <h3 className='sh-how-step-title'>{step.title}</h3>
              <p className='sh-how-step-desc'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
