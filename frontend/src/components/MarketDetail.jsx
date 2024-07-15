import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MarketDetail() {
  const { description } = useParams();
  const [market, setMarket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/markets/description/${description}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMarket(data))
      .catch(error => {
        setError('Error fetching market data');
        console.error('Error fetching market data:', error);
      });
  }, [description]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!market) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{market.description}</h1>
      <p>Number of Options: {market.numOptions}</p>
      <p>Total Bets: {Object.keys(market.bets).length}</p>
      <h2>Options:</h2>
      <ul>
        {market.options.map((option, index) => (
          <li key={index}>{option}: {Object.values(market.bets).filter(bet => bet.option === option).length} bets</li>
        ))}
      </ul>
      <h2>Bets:</h2>
      <ul>
        {Object.entries(market.bets).map(([email, bet], index) => (
          <li key={index}>
            {email.replace(/_/g, '.')} : {bet.amount} ETH on {bet.option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketDetail;

