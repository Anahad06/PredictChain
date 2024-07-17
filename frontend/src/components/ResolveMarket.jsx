import React, { useState } from 'react';
import './ResolveMarket.css'; 

function ResolveMarket() {
    const [description, setDescription] = useState(''); 
    const [winningOption, setWinningOption] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [message, setUpdateMessage] = useState(''); 

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
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setUpdateMessage("Resolved Market!"); 
        })
        .catch((error) => {
            console.error('Error:', error);
            setUpdateMessage("Error resolving market");
        });
    }

    return (
        <div className='container'>
            <h1>Resolve Market</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Market Name"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Winning Option"
                    value={winningOption}
                    onChange={(e) => setWinningOption(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ResolveMarket;
