import React, { useState, useEffect } from 'react';
import './App.css';
import { HeroSection, LocationSection, DetailsSection, TimelineSection, GiftSection, RSVPSection, AddToCalendar, Countdown, Footer } from "./sections";

const WeddingHome = ({ weddingDate }) => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="wedding-container">
      <HeroSection />
      <LocationSection weddingDate={weddingDate} />
      <DetailsSection />
      <TimelineSection />
      <GiftSection />
      <RSVPSection />
      <div className="overlay">
        <h1>Save the date</h1>
        <Countdown weddingDate={weddingDate} />
        <AddToCalendar weddingDate={weddingDate} />
      </div>
      <Footer />
    </div>
  );
};

export default WeddingHome;