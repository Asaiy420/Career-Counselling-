import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section id="home" className="sh-hero">
      <div className="sh-container">
        <div className="sh-hero-grid">
          {/* Left Column: Headline and Content */}
          <div className="sh-hero-content">
            <div className="sh-hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>Next-Gen Career Development Platform</span>
            </div>
            
            <h1 className="sh-hero-title">
              Discover Your Ideal <span>Career Path</span> With Confidence
            </h1>
            
            <p className="sh-hero-desc">
              SkillHive Digital helps students identify their strengths, explore careers, connect with mentors, and build the skills needed for future success.
            </p>
            
            <div className="sh-hero-actions">
              <Link to="/register" className="sh-btn sh-btn-primary">
                Get Started
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <a href="#categories" className="sh-btn sh-btn-secondary">
                Explore Careers
              </a>
            </div>
            
            <div className="sh-hero-trust">
              <div className="sh-trust-item">
                <span className="sh-trust-num">5,000<span>+</span></span>
                <span className="sh-trust-label">Students Guided</span>
              </div>
              <div className="sh-trust-item">
                <span className="sh-trust-num">100<span>+</span></span>
                <span className="sh-trust-label">Career Paths</span>
              </div>
              <div className="sh-trust-item">
                <span className="sh-trust-num">Expert</span>
                <span className="sh-trust-label">Mentorship</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dashboard Mockup */}
          <div className="sh-hero-visual">
            <div className="sh-db-glow" style={{ top: '10%', left: '10%' }}></div>
            <div className="sh-db-glow" style={{ bottom: '20%', right: '10%', background: 'rgba(16, 185, 129, 0.15)' }}></div>
            
            <div className="sh-db-mockup">
              {/* Card 1: Main Recommendations Panel */}
              <div className="sh-db-card sh-db-main">
                <div>
                  <div className="sh-db-header">
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                        <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                        <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                        <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                      </svg>
                      Dashboard
                    </span>
                    <span style={{ color: 'var(--color-primary-green)' }}>Active Analysis</span>
                  </div>
                  <h3 className="sh-db-title">Recommended Paths</h3>
                  <p className="sh-db-body">Based on your cognitive profile and assessments.</p>
                </div>

                <div className="sh-rec-careers-list">
                  <div className="sh-rec-career-item">
                    <span>Software Engineer</span>
                    <span>94% Match</span>
                  </div>
                  <div className="sh-rec-career-item">
                    <span>UI/UX Designer</span>
                    <span>88% Match</span>
                  </div>
                  <div className="sh-rec-career-item">
                    <span>Data Scientist</span>
                    <span>82% Match</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Match Score Widget */}
              <div className="sh-db-card sh-db-score">
                <div className="sh-db-header">
                  <span>Match Score</span>
                </div>
                <div className="sh-circle-progress">
                  <svg width="70" height="70" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--color-primary-green)"
                      strokeDasharray="94, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="sh-circle-progress-num">94%</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 500, marginTop: '8px' }}>
                  Ideal Fit: Engineering
                </div>
              </div>

              {/* Card 3: Skill Progress Widget */}
              <div className="sh-db-card sh-db-progress">
                <div className="sh-db-header">
                  <span>Skill Growth</span>
                  <span>Level 4</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                    <span>Technical Aptitude</span>
                    <span>85%</span>
                  </div>
                  <div className="sh-progress-track">
                    <div className="sh-progress-bar" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                    <span>Creative Reasoning</span>
                    <span>72%</span>
                  </div>
                  <div className="sh-progress-track">
                    <div className="sh-progress-bar" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 4: Upcoming Session Widget */}
              <div className="sh-db-card sh-db-session">
                <div className="sh-db-header">
                  <span>Next Session</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div className="sh-test-avatar-placeholder" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
                    AM
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700 }}>Alex Mercer</h4>
                    <p style={{ fontSize: '0.65rem', color: 'var(--color-text-light-muted)' }}>Senior Mentor, UI/UX</p>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  padding: '6px', 
                  borderRadius: 'var(--radius-sm)', 
                  marginTop: '8px', 
                  fontSize: '0.7rem',
                  color: 'var(--color-primary-green)',
                  fontWeight: 600
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'pulse-glow 1.5s infinite' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Starting in 15 mins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
