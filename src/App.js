import React, {useEffect, useState} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WeddingHome from "./WeddingHome";
import Login from "./sections/Login"
import "./App.css";
import GuestList from "./sections/GuestList";


// Component to handle hash routing from subdirectory
function InitialRedirect() {
  const [hasRedirected, setHasRedirected] = useState(false);
  
  useEffect(() => {
    if (hasRedirected) return;
    
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    
    // If we're in a subdirectory with a hash, redirect to root with same hash
    if (pathname !== '/' && hash && !hasRedirected) {
      setHasRedirected(true);
      window.location.replace('/' + hash);
    }
  }, [hasRedirected]);
  
  return null;
}

function App() {
  const weddingDate = new Date(2026, 7, 29, 17, 0, 0);

  return (
    <Router>
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