import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingHome from "./WeddingHome";
import Login from "./sections/Login"
import "./App.css";
import GuestList from "./sections/GuestList";

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
          path="/login-lista" 
          element={<Login />}
        />
        <Route 
          path="/lista-invitati" 
          element={<GuestList />}
        />
      </Routes>
    </Router>
  );
}

export default App;