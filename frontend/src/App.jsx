import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [Description, setDescription] = useState('');
  const [NumOptions, setNumOptions] = useState('');
  const [Options, setOptions] = useState(['']); 
  const [marketData, setMarketData] = useState([]);
  const [marketIndex, setMarketIndex] = useState(0);  

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

    fetch('http://localhost:5000/api/data', { // Ensure the correct URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Description,
        numOptions: parseInt(NumOptions), // Ensure NumOptions is sent as a number
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
      fetchMarketData(); // Fetch the latest data after submitting
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Function to fetch market data from the server
  const fetchMarketData = () => {
    fetch('http://localhost:5000/api/ret-data') // Ensure the correct URL
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

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Create Market</label>
        <input
          type="text"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
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

      <h2>Market Data</h2>
      <ul>
        {marketData.map((market, index) => (
            <h3>{market.Description}, {index}</h3>
        ))}
      </ul>
    </div>
  );
}

export default App;
