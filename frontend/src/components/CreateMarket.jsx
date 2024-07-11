import React, { useState } from 'react';

function CreateMarket() {
  const [Description, setDescription] = useState('');
  const [NumOptions, setNumOptions] = useState('');
  const [Options, setOptions] = useState(['']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...Options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...Options, '']);
  };

  const removeOptionField = (index) => {
    const newOptions = Options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Description,
        numOptions: parseInt(NumOptions), 
        Options
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data saved:', data);
      setDescription('');
      setNumOptions('');
      setOptions(['']);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container">
      <h1>Create Market</h1>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          type="text"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label>Number of Options</label>
        <input
          type="number"
          value={NumOptions}
          onChange={(e) => setNumOptions(e.target.value)}
          placeholder="Num of Options"
        />
        {Options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <button type="button" onClick={() => removeOptionField(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addOptionField}>Add Option</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateMarket;
