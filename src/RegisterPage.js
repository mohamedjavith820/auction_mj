import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('Batsman');
  const navigate = useNavigate();

  const addPlayer = () => {
    // Validation for empty name
    if (!playerName.trim()) {
      alert('Player name cannot be empty!');
      return;
    }

    // Add player details
    setPlayers([...players, { name: playerName, role: playerRole }]);

    // Reset form fields
    setPlayerName('');
    setPlayerRole('Batsman');
  };

  const startAuction = () => {
    if (players.length !== 12 && players.length !== 14) {
      alert('You need exactly 12 or 14 players to start the auction!');
      return;
    }
    // Navigate to auction page and pass player details
    navigate('/auction', { state: { players } });
  };

  const removePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Register Players</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <select
          value={playerRole}
          onChange={(e) => setPlayerRole(e.target.value)}
        >
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>
        <button type="button" onClick={addPlayer} style={{ marginLeft: '10px' }}>
          Add Player
        </button>
      </form>

      <h2>Registered Players</h2>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.role}</td>
              <td>
                <button onClick={() => removePlayer(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Players: {players.length} / 12 or 14</p>

      <button
        onClick={startAuction}
        disabled={players.length !== 12 && players.length !== 14}
        style={{ marginTop: '20px' }}
      >
        Start Auction
      </button>
    </div>
  );
};

export default RegisterPage;
