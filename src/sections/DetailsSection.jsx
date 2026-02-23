import React from 'react';
import {MapPin} from 'lucide-react';
import '../App.css';
import '../styles/DetailsSection.css'

const DetailsSection = () =>{

    return (
        <section id="indicazioni" className="section section-rose">
            <div className="card">
                <h2 className="section-title">Come Arrivare</h2>
                <p className='text text-center'><b>Si consiglia di seguire il percorso indicato per evitare strade secondarie non asfaltate.</b></p>
                
                <div className="location-card">
                    <MapPin className="card-icon" />
                    <h3 className="card-title">In Auto</h3>
                    <p className="card-text">
                    Una volta arrivati a Castel San Pietro Terme<br/>
                    Prendere SP21 direzione Villaggio della Salute Più<br/>
                    </p>
                
                </div>

            <div className="map-container" style={{ marginTop: '30px', textAlign: 'center' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17605.463581784265!2d11.467430942058721!3d44.33188413007643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132b2e597ff5669d%3A0xb4d40a1e6a6ae75d!2sLocation%20B%26B%20Podere%20Calvanella!5e0!3m2!1sit!2sit!4v1771699104717!5m2!1sit!2sit" 
                width="100%" 
                height="350" 
                style={{ border: 0, borderRadius: '15px', marginBottom: '20px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              <a 
                href="https://maps.app.goo.gl/HX4JF2hdxC7atyPn9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apri Google Maps
              </a>
            </div>
          </div>
        </section>
    );
};

export default DetailsSection;