import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to CryptoBetting...</h1>
      <p>Select a feature from below to get started.</p>
      <div className="home-buttons">
        <Link to="/create-market" className="btn"><span className="text">Create Market</span></Link>
        <Link to="/place-bet" className="btn"><span className="text">Place Bet</span></Link>
        <Link to="/market-status" className="btn"><span className="text">Market Status</span></Link>
        <Link to="/resolve-market" className="btn"><span className="text">Resolve Market</span></Link>
      </div>
    </div>
  );
}

export default Home;
