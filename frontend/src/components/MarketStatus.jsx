import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <h1>Market Status</h1>
      <ul>
        {marketData.map((market, index) => (
          <li key={index}>
            <Link to={`/market/description/${market.description}`}>
              <h3>{market.description}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketStatus;
