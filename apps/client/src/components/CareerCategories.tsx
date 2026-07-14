import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CareerCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 1,
      title: "Software Engineering",
      description: "Build high-performance web systems, cloud architectures, and mobile services.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
          <line x1="10" y1="21" x2="14" y2="3"></line>
        </svg>
      )
    },
    {
      id: 2,
      title: "Data Science",
      description: "Analyze metrics, design ML algorithms, and deploy predictive models.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
          <circle cx="18" cy="10" r="2"></circle>
          <circle cx="12" cy="4" r="2"></circle>
          <circle cx="6" cy="14" r="2"></circle>
        </svg>
      )
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Design sleek wireframes, dynamic interfaces, and intuitive user experiences.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
          <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"></path>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategize SEO copy, execute digital ads, and build campaign conversion flows.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
        </svg>
      )
    },
    {
      id: 5,
      title: "Finance",
      description: "Manage investment strategies, analyze risks, and structure budgets.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    {
      id: 6,
      title: "Healthcare",
      description: "Oversee clinical operations, healthcare research, and health tech workflows.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      id: 7,
      title: "Business Management",
      description: "Direct corporate teams, handle program metrics, and lead product strategy.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 8,
      title: "Cybersecurity",
      description: "Secure data networks, audit firewalls, and prevent network vulnerabilities.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="categories" className="sh-section sh-categories">
      <div className="sh-container">
        <div className="sh-section-title-wrap">
          <span className="sh-section-subtitle">Categories</span>
          <h2 className="sh-section-title">Explore Career Sectors</h2>
          <p className="sh-section-description">
            Find details on salaries, job outlooks, and development pathways across industry domains.
          </p>
        </div>

        <div className="sh-categories-grid">
          {categories.map((cat) => (
            <Link to="/careers" key={cat.id} className="sh-cat-card">
              <div className="sh-cat-icon">
                {cat.icon}
              </div>
              <h3 className="sh-cat-title">{cat.title}</h3>
              <p className="sh-cat-desc">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerCategories;
