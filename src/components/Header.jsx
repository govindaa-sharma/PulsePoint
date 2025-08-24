

// // Header.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from './Button.jsx';
// import { User, LogOut, ChevronDown, MapPin } from 'lucide-react';

// // Heartbeat Icon
// const HeartbeatIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//   </svg>
// );

// const Header = ({ isLoggedIn, userData, onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogoutClick = () => {
//     onLogout();
//     setShowDropdown(false);
//   };

//   return (
//     <header className="header bg-white shadow-md py-4 relative">
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <Link to="/" className="logo flex items-center space-x-2">
//           <HeartbeatIcon />
//           <h1 className="text-xl font-bold text-blue-600">Pulse-Point</h1>
//         </Link>
//         <nav className="nav-menu flex space-x-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
//           <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
//           <Link to="/community-health-watch" className="text-gray-700 hover:text-blue-600 transition-colors">Community Health Watch</Link>
          
//           {/* New link for Nearest Hospitals & Pharmacies */}
//           <Link to="/nearest-healthcare" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
//             <MapPin className="w-4 h-4 mr-1" />
//             Nearest Healthcare
//           </Link>
          
//           <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
//         </nav>
        
//         {isLoggedIn ? (
//           <div className="relative">
//             <button 
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-2 transition-colors"
//             >
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-gray-700 font-medium">{userData?.name}</span>
//               <ChevronDown className="w-4 h-4 text-gray-500" />
//             </button>
            
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                 <div className="px-4 py-2 border-b border-gray-100">
//                   <p className="text-sm text-gray-700">{userData?.email}</p>
//                 </div>
//                 <Link 
//                   to="/profile" 
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Profile
//                 </Link>
//                 <Link 
//                   to="/appointments" 
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Appointments
//                 </Link>
//                 <Link 
//                   to="/settings" 
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Settings
//                 </Link>
//                 <button
//                   onClick={handleLogoutClick}
//                   className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link to="/login">
//             <Button type="primary">Login / Sign Up</Button>
//           </Link>
//         )}
//       </div>
      
//       {/* Close dropdown when clicking outside */}
//       {showDropdown && (
//         <div 
//           className="fixed inset-0 z-40" 
//           onClick={() => setShowDropdown(false)}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;



// // Header.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from './Button.jsx';
// import { User, LogOut, ChevronDown, MapPin } from 'lucide-react';
// import { ConnectButton } from '@rainbow-me/rainbowkit';

// // Heartbeat Icon
// const HeartbeatIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//   </svg>
// );

// const Header = ({ isLoggedIn, userData, onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogoutClick = () => {
//     onLogout();
//     setShowDropdown(false);
//   };

//   return (
//     <header className="header bg-white shadow-md py-4 relative">
//       <div className="container mx-auto flex items-center justify-between px-4">
//         {/* Logo */}
//         <Link to="/" className="logo flex items-center space-x-2">
//           <HeartbeatIcon />
//           <h1 className="text-xl font-bold text-blue-600">Pulse-Point</h1>
//         </Link>

//         {/* Navigation */}
//         <nav className="nav-menu flex space-x-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
//           <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
//           <Link to="/community-health-watch" className="text-gray-700 hover:text-blue-600 transition-colors">Community Health Watch</Link>

//           {/* New link for Nearest Hospitals & Pharmacies */}
//           <Link to="/nearest-healthcare" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
//             <MapPin className="w-4 h-4 mr-1" />
//             Nearest Healthcare
//           </Link>

//           <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
//         </nav>

//         {/* Wallet + Auth Section */}
//         <div className="flex items-center space-x-4">
//           <ConnectButton /> {/* RainbowKit wallet button */}

//           {isLoggedIn ? (
//             <div className="relative">
//               <button 
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-2 transition-colors"
//               >
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-gray-700 font-medium">{userData?.name}</span>
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               </button>
              
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                   <div className="px-4 py-2 border-b border-gray-100">
//                     <p className="text-sm text-gray-700">{userData?.email}</p>
//                   </div>
//                   <Link 
//                     to="/profile" 
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                     onClick={() => setShowDropdown(false)}
//                   >
//                     Profile
//                   </Link>
//                   <Link 
//                     to="/appointments" 
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                     onClick={() => setShowDropdown(false)}
//                   >
//                     Appointments
//                   </Link>
//                   <Link 
//                     to="/settings" 
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
//                     onClick={() => setShowDropdown(false)}
//                   >
//                     Settings
//                   </Link>
//                   <button
//                     onClick={handleLogoutClick}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
//                   >
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login">
//               <Button type="primary">Login / Sign Up</Button>
//             </Link>
//           )}
//         </div>
//       </div>
      
//       {/* Close dropdown when clicking outside */}
//       {showDropdown && (
//         <div 
//           className="fixed inset-0 z-40" 
//           onClick={() => setShowDropdown(false)}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;



// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { User, LogOut, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Heartbeat Icon
const HeartbeatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Header = ({ isLoggedIn, userData, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    setShowDropdown(false);
  };

  return (
    <header className="header bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo and mobile menu button */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="logo flex items-center space-x-2">
            <HeartbeatIcon />
            <h1 className="text-xl font-bold text-blue-600">Pulse-Point</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex nav-menu space-x-4 lg:space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors py-2">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Services</Link>
          <Link to="/community-health-watch" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Community Health</Link>
          
          <Link to="/nearest-healthcare" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center py-2">
            <MapPin className="w-4 h-4 mr-1" />
            Nearest
          </Link>
          
          <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Doctors</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Contact</Link>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40">
            <nav className="flex flex-col px-4 py-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/community-health-watch" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Community Health</Link>
              
              <Link to="/nearest-healthcare" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center py-2" onClick={() => setMobileMenuOpen(false)}>
                <MapPin className="w-4 h-4 mr-1" />
                Nearest Healthcare
              </Link>
              
              <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Doctors</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}

        {/* Wallet + Auth Section */}
        <div className="flex items-center space-x-4">
          <ConnectButton /> {/* RainbowKit wallet button */}

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-2 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium hidden sm:inline-block">{userData?.name}</span>
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
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
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
      </div>
    </header>
  );
};

export default Header;