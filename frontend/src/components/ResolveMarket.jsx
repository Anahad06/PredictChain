import React, { useState } from 'react';
<<<<<<< HEAD
import './CreateMarket.css'; 

function ResolveMarket() {
    const [description, setDescription] = useState(''); 
    const [winningOption, setWinningOption] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            description,
            WinningOption: winningOption,
            password
        };

        fetch('http://localhost:5000/api/getInfo', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'  // Correct header key
            }, 
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='container'>
            <h1>Resolve Market</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Market Name</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Winning Option</label>
                    <input type="text" value={winningOption} onChange={(e) => setWinningOption(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
=======
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
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
}

export default ResolveMarket;
