// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="card job-seeker-card">
        <Link to="/user/home">
          <h2>Job Seeker</h2>
          <p>Find your dream job now!</p>
        </Link>
      </div>
      <div className="card recruiter-card">
        <Link to="/recruiter/home">
          <h2>Recruiter</h2>
          <p>Post job listings and manage applications</p>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
