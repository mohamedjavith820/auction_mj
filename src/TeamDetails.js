import React from 'react';
import { useHistory } from 'react-router-dom';

const TeamDetails = ({ team, teamDetails }) => {
  const history = useHistory();
  const teamData = teamDetails[team];

  return (
    <div>
      <h2>{team} Details</h2>
      <p>Purse: ${teamData.purse}</p>
      <ul>
        {teamData.players.map((player, index) => (
          <li key={index}>
            {player.name} - ${player.price}
          </li>
        ))}
      </ul>
      <button onClick={() => history.push('/')}>Back to Auction</button>
    </div>
  );
};

export default TeamDetails;
