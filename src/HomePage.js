import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="HomePage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <div>
        <h1>Welcome to Labbar Panthu</h1>
        <div>
          <button style={{ marginRight: '10px' }}>
            <Link to="/auction">Create Auction</Link>
          </button>
          <button>
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
