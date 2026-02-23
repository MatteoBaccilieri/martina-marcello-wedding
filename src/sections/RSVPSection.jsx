import React from 'react';
import '../App.css';
import '../styles/RSVPSection.css'

const RSVPSection = () => {
    return(
        <section className="section section-light">
        <div className="card">
          <h2 className="section-title light">Conferma Presenza</h2>
          <p className="text text-center">
            Vi preghiamo di confermare la vostra presenza entro il 30 giugno 2026
          </p>
          
          <form className="rsvp-form">
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input type="text" className="form-input" placeholder="Il tuo nome" />
              </div>

              <div className="form-group">
                <label className="form-label">Cognome</label>
                <input type="text" className="form-input" placeholder="Il tuo cognome" />
            </div>

            <div className="form-group">
              <label className="form-label">Restrizioni alimentari</label>
              <textarea className="form-input textarea" placeholder="Allergie o preferenze alimentari..."></textarea>
            </div>

            <div className="form-group" style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary">Aggiungi altro partecipante</button>
            </div>
            
            <button type="submit" className="btn btn-accent">Conferma Partecipazione</button>
          </form>
        </div>
      </section>
    );
}

export default RSVPSection;