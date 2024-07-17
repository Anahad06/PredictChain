import React, { useState, useEffect } from 'react';
import './MarketStatus.css';

function MarketStatus() {
  const [marketData, setMarketData] = useState([]);

  const fetchMarketData = () => {
    fetch('http://localhost:5000/api/ret-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMarketData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Recent Markets</h1>
      <div className="market-list">
        {marketData.map((market, index) => (
          <div key={index} className="market-item">
            <h2 className="market-name">{market.description}</h2>
            <h2 className="market-options">Options: {market.options.join(", ")}</h2>
            <h2 className="market-winning-option">Winning Option: {market.WinningOption}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketStatus;
