import React, { useState } from 'react';
import "./PlaceBet.css"; 

function PlaceBet() {
  const [marketDescription, setMarketDescription] = useState('');
  const [email, setEmail] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [option, setOption] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/place-bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marketDescription,
          email,
          ethAmount: parseFloat(ethAmount),
          option,
          walletAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error placing bet:', error);
      setMessage('Error placing bet');
    }
  };

  return (
    <div className="container">
      <h1>Place Bet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Market Description"
          value={marketDescription}
          onChange={(e) => setMarketDescription(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="ETH Amount"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PlaceBet;
