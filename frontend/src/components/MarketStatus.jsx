import React, { useState, useEffect } from 'react';

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
            <h3>{market.Description}, Market ID: {market._id}</h3>
            <p>Number of Options: {market.numOptions}</p>
            <ul>
              {market.Options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketStatus;
