import React, { useState, useEffect } from 'react';

// Hook to handle count-up animation
const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
};

const Statistics: React.FC = () => {
  const studentsCount = useCountUp(5000, 2000);
  const mentorsCount = useCountUp(120, 2000);
  const resourcesCount = useCountUp(300, 2000);
  const satisfactionCount = useCountUp(95, 2000);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="sh-section sh-statistics">
      <div className="sh-container">
        <div className="sh-section-title-wrap">
          <span className="sh-section-subtitle">Our Impact</span>
          <h2 className="sh-section-title" style={{ color: 'var(--color-white)' }}>Empowering Student Success At Scale</h2>
          <p className="sh-section-description" style={{ color: 'var(--color-text-light-muted)' }}>
            Through structured guidance, professional mentorship, and robust skill roadmaps.
          </p>
        </div>

        <div className="sh-stats-grid">
          {/* Card 1 */}
          <div className="sh-stat-card">
            <div className="sh-stat-num">
              {formatNumber(studentsCount)}<span>+</span>
            </div>
            <div className="sh-stat-label">Active Students</div>
          </div>

          {/* Card 2 */}
          <div className="sh-stat-card">
            <div className="sh-stat-num">
              {mentorsCount}<span>+</span>
            </div>
            <div className="sh-stat-label">Expert Mentors</div>
          </div>

          {/* Card 3 */}
          <div className="sh-stat-card">
            <div className="sh-stat-num">
              {resourcesCount}<span>+</span>
            </div>
            <div className="sh-stat-label">Learning Resources</div>
          </div>

          {/* Card 4 */}
          <div className="sh-stat-card">
            <div className="sh-stat-num">
              {satisfactionCount}<span>%</span>
            </div>
            <div className="sh-stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
