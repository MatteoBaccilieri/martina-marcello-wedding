import React from 'react';
import '../App.css';
import '../styles/Footer.css'

const Footer = () => {

return (
  <section className="section section-light footer-section">
    <div className="footer">
        <div className='footer-divider'></div>      
        <p className="footer-copyright">
            © 2026 Tutti i diritti riservati
        </p>
      
        <p className="footer-powered">
            Powered by <span className="footer-heart">Matteo Baccilieri</span>
      </p>
    </div>
  </section>
);
};

export default Footer