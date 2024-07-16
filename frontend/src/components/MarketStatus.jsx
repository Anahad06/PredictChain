import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MarketStatus() {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/ret-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMarkets(data))
      .catch(error => {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Market Status</h1>
      <ul>
<<<<<<< HEAD
        {marketData.map((market, index) => (
          <li key={index}>
            <Link to={`/market/description/${market.description}`}>
              <h3>{market.description}</h3>
            </Link>
=======
        {markets.map(market => (
          <li key={market._id}>
            <Link to={`/market/${market.description}`}>{market.description}</Link>
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketStatus;
