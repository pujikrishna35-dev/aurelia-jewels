import React from 'react';
import { Quote, Star } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { TESTIMONIALS } from '../data/testimonials';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionTitle
          subtitle="WHAT OUR STUDENTS SAY"
          title="Real Stories from Scholars Across the Globe"
          description="Hear how GSF Global Scholar Finance helped students achieve their study abroad ambitions with zero stress."
        />

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="quote-icon-box">
                <Quote size={24} />
              </div>

              <div className="star-rating">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#F5A623" stroke="#F5A623" />
                ))}
              </div>

              <p className="testimonial-quote">"{item.quote}"</p>

              <div className="testimonial-author-row">
                <img src={item.image} alt={item.name} className="author-avatar" />
                <div className="author-details">
                  <h4>{item.name}</h4>
                  <p>{item.location}</p>
                  <span>{item.university}</span>
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
