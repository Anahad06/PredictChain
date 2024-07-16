import React, { useState } from 'react';
import './CreateMarket.css'; 

function CreateMarket() {
  const [description, setDescription] = useState('');
  const [numOptions, setNumOptions] = useState('');
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleOptionAdd = () => {
    if (optionInput.trim() !== '') {
      setOptions([...options, optionInput]);
      setOptionInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (options.length !== parseInt(numOptions)) {
      setMessage('Number of options does not match the options provided.');
      return;
    }

    const marketData = {
      description,  
      numOptions: parseInt(numOptions),
      options,
      bets: {}, 
      password
    };

    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data saved:', data);
      setMessage('Market created successfully');
      setDescription('');
      setPassword(''); 
      setNumOptions('');
      setOptions([]);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Error creating market');
    }
  };

  return (
    <div className="container">
      <h1>Create Market</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Number of Options" 
          value={numOptions} 
          onChange={(e) => setNumOptions(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Option" 
          value={optionInput} 
          onChange={(e) => setOptionInput(e.target.value)} 
        />
        <button type="button" onClick={handleOptionAdd}>Add Option</button>
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <button type="submit">Create Market</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateMarket;
