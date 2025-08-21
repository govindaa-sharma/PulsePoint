// import React from 'react';
// import './App.css';
// import Header from './components/Header.jsx';
// import HeroSection from './components/HeroSection.jsx';
// import FeaturesSection from './components/FeaturesSection.jsx';
// import Footer from './components/Footer.jsx';

// // Import the new dashboard component
// import DashboardPage from './dashboard/DashboardPage.jsx';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <main>
//         <HeroSection />
//         <FeaturesSection />
//         <DashboardPage />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;




// App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header.jsx';
// import HeroSection from './components/HeroSection.jsx';
// import FeaturesSection from './components/FeaturesSection.jsx';
// import Footer from './components/Footer.jsx';
// import DashboardPage from './dashboard/DashboardPage.jsx';

// // Import the new page components
// import AboutPage from './pages/AboutPage';
// import ServicesPage from './pages/ServicesPage';
// import DoctorsPage from './pages/DoctorsPage';
// import ContactPage from './pages/ContactPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <main>
//           <Routes>
//             {/* Home route shows all your existing components */}
//             <Route path="/" element={
//               <>
//                 <HeroSection />
//                 <FeaturesSection />
//                 <DashboardPage />
//               </>
//             } />
//             {/* Other routes show individual pages */}
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route path="/doctors" element={<DoctorsPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import Footer from './components/Footer.jsx';
import DashboardPage from './dashboard/DashboardPage.jsx';
import LoginSignupPage from './pages/LoginSignupPage.jsx';

// Import the new page components
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData, token) => {
    setIsLoggedIn(true);
    setUserData(userData);
    // Store token in localStorage or context for API requests
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Check if user is logged in on app load (for page refresh)
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} userData={userData} onLogout={handleLogout} />
        <main>
          <Routes>
            {/* Home route shows all your existing components */}
            <Route path="/" element={
              <>
                <HeroSection />
                <FeaturesSection />
                {/* <DashboardPage /> */}
              </>
            } />
            {/* Other routes show individual pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Login/Signup route */}
            <Route 
              path="/login" 
              element={<LoginSignupPage onLogin={handleLogin} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;