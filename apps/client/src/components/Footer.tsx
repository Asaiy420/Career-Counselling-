import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleFooterScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="about" className="sh-footer">
      <div className="sh-container">
        <div className="sh-footer-grid">
          {/* Column 1: Brand & Desc */}
          <div className="sh-footer-col">
            <Link to="/" className="sh-footer-brand-logo">
              SkillHive Digital
            </Link>
            <p className="sh-footer-desc">
              SkillHive Digital is a next-generation career development and skill platform. We empower students to discover their strengths, find career fits, and build future-proof skills.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div className="sh-footer-col">
            <h4 className="sh-footer-title">Platform</h4>
            <ul className="sh-footer-links">
              <li>
                <a href="#assessment" onClick={(e) => handleFooterScroll(e, 'assessment')} className="sh-footer-link">Assessments</a>
              </li>
              <li>
                <Link to="/careers" className="sh-footer-link">Explore Careers</Link>
              </li>
              <li>
                <a href="#mentorship" onClick={(e) => handleFooterScroll(e, 'mentorship')} className="sh-footer-link">Mentorship</a>
              </li>
              <li>
                <a href="#resources" onClick={(e) => handleFooterScroll(e, 'resources')} className="sh-footer-link">Resources</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="sh-footer-col">
            <h4 className="sh-footer-title">Company</h4>
            <ul className="sh-footer-links">
              <li>
                <a href="#home" onClick={(e) => handleFooterScroll(e, 'home')} className="sh-footer-link">About Us</a>
              </li>
              <li>
                <a href="mailto:info@skillhivedigital.com" className="sh-footer-link">Contact</a>
              </li>
              <li>
                <Link to="/login" className="sh-footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/login" className="sh-footer-link">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connections */}
          <div className="sh-footer-col">
            <h4 className="sh-footer-title">Connect With Us</h4>
            <div className="sh-social-links">
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sh-social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sh-social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sh-social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="sh-footer-bottom">
          <p>© {currentYear} SkillHive Digital. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }} className="sh-footer-link">Privacy Policy</Link>
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }} className="sh-footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
