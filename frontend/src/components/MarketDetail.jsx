import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';

function MarketDetail() {
  const { id } = useParams();
  const [market, setMarket] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/market/${id}`)
      .then(response => response.json())
      .then(data => {
        setMarket(data);
      })
      .catch(error => {
        console.error('Error fetching market:', error);
      });
  }, [id]);

  if (!market) {
    return <div>Loading...</div>;
  }

  const betData = Object.values(market.bets).reduce((acc, bet) => {
    acc[bet.option] = (acc[bet.option] || 0) + bet.amount;
    return acc;
  }, {});

  const chartData = {
    labels: market.options,
    datasets: [
      {
        label: 'Amount Bet (ETH)',
        data: market.options.map(option => betData[option] || 0),
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(192,75,75,0.6)', 'rgba(75,75,192,0.6)'], // Add more colors if needed
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="market-detail">
      <h1>{market.description}</h1>
      <p>Number of Options: {market.numOptions}</p>
      <h2>Options:</h2>
      <ul>
        {market.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <h2>Bets:</h2>
      <ul>
        {Object.entries(market.bets).map(([email, bet], index) => (
          <li key={index}>
            {email}: {bet.amount} ETH on {bet.option}
          </li>
        ))}
      </ul>
      <h2>Bet Statistics</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default MarketDetail;
