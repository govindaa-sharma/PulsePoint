// import React from 'react';
// import './Header.css';
// import Button from './Button.jsx';

// // --- Heartbeat Icon (Moved into this file) ---
// const HeartbeatIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//     </svg>
// );

// const Header = () => {
//     return (
//         <header className="header">
//             <div className="container header-container">
//                 <div className="logo">
//                     <HeartbeatIcon />
//                     <h1>HealthCare</h1>
//                 </div>
//                 <nav className="nav-menu">
//                     <a href="#home">Home</a>
//                     <a href="#about">About</a>
//                     <a href="#services">Services</a>
//                     <a href="#doctors">Doctors</a>
//                     <a href="#contact">Contact</a>
//                 </nav>
//                 <Button type="primary">Login / Sign Up</Button>
//             </div>
//         </header>
//     );
// };

// export default Header;


// Header.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from './Button.jsx';

// // Heartbeat Icon
// const HeartbeatIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//   </svg>
// );

// const Header = () => {
//   return (
//     <header className="header bg-white shadow-md py-4">
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <Link to="/" className="logo flex items-center space-x-2">
//           <HeartbeatIcon />
//           <h1 className="text-xl font-bold text-blue-600">HealthCare</h1>
//         </Link>
//         <nav className="nav-menu flex space-x-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
//           <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
//           <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
//         </nav>
//         <Button type="primary">Login / Sign Up</Button>
//       </div>
//     </header>
//   );
// };

// export default Header;



// 2nd Header , Working totally
// Header.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from './Button.jsx';

// // Heartbeat Icon
// const HeartbeatIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//   </svg>
// );

// const Header = () => {
//   return (
//     <header className="header bg-white shadow-md py-4">
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <Link to="/" className="logo flex items-center space-x-2">
//           <HeartbeatIcon />
//           <h1 className="text-xl font-bold text-blue-600">HealthCare</h1>
//         </Link>
//         <nav className="nav-menu flex space-x-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
//           <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
//           <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
//         </nav>
//         <Button type="primary">Login / Sign Up</Button>
//       </div>
//     </header>
//   );
// };

// export default Header;



// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { User, LogOut, ChevronDown } from 'lucide-react';

// Heartbeat Icon
const HeartbeatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Header = ({ isLoggedIn, userData, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    setShowDropdown(false);
  };

  return (
    <header className="header bg-white shadow-md py-4 relative">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="logo flex items-center space-x-2">
          <HeartbeatIcon />
          <h1 className="text-xl font-bold text-blue-600">HealthCare</h1>
        </Link>
        <nav className="nav-menu flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
          <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
        </nav>
        
        {isLoggedIn ? (
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-2 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium">{userData?.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-700">{userData?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/appointments" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowDropdown(false)}
                >
                  Appointments
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowDropdown(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button type="primary">Login / Sign Up</Button>
          </Link>
        )}
      </div>
      
      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;