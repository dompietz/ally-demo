import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-title">Welcome, User</div>
      <input type="text" placeholder="Search..." className="navbar-search" />
    </header>
  );
};

export default Navbar;
