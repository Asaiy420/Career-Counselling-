import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky navbar
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
    <>
      <nav className={`sh-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="sh-container sh-navbar-container">
          <Link to="/" className="sh-nav-logo">
            {/* Logo placeholder - Left empty as requested */}
            <div className="sh-logo-placeholder" aria-label="SkillHive Digital Logo">
              [ Logo Area ]
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="sh-nav-menu">
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="sh-nav-link">Home</a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="sh-nav-link">Features</a>
            </li>
            <li>
              <a href="#assessment" onClick={(e) => handleNavClick(e, 'assessment')} className="sh-nav-link">Career Assessment</a>
            </li>
            <li>
              <a href="#mentorship" onClick={(e) => handleNavClick(e, 'mentorship')} className="sh-nav-link">Mentorship</a>
            </li>
            <li>
              <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')} className="sh-nav-link">Resources</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="sh-nav-link">About</a>
            </li>
          </ul>

          <div className="sh-nav-actions">
            <Link to="/login" className="sh-nav-login">Login</Link>
            <Link to="/register" className="sh-btn sh-btn-primary sh-nav-btn">Get Started</Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className={`sh-nav-toggle ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`sh-nav-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="sh-nav-mobile-menu">
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="sh-nav-mobile-link">Home</a>
          </li>
          <li>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="sh-nav-mobile-link">Features</a>
          </li>
          <li>
            <a href="#assessment" onClick={(e) => handleNavClick(e, 'assessment')} className="sh-nav-mobile-link">Career Assessment</a>
          </li>
          <li>
            <a href="#mentorship" onClick={(e) => handleNavClick(e, 'mentorship')} className="sh-nav-mobile-link">Mentorship</a>
          </li>
          <li>
            <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')} className="sh-nav-mobile-link">Resources</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="sh-nav-mobile-link">About</a>
          </li>
        </ul>
        <div className="sh-nav-mobile-actions">
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="sh-btn sh-btn-secondary">Login</Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="sh-btn sh-btn-primary">Get Started</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
