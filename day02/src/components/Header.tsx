import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-xs">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">React Workshop</Link>
        <nav className="flex space-x-6 text-sm text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
};
