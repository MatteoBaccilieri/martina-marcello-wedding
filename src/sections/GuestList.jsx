import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GuestList.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import stoormtrooper from '../assets/images/stoormtrooper.png';
import galactic_empire_logo from '../assets/images/galactic-empire-logo.png';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const closeHologram = () => {
    setShowHologram(false);
  };
  const [showHologram, setShowHologram] = useState(false);
  const [hologramPhase, setHologramPhase] = useState('logged');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login-lista");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await fetch("https://martina-marcello-backend.vercel.app/api/rsvp");
        const data = await res.json();

        if (data.success) {
          setGuests(data.data);
        }
      } catch (err) {
        console.error("Errore:", err);
      }
    };

    fetchGuests();
  }, []);

  const exportToExcel = () => {
    // Prepara i dati da salvare
    const exportData = guests.map(guest => ({
      Nome: guest.nome,
      Cognome: guest.cognome,
      'Restrizioni Alimentari': guest.restrizioni_alimentari,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GuestList");

    // Converte il workbook in un blob
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, "guest-list.xlsx");
  };

  const logout = async (e) => {
   e.preventDefault();

  setHologramPhase('logout');
  localStorage.removeItem("auth");
  setShowHologram(true);

  setTimeout(() => {
    navigate("/login-lista");
    setShowHologram(false);
  }, 4000);
  }

  return (
    <div className="imperial-database">
      <div className="hyperspeed"></div>
      <div className="data-stream"></div>
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
                {hologramPhase === 'logout' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="12 2 12 22 22 12 12 2"></polyline>
                  </svg>
                )}
              </div>

              <h2 className="hologram-title">
                {hologramPhase === 'logout' ? 'CONNESSIONE TERMINATA' : 'CONNESSO...'}
              </h2>

              <p className="hologram-text">
                {hologramPhase === 'logout'
                  ? `Il Comandante si è disconnesso`
                  : 'Comandante connesso...'}
              </p>

              <p className="hologram-subtext">
                {hologramPhase === 'logout'
                  ? 'Che la Forza ti accompagni nel tuo viaggio.'
                  : 'Autenticazione in corso'}
              </p>

              <div className="hologram-coordinates">
                <span>
                  {hologramPhase === 'logout'
                    ? 'SISTEMA IMPERIALE DISCONNESSO'
                    : 'SISTEMA IMPERIALE CONNESSO'}
                </span>
                <span className="coord-blink">
                  {hologramPhase === 'logout' ? 'SCANSIONE COMPLETATA' : 'CRITTO'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay scanline terminale */}
      <div className="scanlines-terminal"></div>

      {/* Info sistema in alto a destra */}
      <div className="system-info">
        <span>SYS: ONLINE</span>
        <span>SEC: LEVEL 1</span>
        <span>DB: GUEST_LIST_V1</span>
      </div>

      {/* logo imperiale in alto */}
      <div className="sw-header-image-placeholder">
        <img src={galactic_empire_logo} alt="" style={{width: "100%"}}/>
      </div>

      <div className="sw-table-container">
        <div className="sw-table-header">
          <h1 className="sw-title">REGISTRO OSPITI</h1>
          <div className="title-underline"></div>
          <p className="sw-subtitle">Cerimonia Imperiale - Database Alimentazione</p>
        </div>

        {/* Wrapper tabella */}
        <div className="sw-table-wrapper">
          <table className="sw-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Restrizioni Alimentari</th>
                <th className="col-status">Status</th>
              </tr>
            </thead>
            <tbody>
            {guests.map((guest, index) => (
              <tr key={index} className={index % 2 === 0 ? 'row-dark' : 'row-darker'}>
                <td className="cell-name">{guest.nome}</td>
                <td className="cell-name">{guest.cognome}</td>
                <td className="cell-diet">
                  <div className="diet-content">
                    <span>{guest.restrizioni_alimentari}</span>
                  </div>
                </td>
                <td className="cell-status">
                  <span className="status-badge confirmed">
                    Confermato
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        {/* Decorazioni laterali placeholder */}
        <div className="sw-side-decoration left">
          <img src={stoormtrooper} alt="" style={{width: "100%"}}/>
        </div>
        <div className="sw-side-decoration right">
          <img src={stoormtrooper} alt="" style={{width: "100%"}}/>
        </div>

        {/* Footer azioni */}
        <div className="sw-table-actions">
          <button className="holo-button small" onClick={exportToExcel}>
            Esporta Dati
          </button>
          <button className="holo-button small" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestList;