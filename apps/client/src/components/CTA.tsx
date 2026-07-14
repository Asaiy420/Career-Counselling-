import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section className="sh-section sh-cta">
      <div className="sh-container">
        <div className="sh-cta-wrapper">
          <h2 className="sh-cta-title">Start Building Your Future Today</h2>
          <p className="sh-cta-desc">
            Join SkillHive Digital and discover the career path that fits your strengths, talents, and ambitions.
          </p>
          <div className="sh-cta-actions">
            <Link to="/register" className="sh-btn sh-btn-primary">
              Get Started Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a href="mailto:info@skillhivedigital.com" className="sh-btn sh-btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
