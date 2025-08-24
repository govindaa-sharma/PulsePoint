// App.jsx
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header.jsx";
// import HeroSection from "./components/HeroSection.jsx";
// import FeaturesSection from "./components/FeaturesSection.jsx";
// import Footer from "./components/Footer.jsx";
// // import DashboardPage from './dashboard/DashboardPage.jsx';

// import LoginSignupPage from "./pages/LoginSignupPage.jsx";

// //Feature components
// import VirtualConsultation from "./components/virtualDocConsult/VirtualConsultation.jsx";
// import HealthCampComponent from "./components/healthCampaign/HealthCampaign.jsx"
// import Chatbot from "./components/chatbot/ChatFront.jsx"
// import DrawingTest from "./components/drawingTest/DrawingTest.jsx"
// import MRITumorAnalyzerRedirect from "./components/diagonsis/MRITumorAnalyzerRedirect.jsx"

// // Import the new page components
// import AboutPage from "./pages/AboutPage";
// import ServicesPage from "./pages/ServicesPage";
// import DoctorsPage from "./pages/DoctorsPage";
// import ProfilePage from "./pages/ProfilePage";
// import ContactPage from "./pages/ContactPage";
// import CommunityHealthWatch from "./components/CommunityHealthWatch.js"; // Import the new component

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const handleLogin = (userData, token) => {
//     setIsLoggedIn(true);
//     setUserData(userData);
//     // Store token in localStorage or context for API requests
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("userData", JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserData(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userData");
//   };

//   // Check if user is logged in on app load (for page refresh)
//   React.useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const storedUserData = localStorage.getItem("userData");

//     if (token && storedUserData) {
//       setIsLoggedIn(true);
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <Header
//           isLoggedIn={isLoggedIn}
//           userData={userData}
//           onLogout={handleLogout}
//         />
//         <main>
//           <Routes>
//             {/* Home route shows all your existing components */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <HeroSection />
//                   <FeaturesSection />
//                   {/* <DashboardPage /> */}
//                 </>
//               }
//             />
//             {/* Feature routes */}
//             <Route
//               path="/virtual-consultation"
//               element={<VirtualConsultation />}
//             />
//             // In your App.jsx routes section
//             <Route
//               path="/virtual-consultation"
//               element={<VirtualConsultation />}
//             />
//             <Route
//               path="/chatbot"
//               element={<Chatbot />}
//             />
//             <Route
//               path="/parkinsons-test"
//               element={<DrawingTest />}
//             />
//             <Route
//               path="/health-campaign"
//               element={<HealthCampComponent />}
//             />
            
//             {/* Other routes show individual pages */}
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route
//               path="/community-health-watch"
//               element={<CommunityHealthWatch />}
//             />
//             <Route path="/doctors" element={<DoctorsPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             {/* Login/Signup route */}
//             <Route
//               path="/login"
//               element={<LoginSignupPage onLogin={handleLogin} />}
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header.jsx';
// import HeroSection from './components/HeroSection.jsx';
// import FeaturesSection from './components/FeaturesSection.jsx';
// import Footer from './components/Footer.jsx';
// import LoginSignupPage from './pages/LoginSignupPage.jsx';

// // Import the new page components
// import AboutPage from './pages/AboutPage';
// import ServicesPage from './pages/ServicesPage';
// import DoctorsPage from './pages/DoctorsPage';
// import ProfilePage from './pages/ProfilePage';
// import ContactPage from './pages/ContactPage';
// import CommunityHealthWatch from './components/CommunityHealthWatch.js';

// // Import feature components
// import VirtualConsultation from './components/virtualDocConsult/VirtualConsultation.jsx';
// import HealthCampaign from './components/HealthCampaign.jsx';
// import EmergencyLessons from './components/EmergencyLessons.jsx';
// import Feedback from './components/Feedback.jsx';
// import DataMarketplace from './components/DataMarketplace.jsx';
// import Chatbot from './components/Chatbot.jsx';
// import ParkinsonsTest from './components/ParkinsonsTest.jsx';
// import Diagnosis from './components/Diagnosis.jsx';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const handleLogin = (userData, token) => {
//     setIsLoggedIn(true);
//     setUserData(userData);
//     // Store token in localStorage or context for API requests
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userData', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserData(null);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//   };

//   // Check if user is logged in on app load (for page refresh)
//   React.useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const storedUserData = localStorage.getItem('userData');

//     if (token && storedUserData) {
//       setIsLoggedIn(true);
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <Header isLoggedIn={isLoggedIn} userData={userData} onLogout={handleLogout} />
//         <main>
//           <Routes>
//             {/* Home route shows all your existing components */}
//             <Route path="/" element={
//               <>
//                 <HeroSection />
//                 <FeaturesSection />
//               </>
//             } />

//             {/* Feature routes */}
//             <Route path="/health-campaign" element={<HealthCampaign />} />
//             <Route path="/emergency-lessons" element={<EmergencyLessons />} />
//             <Route path="/auth" element={<LoginSignupPage onLogin={handleLogin} />} />
//             <Route path="/virtual-consultation" element={<VirtualConsultation />} />
//             <Route path="/feedback" element={<Feedback />} />
//             <Route path="/data-marketplace" element={<DataMarketplace />} />
//             <Route path="/chatbot" element={<Chatbot />} />
//             <Route path="/parkinsons-test" element={<ParkinsonsTest />} />
//             <Route path="/diagnosis" element={<Diagnosis />} />

//             {/* Other routes show individual pages */}
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route path="/community-health-watch" element={<CommunityHealthWatch />} />
//             <Route path="/doctors" element={<DoctorsPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/profile" element={<ProfilePage />} />

//             {/* Login/Signup route */}
//             <Route
//               path="/login"
//               element={<LoginSignupPage onLogin={handleLogin} />}
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




// App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import Footer from "./components/Footer.jsx";
// import DashboardPage from './dashboard/DashboardPage.jsx';

import LoginSignupPage from "./pages/LoginSignupPage.jsx";

//Feature components
import VirtualConsultation from "./components/virtualDocConsult/VirtualConsultation.jsx";
import HealthCampComponent from "./components/healthCampaign/HealthCampaign.jsx"
import Chatbot from "./components/chatbot/ChatFront.jsx"
import DrawingTest from "./components/drawingTest/DrawingTest.jsx"
import MRITumorAnalyzerRedirect from "./components/diagonsis/MRITumorAnalyzerRedirect.jsx"
import FirstAidPlatform from "./components/emergency-lessons/FirstAidPlatform.jsx"
import FeedbackPage from "./components/feedback/FeedbackPage.jsx"

// Import the new page components
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import DoctorsPage from "./pages/DoctorsPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import CommunityHealthWatch from "./components/CommunityHealthWatch.js"; // Import the new component
import HealthcareLocator from "./components/nearest_healthcare/HealthcareLocator.jsx"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData, token) => {
    setIsLoggedIn(true);
    setUserData(userData);
    // Store token in localStorage or context for API requests
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  // Check if user is logged in on app load (for page refresh)
  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("userData");

    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          userData={userData}
          onLogout={handleLogout}
        />
        <main>
          <Routes>
            {/* Home route shows all your existing components */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                  {/* <DashboardPage /> */}
                </>
              }
            />
            {/* Feature routes */}
            <Route
              path="/virtual-consultation"
              element={<VirtualConsultation />}
            />
            <Route
              path="/chatbot"
              element={<Chatbot />}
            />
            <Route
              path="/parkinsons-test"
              element={<DrawingTest />}
            />
            <Route
              path="/health-campaign"
              element={<HealthCampComponent />}
            />
            {/* Add the MRI Tumor Analyzer route */}
            <Route
              path="/mri-tumor-analyzer"
              element={<MRITumorAnalyzerRedirect />}
            />
            <Route
              path="/emergency-lessons"
              element={<FirstAidPlatform />}
            />
            <Route
              path="/feedback"
              element={<FeedbackPage />}
            />
            <Route
              path="/nearest-healthcare"
              element={<HealthcareLocator />}
            />
            <Route
              path="/mri-tumor-analyzer"
              element={<MRITumorAnalyzerRedirect />}
            />
            
            {/* Other routes show individual pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/community-health-watch"
              element={<CommunityHealthWatch />}
            />
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