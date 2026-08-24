import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

const StudyDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1200) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, DESTINATIONS.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="destinations-section">
      <div className="destinations-container">
        {/* Header Row with Centered Info & Controls */}
        <div className="destinations-header-row">
          <div className="destinations-title-block">
            <span className="destinations-eyebrow">POPULAR STUDY DESTINATIONS</span>
            <h2 className="destinations-heading">Where Do You Want to Study?</h2>
            <p className="destinations-subtitle-text">
              We help you explore education loan options for top study destinations worldwide.
            </p>
          </div>

          <div className="destinations-controls">
            <button
              className={`destinations-arrow-btn ${currentIndex === 0 ? 'disabled' : ''}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous Destination"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`destinations-arrow-btn ${currentIndex >= maxIndex ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next Destination"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div className="destinations-viewport">
          <div
            className="destinations-track"
            style={{
              '--current-index': currentIndex
            }}
          >
            {DESTINATIONS.map((dest) => (
              <div key={dest.id} className="destination-card">
                {/* Destination Image Area */}
                <div className="destination-image-box">
                  <img src={dest.image} alt={`Study in ${dest.name}`} />
                  <div className="destination-flag-pill">
                    <span className="flag-emoji">{dest.flag}</span>
                    <span className="flag-name">{dest.name}</span>
                  </div>
                  <div className="destination-max-badge">{dest.maxLoan}</div>
                </div>

                {/* Card Content */}
                <div className="destination-card-body">
                  <div className="destination-card-header">
                    <h3 className="destination-card-title">{dest.name}</h3>
                    <span className="destination-card-country">{dest.subtitle}</span>
                  </div>

                  <p className="destination-card-desc">{dest.description}</p>

                  <div className="destination-target-box">
                    <span className="target-label">Target Courses:</span> {dest.popularCourses}
                  </div>

                  <div className="destination-card-footer">
                    <Link to={dest.link} className="destination-action-link">
                      <span>Explore Loan Options</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;
