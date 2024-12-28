import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './HomePage.css';

const AuctionPage = () => {
  const location = useLocation();
  const players = location.state?.players || [];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [bids, setBids] = useState([10, 10]);
  const [totalPurse, setTotalPurse] = useState([1000, 1000]);
  const [biddingStopped, setBiddingStopped] = useState(false);
  const [lastBidTeam, setLastBidTeam] = useState(null);
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });
  const [auctionCompleted, setAuctionCompleted] = useState(false);

  // Check if there are less than 12 players
  if (players.length < 12) {
    return <h1>At least 12 players are required to start the auction!</h1>;
  }

  const handleBidChange = (team, amount) => {
    const updatedBids = [...bids];
    const updatedPurse = [...totalPurse];

    if (updatedPurse[team] >= amount) {
      updatedBids[team] = amount;
      setBids(updatedBids);
      setLastBidTeam(team);
    } else {
      alert('Insufficient funds');
    }
  };

  const stopBidding = () => {
    if (lastBidTeam !== null) {
      setBiddingStopped(true);
      alert(`Player sold to Team ${lastBidTeam === 0 ? 'A' : 'B'}`);
    } else {
      alert('No bids have been placed yet.');
    }
  };

  const sellPlayer = () => {
    if (lastBidTeam !== null) {
      const updatedTeams = { ...teams };
      updatedTeams[lastBidTeam === 0 ? 'teamA' : 'teamB'].push(players[currentPlayerIndex].name);
      setTeams(updatedTeams);

      const updatedPurse = [...totalPurse];
      updatedPurse[lastBidTeam] -= bids[lastBidTeam];
      setTotalPurse(updatedPurse);

      nextPlayer();
    }
  };

  const nextPlayer = () => {
    if (currentPlayerIndex + 1 < players.length) {
      setBiddingStopped(false);
      setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
      setBids([10, 10]);
      setLastBidTeam(null);
    } else {
      setAuctionCompleted(true);
    }
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="auction-page">
      <h1>Labbar Panthu Auction</h1>

      {auctionCompleted ? (
        <div className="team-details">
          <h2>Auction Completed</h2>
          <h3>Team A</h3>
          <ul>
            {teams.teamA.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>

          <h3>Team B</h3>
          <ul>
            {teams.teamB.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="auction-container">
          <h2>Current Player for Auction</h2>
          <p>
            {currentPlayer.name} ({currentPlayer.role})
          </p>

          <div className="bid-section">
            <label>Team A Bid:</label>
            <input
              type="number"
              value={bids[0]}
              onChange={(e) => handleBidChange(0, parseInt(e.target.value))}
              disabled={biddingStopped}
            />
            <p>Purse: {totalPurse[0]}</p>
          </div>

          <div className="bid-section">
            <label>Team B Bid:</label>
            <input
              type="number"
              value={bids[1]}
              onChange={(e) => handleBidChange(1, parseInt(e.target.value))}
              disabled={biddingStopped}
            />
            <p>Purse: {totalPurse[1]}</p>
          </div>

          <div className="button-group">
            <button onClick={stopBidding} disabled={biddingStopped}>
              Stop Bidding
            </button>
            <button onClick={sellPlayer} disabled={!biddingStopped}>
              Sell Player
            </button>
          </div>

          <div className="next-player-section">
            <button onClick={nextPlayer}>Next Player</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionPage;
