import React from 'react';
import { Heart} from 'lucide-react';
import '../styles/HeroSection.css'
import '../App.css';

const HeroSection = () => {
return (
      <section className="section section-hero">
        <div className="card hero-card">
          <div className="wedding-subsection">
            <Heart className="icon-heart" fill="currentColor" />
            <p className="wedding-subtitle">Siamo lieti di annunciare il nostro matrimonio</p>
          </div>
          <h1 className="wedding-title">Martina & Marcello</h1>
        </div>
      </section>
    );
};

export default HeroSection