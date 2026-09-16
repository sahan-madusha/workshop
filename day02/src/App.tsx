import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col justify-between font-sans">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
