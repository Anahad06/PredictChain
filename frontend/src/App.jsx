import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import MarketStatus from './components/MarketStatus';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null); // Store user information

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">PredictChain</div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </header>
        <div className="content">
          {user && <p>Hi, {user.name}!</p>} {/* Display welcome message */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-market" element={<CreateMarket />} />
            <Route path="/place-bet" element={<PlaceBet />} />
            <Route path="/market-status" element={<MarketStatus />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
