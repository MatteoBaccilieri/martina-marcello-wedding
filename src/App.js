import React from "react";
import Countdown from "./Countdown";
import "./App.css";


function App() {
  // Set your wedding date
  const weddingDate = new Date("2026-08-29T17:00:00");

  return (
    <div className="App">
      <div className="overlay">
        <h1>Save the Date</h1>
        <Countdown weddingDate={weddingDate} />
        <small>Martina & Marcello</small>
      </div>
    </div>
  );
}

export default App;
