import React from 'react';
import { useState } from "react";
import '../App.css';
import '../styles/RSVPSection.css'

const RSVPSection = () => {
    const [participants, setParticipants] = useState([
      { nome: "", cognome: "", restrizioni_alimentari: "" }
    ]);

    const addParticipant = () => {
      setParticipants([
        ...participants,
        { nome: "", cognome: "", restrizioni_alimentari: "" }
      ]);
    };


    const updateParticipant = (index, field, value) => {
      const updated = [...participants];
      updated[index][field] = value;
      setParticipants(updated);
    };


    // 👉 invio al backend (Vercel API)
    const submitForm = async (e) => {
      e.preventDefault();
      
      const hasValidParticipant = participants.some(
        (p) => p.nome.trim() || p.cognome.trim() || p.restrizioni_alimentari.trim()
      );

      if (!hasValidParticipant) {
        alert("❌ Inserisci almeno un partecipante prima di confermare!");
        return; // Esci senza fare la chiamata
      }

      try {
        const res = await fetch("https://martina-marcello-backend.vercel.app/api/rsvp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ participants })
        });

        if (!res.ok) {
          throw new Error("Errore nella richiesta");
        }

        const data = await res.json();
        console.log(data);

        if (data.success) {
          setParticipants([{ nome: "", cognome: "", restrizioni_alimentari: "" }]);
          alert("✅ Partecipazione confermata!");
        } else {
          throw new Error(data.error || "Errore generico");
        }
      } catch (err) {
        console.error(err);
        alert("❌ Si è verificato un errore. Riprova.");
      }
    };
    return(
        <section className="section section-light">
        <div className="card">
          <h2 className="section-title light">Conferma Presenza</h2>
          <p className="text text-center">
            Vi preghiamo di confermare la vostra presenza entro il 30 giugno 2026
          </p>
          
          <form className="rsvp-form" onSubmit={submitForm}>
            {participants.map((p, index) => (
              <div key={index} className="participant-box">
                <div className="form-group">
                  <label className="form-label">Nome</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Il tuo nome" 
                    value={p.nome}
                    onChange={(e) => updateParticipant(index, "nome", e.target.value)}
                    required 
                    onInvalid={(e) => e.target.setCustomValidity("Per favore riempi tutti i campi")}
                    onInput={(e) => e.target.setCustomValidity("")}/>
                </div>

                <div className="form-group">
                  <label className="form-label">Cognome</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Il tuo cognome"
                    value={p.cognome}
                    onChange={(e) => updateParticipant(index, "cognome", e.target.value)} 
                    required 
                    onInvalid={(e) => e.target.setCustomValidity("Per favore riempi tutti i campi")}
                    onInput={(e) => e.target.setCustomValidity("")}/>
              </div>

              <div className="form-group">
                <label className="form-label">Restrizioni alimentari</label>
                <textarea 
                  className="form-input textarea"
                  placeholder="Allergie o preferenze alimentari..."
                  value={p.restrizioni_alimentari}
                  onChange={(e) => updateParticipant(index, "restrizioni_alimentari", e.target.value)}>
                  </textarea>
              </div>
              </div>
            ))}

            <div className="form-group" style={{ textAlign: 'center' }}>
              <button type='button' className="btn btn-primary" onClick={addParticipant}>Aggiungi altro partecipante</button>
              <button type="submit" className="btn btn-accent" onSubmit={submitForm}>Conferma Partecipazione</button>
            </div>
          </form>
        </div>
      </section>
    );
}

export default RSVPSection;