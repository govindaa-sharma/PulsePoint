import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import Footer from './components/Footer.jsx';

// Import the new dashboard component
import DashboardPage from './dashboard/DashboardPage.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;