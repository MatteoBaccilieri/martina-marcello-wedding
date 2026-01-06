import React from "react";
import Countdown from "./Countdown";
import AddToCalendar from "./AddToCalendar";
import "./App.css";


function App() {
  // Set your wedding date
  const weddingDate = new Date(2026, 7, 29, 17, 0, 0);

  return (
    <div className="App">
      <div className="overlay">
        <h1>Save the date</h1>

        <Countdown weddingDate={weddingDate} />
        <AddToCalendar weddingDate={weddingDate}/>
        <div><h4>Martina & Marcello</h4></div>
      </div>
    </div>
  );
}

export default App;
