import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Simple Greeting Card */}
      <section id="home" className="bg-white border border-gray-200 p-6 rounded-xl shadow-xs space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Hi, I'm Sahan 👋</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Welcome to the Day 02 React + TypeScript Workshop! This simple project shows how to organize React folders cleanly.
        </p>
      </section>

      <section>
        <h2>Our Teams</h2>
        <ul>
          <li>Sahan Madusha</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
  );
};
