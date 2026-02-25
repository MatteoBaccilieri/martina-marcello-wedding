import React from 'react';
import Calendar from 'react-calendar';
import {MapPin} from 'lucide-react';
import '../App.css';
import '../styles/LocationSection.css'

const LocationSection = ({weddingDate}) => {

return (
      <section id="location" className="section section-rose">
      <div className="card card-location">
        <div className="calendar-section">
          <h3 className="calendar-month">
          {weddingDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="calendar-wrapper">
            <Calendar 
              value={weddingDate}
              showNavigation={false}
              showNeighboringMonth={false}
              locale="it-IT"
              tileDisabled={() => true}
              className="wedding-calendar"
            />
          </div>
        </div>
        
        <div className="location-info">
          <MapPin className="section-icon" />
          <p className="wedding-date">29 Agosto 2026</p>
          <h3 className="location-name">Podere Calvanella</h3>
          <p className='location-address'>Via Calvanella, 7 </p>
          <p className="location-city">San Clemente - Monterenzio (BO)</p>
        </div>
      </div>
    </section>
    );
};

export default LocationSection;