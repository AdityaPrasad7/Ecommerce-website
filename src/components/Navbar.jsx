// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {username}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
