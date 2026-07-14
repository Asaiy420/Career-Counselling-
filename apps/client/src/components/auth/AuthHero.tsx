import React from 'react';

const AuthHero: React.FC = () => {
  return (
    <div className="auth-hero-section">
      {/* Background visual effects */}
      <div className="auth-hero-grid" />
      <div className="auth-hero-orb orb-1" />
      <div className="auth-hero-orb orb-2" />
      
      {/* Small top header for visual structure */}
      <div className="auth-hero-header">
        <span className="auth-hero-logo">
          SkillHive Digital
        </span>
      </div>
      
      {/* Main visual body containing CSS floating cards */}
      <div className="auth-hero-body">
        <div className="auth-hero-illustration">
          
          {/* Card 1: Career Match Mockup */}
          <div className="illustration-card card-match" style={{ zIndex: 5 }}>
            <div className="card-match-header">
              <span className="card-badge">Career Match</span>
              <span className="card-match-score">98% Match</span>
            </div>
            <h4>Software Engineer</h4>
            <p className="card-match-desc">
              Excellent alignment with logical problem solving, systems design, and quantitative analysis.
            </p>
            <div className="card-match-bar-bg">
              <div className="card-match-bar-fill" style={{ width: '98%' }} />
            </div>
          </div>

          {/* Card 2: Upcoming Mentor Session Mockup */}
          <div className="illustration-card card-mentor" style={{ zIndex: 4 }}>
            <div className="card-mentor-header">
              <div className="mentor-avatar">SJ</div>
              <div className="mentor-info">
                <h5>Dr. Sarah Jenkins</h5>
                <p>Senior Career Coach</p>
              </div>
            </div>
            <div className="mentor-meta">
              <span className="mentor-time">Today, 3:00 PM</span>
              <span className="mentor-live-badge">
                <span className="live-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Card 3: Interactive Pathways Mockup */}
          <div className="illustration-card card-path" style={{ zIndex: 3 }}>
            <h4>Career Roadmap</h4>
            <div className="path-steps">
              <div className="path-step">
                <span className="step-indicator done">✓</span>
                <span className="step-label done">Skill Assessment</span>
              </div>
              <div className="path-step">
                <span className="step-indicator active">2</span>
                <span className="step-label active">Mentor Session</span>
              </div>
              <div className="path-step">
                <span className="step-indicator pending">3</span>
                <span className="step-label pending">Success Milestones</span>
              </div>
            </div>
          </div>

          {/* Card 4: Industry Insights Mockup */}
          <div className="illustration-card card-insight" style={{ zIndex: 6 }}>
            <h5>Industry Insights</h5>
            <div className="insight-trend">AI Engineer</div>
            <div className="insight-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              +42% Growth
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial/Slogan at bottom */}
      <div className="auth-hero-footer">
        <h3>Navigate Your Professional Path</h3>
        <p>
          Discover personalized pathways, connect with vetted industry experts, and take command of your learning journey with SkillHive Digital.
        </p>
      </div>
    </div>
  );
};

export default AuthHero;
