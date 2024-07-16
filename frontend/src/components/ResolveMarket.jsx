import React, { useState } from 'react';
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
}

export default ResolveMarket;
