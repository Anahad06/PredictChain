import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import MarketStatus from './components/MarketStatus';
<<<<<<< HEAD
=======
import ResolveMarket from './components/ResolveMarket';
import MarketDetail from './components/MarketDetail';
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
import Login from './components/Login';
import Signup from './components/Signup';
import ResolveMarket from './components/ResolveMarket'; 

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState(null);   
=======
  const [user, setUser] = useState(null);
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">PredictChain</div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-market">Create Market</Link>
            <Link to="/place-bet">Place Bet</Link>
            <Link to="/market-status">Market Status</Link>
            <Link to="/resolve-market">Resolve Market</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </header>
        <div className="content">
<<<<<<< HEAD
=======
          {user && <p>Hi, {user.name}!</p>}
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-market" element={<CreateMarket />} />
            <Route path="/resolve-market" element={<ResolveMarket />} />
            <Route path="/place-bet" element={<PlaceBet />} />
            <Route path="/market-status" element={<MarketStatus />} />
<<<<<<< HEAD
=======
            <Route path="/resolve-market" element={<ResolveMarket />} />
            <Route path="/market/:description" element={<MarketDetail />} />
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
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
