import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CareerCategories from '../components/CareerCategories';
import Mentors from '../components/Mentors';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import '../styles/landing-page.css';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // SEO Optimization: Set descriptive title and meta tag
    document.title = "SkillHive Digital | Discover Your Ideal Career Path & Build Future Skills";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content', 
      'SkillHive Digital helps students identify cognitive strengths, explore high-growth careers, connect with verified mentors, and master targeted technical and soft skills.'
    );

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sh-landing-page">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Career Categories Section */}
      <CareerCategories />

      {/* Mentor Showcase Section */}
      <Mentors />

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonial Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
