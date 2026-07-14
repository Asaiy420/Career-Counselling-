import React from 'react';
import { Link } from 'react-router-dom';

interface Mentor {
  id: number;
  name: string;
  role: string;
  experience: string;
  company: string;
  specialization: string;
  initials: string;
}

const Mentors: React.FC = () => {
  const mentorList: Mentor[] = [
    {
      id: 1,
      name: "Sarah Connor",
      role: "Lead UI/UX Designer",
      experience: "8+ Years",
      company: "Apple Inc.",
      specialization: "Interaction Design, Mobile Systems",
      initials: "SC"
    },
    {
      id: 2,
      name: "Alex Mercer",
      role: "Principal Software Architect",
      experience: "10+ Years",
      company: "Google",
      specialization: "Distributed Systems, Infrastructure",
      initials: "AM"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Senior Data Scientist",
      experience: "6+ Years",
      company: "Meta",
      specialization: "NLP, Deep Learning, Recommendation Engines",
      initials: "PP"
    }
  ];

  return (
    <section id="mentorship" className="sh-section sh-mentors">
      <div className="sh-container">
        <div className="sh-section-title-wrap">
          <span className="sh-section-subtitle">Mentorship</span>
          <h2 className="sh-section-title">Connect With Industry Leaders</h2>
          <p className="sh-section-description">
            Get personalized guidance, resume reviews, and interview prep from experts working at leading tech enterprises.
          </p>
        </div>

        <div className="sh-mentors-grid">
          {mentorList.map((mentor) => (
            <div key={mentor.id} className="sh-mentor-card">
              <div className="sh-mentor-img-wrapper">
                <div className="sh-mentor-placeholder">
                  {mentor.initials}
                </div>
                <span className="sh-mentor-badge">{mentor.company}</span>
              </div>
              
              <div className="sh-mentor-info">
                <h3 className="sh-mentor-name">{mentor.name}</h3>
                <span className="sh-mentor-role">{mentor.role}</span>
                
                <div className="sh-mentor-meta">
                  <div className="sh-mentor-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>{mentor.experience} Exp</span>
                  </div>
                  <div className="sh-mentor-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Top Rated</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>
                  <strong>Specializes in:</strong> {mentor.specialization}
                </p>

                <Link to="/login" className="sh-btn sh-btn-outline-green sh-mentor-btn">
                  Book 1-on-1 Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
