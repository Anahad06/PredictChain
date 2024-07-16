import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to PredictChain</h1>
      <p>Bet on the outcomes of future events using cryptocurrency. Our platform uses AI to provide insights and predictions to inform your decisions.</p>
      <div className="feature-buttons">
        <Link to="/create-market" className="btn"><span className="text">Create Market</span></Link>
        <Link to="/place-bet" className="btn"><span className="text">Place Bet</span></Link>
        <Link to="/market-status" className="btn"><span className="text">Market Status</span></Link>
        <Link to="/resolve-market" className="btn"><span className="text">Resolve Market</span></Link>
      </div>
      <div className="features-container">
        <div className="feature">
          <h3>Speed ⚡</h3>
          <p>We removed unnecessary graphics, icons, and images. PredictChain loads quickly on weak internet connections.</p>
        </div>
        <div className="feature">
          <h3>Ease 🖋</h3>
          <p>Simple interface that doesn't distract. Your data is stored in the format you write it in. Backup is available anytime.</p>
        </div>
        <div className="feature">
          <h3>Flexibility 📅</h3>
          <p>Create and manage markets with ease. Publish under your custom domain. We take care of the data hosting.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
