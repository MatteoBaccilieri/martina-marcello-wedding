import React from 'react';
import { Heart, ChevronDown} from 'lucide-react';
import '../styles/HeroSection.css'
import '../App.css';

const HeroSection = () => {

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

return (
      <section className="section section-hero">
        <div className="card hero-card">
          <Heart className="icon-heart" fill="currentColor" />
          <p className="wedding-subtitle">Siamo lieti di annunciare il nostro matrimonio</p>
          <h1 className="wedding-title">Martina & Marcello</h1>
          
          <button onClick={() => scrollToSection('details')} className="scroll-btn">
            <ChevronDown className="scroll-icon" />
          </button>
        </div>
      </section>
    );
};

export default HeroSection