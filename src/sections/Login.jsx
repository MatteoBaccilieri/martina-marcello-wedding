import React, { useState, useEffect } from 'react';
import '../styles/StarWarsLogin.css';
import { useNavigate } from "react-router-dom";

const StarWarsLogin = () => {
  const [formData, setFormData] = useState({
    designazione: '',
    codiceAccesso: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showHologram, setShowHologram] = useState(false);
  const [hologramPhase, setHologramPhase] = useState('connecting');
  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("auth")) {
        navigate("/lista-invitati");
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setHologramPhase('connecting');

    try {
      const res = await fetch(
        "https://martina-marcello-backend.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.designazione,
            password: formData.codiceAccesso
          })
        }
      );
      
      const data = await res.json();
      console.log(data)

      if (data.success) {
        setHologramPhase('granted');
        localStorage.setItem("auth", "true");

        setTimeout(() => {
          navigate("/lista-invitati")
        }, 2000);

      } else {
        setHologramPhase('denied');
      }

    } catch (err) {
      console.error("Errore:", err);
      setHologramPhase('denied');
    } finally {
      setIsLoading(false);
      setShowHologram(true);

      setTimeout(() => {
        setShowHologram(false);
      }, 4000);
    }
  };

  const closeHologram = () => {
    setShowHologram(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowHologram(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="galaxy-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="vader-silhouette"></div>

      {/* OLOGRAMMA */}
      {showHologram && (
        <div className="hologram-overlay" onClick={closeHologram}>
          <div
            className={`hologram-modal ${hologramPhase} active`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hologram-scanlines"></div>
            <div className="hologram-flicker"></div>

            <div className="hologram-content">
              <div className="hologram-icon">
                {hologramPhase === 'granted' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                )}
              </div>

              <h2 className="hologram-title">
                {hologramPhase === 'granted'
                  ? 'ACCESSO CONCESSO'
                  : hologramPhase === 'denied'
                  ? 'ACCESSO NEGATO'
                  : 'CONNESSIONE...'}
              </h2>

              <p className="hologram-text">
                {hologramPhase === 'granted'
                  ? `Benvenuto, Comandante ${formData.designazione || 'Sconosciuto'}`
                  : 'Credenziali non valide'}
              </p>

              <p className="hologram-subtext">
                {hologramPhase === 'granted'
                  ? 'Che la Forza sia con te.'
                  : 'Accesso rifiutato dal sistema imperiale'}
              </p>

              <div className="hologram-coordinates">
                <span>
                  {hologramPhase === 'granted'
                    ? 'COLLEGAMENTO SICURO STABILITO'
                    : 'ERRORE DI AUTENTICAZIONE'}
                </span>
                <span className="coord-blink">
                  {hologramPhase === 'granted' ? 'CRIPTATO' : 'NEGATO'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="login-wrapper">
        <div className="logo-container">
          <h1 className="sw-title">IDENTIFICAZIONE</h1>
          <div className="title-underline"></div>
          <p className="sw-subtitle">Ufficio Sicurezza Imperiale</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* USERNAME */}
          <div className="input-group">
            <label className="input-label">DESIGNAZIONE</label>
            <div className={`input-wrapper ${focusedField === 'designazione' ? 'active' : ''}`}>
              <input
                type="text"
                value={formData.designazione}
                onChange={(e) =>
                  setFormData({ ...formData, designazione: e.target.value })
                }
                onFocus={() => setFocusedField('designazione')}
                onBlur={() => setFocusedField(null)}
                className="sw-input"
                placeholder="Inserisci il tuo nominativo"
                required
              />
              <div className="lightsaber-border blue"></div>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label className="input-label">CODICE DI ACCESSO</label>
            <div className={`input-wrapper ${focusedField === 'codice' ? 'active' : ''}`}>
              <input
                type="password"
                value={formData.codiceAccesso}
                onChange={(e) =>
                  setFormData({ ...formData, codiceAccesso: e.target.value })
                }
                onFocus={() => setFocusedField('codice')}
                onBlur={() => setFocusedField(null)}
                className="sw-input"
                placeholder="••••••••"
                required
              />
              <div className="lightsaber-border blue"></div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className={`holo-button ${isLoading ? 'launching' : ''}`}
            disabled={isLoading}
          >
            <span className="button-text">
              {isLoading ? 'AUTENTICAZIONE...' : 'ACCESSO AL SISTEMA'}
            </span>
            <div className="button-glow"></div>
          </button>

        </form>
      </div>

      <div className="scanlines"></div>
    </div>
  );
};

export default StarWarsLogin;