import React, { useState } from 'react';
import axios from 'axios';

function ResolveMarket() {
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [winningOption, setWinningOption] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/resolve-market', {
        description,
        password,
        winningOption
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resolving market');
      console.error('Error resolving market:', error);
    }
  };

  return (
    <div>
      <h1>Resolve Market</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Market Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Winning Option:</label>
          <input type="text" value={winningOption} onChange={(e) => setWinningOption(e.target.value)} required />
        </div>
        <button type="submit">Resolve Market</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResolveMarket;
