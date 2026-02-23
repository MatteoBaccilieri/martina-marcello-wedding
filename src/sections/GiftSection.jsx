import React from 'react';
import {Gift} from 'lucide-react';
import '../App.css';
import '../styles/GiftSection.css'

const GiftSection = () => {
    return (
    <section className="section section-rose">
        <div className="card text-center">
          <Gift className="section-icon" />
          <h2 className="section-title">Lista Nozze</h2>
          <p className="text">
            La vostra presenza è il regalo più grande che potremmo desiderare.</p>
          <p className="text">
            Se volete aiutarci a realizzare il viaggio dei nostri sogni, trovate qui la nostra lista nozze.< br />
            Per accedere alla lista nozze è richiesto nome utente (MARTINAMARCELLO) nella sezione 'Accesso Invitati'
          </p>
          <button className="btn btn-primary">Visualizza Lista Nozze</button>
        </div>
    </section>
    );
};

export default GiftSection;