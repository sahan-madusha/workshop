import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-xs">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">React Workshop</h1>
        <nav className="flex space-x-6 text-sm text-gray-600 font-medium">
          <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#folders" className="hover:text-blue-600 transition-colors">Folders</a>
          <a href="#students" className="hover:text-blue-600 transition-colors">Students</a>
        </nav>
      </div>
    </header>
  );
};
