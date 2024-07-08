import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import MarketStatus from './components/MarketStatus';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-market">Create Market</Link></li>
            <li><Link to="/place-bet">Place Bet</Link></li>
            <li><Link to="/market-status">Market Status</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-market" element={<CreateMarket />} />
          <Route path="/place-bet" element={<PlaceBet />} />
          <Route path="/market-status" element={<MarketStatus />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
