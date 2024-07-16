import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/account', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return <div>{error || 'Please log in to view your account.'}</div>;
  }

  return (
    <div className="account-container">
      <h1>Account Information</h1>
      <p>Email: {user.email}</p>
      <p>ETH: {user.ETH}</p>
      <h2>Bets</h2>
      <ul>
        {user.bets.map((bet, index) => (
          <li key={index}>
            Market: {bet.market}, Amount: {bet.amount}, Option: {bet.option}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Account;
