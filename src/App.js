import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingHome from "./WeddingHome";
import "./App.css";

function App() {
  const weddingDate = new Date(2026, 7, 29, 17, 0, 0);

  return (
    <Router basename="/martina-marcello-wedding">
      <Routes>
        <Route 
          path="/" 
          element={<WeddingHome weddingDate={weddingDate} />} 
        />
        <Route 
          path="/lista-invitati" 
          element={<WeddingHome weddingDate={weddingDate} />}
        />
      </Routes>
    </Router>
  );
}

export default App;