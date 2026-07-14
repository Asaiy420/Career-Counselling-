import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  university: string;
  review: string;
  rating: number;
  initials: string;
}

const Testimonials: React.FC = () => {
  const testimonialsList: Testimonial[] = [
    {
      id: 1,
      name: "Liam Carter",
      university: "Stanford University",
      review: "SkillHive completely changed how I approached my career search. The AI recommendations pointed me toward cloud engineering, and the mentor calls helped me secure my first internship!",
      rating: 5,
      initials: "LC"
    },
    {
      id: 2,
      name: "Sophia Martinez",
      university: "New York University",
      review: "I was torn between design and business. Taking the SkillHive cognitive assessment and speaking with Google design mentors gave me the confidence to focus on UI/UX design.",
      rating: 5,
      initials: "SM"
    },
    {
      id: 3,
      name: "Ethan Chen",
      university: "University of Toronto",
      review: "The skill development roadmaps are incredibly detailed. It helped me map out exactly what projects and languages I needed to master for Data Science. 10/10 platform!",
      rating: 5,
      initials: "EC"
    }
  ];

  return (
    <section id="resources" className="sh-section sh-testimonials">
      <div className="sh-container">
        <div className="sh-section-title-wrap">
          <span className="sh-section-subtitle">Reviews</span>
          <h2 className="sh-section-title">What Our Students Say</h2>
          <p className="sh-section-description">
            Read stories from students who found their optimal paths and built real skills.
          </p>
        </div>

        <div className="sh-testimonials-grid">
          {testimonialsList.map((test) => (
            <div key={test.id} className="sh-test-card">
              {/* Star Rating */}
              <div className="sh-test-stars">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="sh-test-review">"{test.review}"</p>

              {/* Author Details */}
              <div className="sh-test-author">
                <div className="sh-test-avatar-placeholder">
                  {test.initials}
                </div>
                <div className="sh-test-info">
                  <h4 className="sh-test-name">{test.name}</h4>
                  <span className="sh-test-univ">{test.university}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
