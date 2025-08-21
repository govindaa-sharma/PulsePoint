// // pages/ProfilePage.jsx
// import React from 'react';

// const ProfilePage = () => {
//   const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
        
//         <div className="bg-white rounded-lg shadow-md p-8">
//           <div className="flex items-center mb-6">
//             <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
//               {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
//               <p className="text-gray-600">{userData.email}</p>
//               <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h3 className="text-lg font-medium text-blue-800 mb-2">Personal Information</h3>
//               <p className="text-gray-700">Name: {userData.name}</p>
//               <p className="text-gray-700">Email: {userData.email}</p>
//             </div>
            
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h3 className="text-lg font-medium text-green-800 mb-2">Account Status</h3>
//               <p className="text-gray-700">Status: <span className="text-green-600 font-medium">Active</span></p>
//               <p className="text-gray-700">Member since: {userData.joinDate}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState, useEffect } from 'react';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Calendar, 
//   Edit3, 
//   Save, 
//   X, 
//   Camera,
//   Settings,
//   Shield,
//   Bell,
//   Globe,
//   Briefcase,
//   GraduationCap,
//   Heart,
//   Star,
//   Award,
//   Users,
//   LogOut
// } from 'lucide-react';

// const ProfilePage = ({ onLogout }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('about');
//   const [userData, setUserData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     location: '',
//     birthDate: '',
//     bio: '',
//     jobTitle: '',
//     company: '',
//     website: '',
//     education: '',
//     interests: ['React', 'Node.js', 'UI/UX Design', 'Photography', 'Traveling'],
//     joinDate: ''
//   });

//   const [tempData, setTempData] = useState(userData);

//   // Load user data from localStorage on component mount
//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       const parsedData = JSON.parse(storedUserData);
//       setUserData(prev => ({
//         ...prev,
//         firstName: parsedData.name?.split(' ')[0] || '',
//         lastName: parsedData.name?.split(' ')[1] || '',
//         email: parsedData.email || '',
//         joinDate: parsedData.joinDate || new Date().toLocaleDateString()
//       }));
//       setTempData(prev => ({
//         ...prev,
//         firstName: parsedData.name?.split(' ')[0] || '',
//         lastName: parsedData.name?.split(' ')[1] || '',
//         email: parsedData.email || '',
//         joinDate: parsedData.joinDate || new Date().toLocaleDateString()
//       }));
//     }
//   }, []);

//   const handleInputChange = (field, value) => {
//     setTempData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     const updatedUserData = {
//       ...userData,
//       ...tempData,
//       name: `${tempData.firstName} ${tempData.lastName}`.trim()
//     };
    
//     setUserData(updatedUserData);
//     setIsEditing(false);
    
//     // Update localStorage with new data
//     const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
//     localStorage.setItem('userData', JSON.stringify({
//       ...storedData,
//       name: `${tempData.firstName} ${tempData.lastName}`.trim(),
//       email: tempData.email
//     }));
//   };

//   const handleCancel = () => {
//     setTempData(userData);
//     setIsEditing(false);
//   };

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   const stats = [
//     { label: 'Projects', value: '24', icon: Briefcase },
//     { label: 'Followers', value: '1.2K', icon: Users },
//     { label: 'Following', value: '480', icon: Heart },
//     { label: 'Rating', value: '4.9', icon: Star }
//   ];

//   const tabs = [
//     { id: 'about', label: 'About', icon: User },
//     { id: 'activity', label: 'Activity', icon: Award },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (!userData.email) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200/50 overflow-hidden mb-6">
//           {/* Cover Photo */}
//           <div className="h-48 bg-gradient-to-r from-green-400 via-green-500 to-green-600 relative">
//             <div className="absolute inset-0 bg-black/20"></div>
//             <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
//               <Camera className="w-5 h-5 text-white" />
//             </button>
//           </div>

//           {/* Profile Info */}
//           <div className="relative px-8 pb-8">
//             {/* Avatar */}
//             <div className="absolute -top-16 left-8">
//               <div className="relative">
//                 <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
//                   <User className="w-16 h-16 text-white" />
//                 </div>
//                 <button className="absolute bottom-2 right-2 p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-lg">
//                   <Camera className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end pt-4 space-x-2">
//               {!isEditing ? (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
//                   >
//                     <Edit3 className="w-4 h-4" />
//                     <span>Edit Profile</span>
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
//                   >
//                     <Save className="w-4 h-4" />
//                     <span>Save</span>
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                     <span>Cancel</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* User Info */}
//             <div className="mt-8">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                   {isEditing ? (
//                     <div className="flex space-x-4 mb-4">
//                       <input
//                         type="text"
//                         value={tempData.firstName}
//                         onChange={(e) => handleInputChange('firstName', e.target.value)}
//                         className="px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                         placeholder="First Name"
//                       />
//                       <input
//                         type="text"
//                         value={tempData.lastName}
//                         onChange={(e) => handleInputChange('lastName', e.target.value)}
//                         className="px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                         placeholder="Last Name"
//                       />
//                     </div>
//                   ) : (
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                       {userData.firstName} {userData.lastName}
//                     </h1>
//                   )}
                  
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={tempData.jobTitle}
//                       onChange={(e) => handleInputChange('jobTitle', e.target.value)}
//                       className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent mb-2"
//                       placeholder="Job Title"
//                     />
//                   ) : (
//                     <p className="text-green-600 font-semibold text-lg mb-1">
//                       {userData.jobTitle || 'Update your job title'}
//                     </p>
//                   )}
                  
//                   <p className="text-gray-600">{userData.company || 'Update your company'}</p>
//                   <p className="text-sm text-gray-500 mt-1">Member since {userData.joinDate}</p>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 lg:mt-0">
//                   {stats.map((stat, index) => (
//                     <div key={index} className="text-center">
//                       <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
//                         <stat.icon className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div className="font-bold text-gray-800">{stat.value}</div>
//                       <div className="text-sm text-gray-600">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200/50">
//           <div className="border-b border-green-200">
//             <nav className="flex space-x-8 px-8">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-green-500 text-green-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <tab.icon className="w-5 h-5" />
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-8">
//             {activeTab === 'about' && (
//               <div className="space-y-8">
//                 {/* Bio */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
//                   {isEditing ? (
//                     <textarea
//                       value={tempData.bio}
//                       onChange={(e) => handleInputChange('bio', e.target.value)}
//                       rows={4}
//                       className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
//                       placeholder="Tell us about yourself..."
//                     />
//                   ) : (
//                     <p className="text-gray-600 leading-relaxed">
//                       {userData.bio || 'Add a bio to tell others about yourself...'}
//                     </p>
//                   )}
//                 </div>

//                 {/* Contact Info */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-center space-x-3">
//                       <Mail className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           value={tempData.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                         />
//                       ) : (
//                         <span className="text-gray-700">{userData.email}</span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <Phone className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="tel"
//                           value={tempData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                           placeholder="Phone number"
//                         />
//                       ) : (
//                         <span className="text-gray-700">
//                           {userData.phone || 'Add phone number'}
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <MapPin className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={tempData.location}
//                           onChange={(e) => handleInputChange('location', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                           placeholder="Location"
//                         />
//                       ) : (
//                         <span className="text-gray-700">
//                           {userData.location || 'Add your location'}
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <Calendar className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="date"
//                           value={tempData.birthDate}
//                           onChange={(e) => handleInputChange('birthDate', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                         />
//                       ) : (
//                         <span className="text-gray-700">
//                           {formatDate(userData.birthDate)}
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <Globe className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="url"
//                           value={tempData.website}
//                           onChange={(e) => handleInputChange('website', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                           placeholder="Website URL"
//                         />
//                       ) : (
//                         <span className="text-gray-700">
//                           {userData.website ? (
//                             <a href={`https://${userData.website}`} className="text-green-600 hover:underline">
//                               {userData.website}
//                             </a>
//                           ) : (
//                             'Add website'
//                           )}
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <GraduationCap className="w-5 h-5 text-green-600" />
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={tempData.education}
//                           onChange={(e) => handleInputChange('education', e.target.value)}
//                           className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                           placeholder="Education"
//                         />
//                       ) : (
//                         <span className="text-gray-700">
//                           {userData.education || 'Add your education'}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Interests */}
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {userData.interests.map((interest, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//                       >
//                         {interest}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'activity' && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
//                 <div className="space-y-4">
//                   {[
//                     { action: 'Completed project "E-commerce Platform"', time: '2 hours ago', icon: Briefcase },
//                     { action: 'Received 5-star rating from client', time: '1 day ago', icon: Star },
//                     { action: 'Updated profile information', time: '3 days ago', icon: User },
//                     { action: 'Joined new project team', time: '1 week ago', icon: Users }
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
//                       <div className="flex-shrink-0">
//                         <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                           <item.icon className="w-5 h-5 text-green-600" />
//                         </div>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-gray-800">{item.action}</p>
//                         <p className="text-sm text-gray-500">{item.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'settings' && (
//               <div className="space-y-8">
//                 <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
                
//                 <div className="space-y-6">
//                   {[
//                     { icon: Shield, title: 'Privacy & Security', description: 'Manage your privacy settings and security preferences' },
//                     { icon: Bell, title: 'Notifications', description: 'Control how and when you receive notifications' },
//                     { icon: User, title: 'Account Settings', description: 'Update your account information and preferences' },
//                     { icon: Globe, title: 'Language & Region', description: 'Set your language and regional preferences' }
//                   ].map((setting, index) => (
//                     <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                           <setting.icon className="w-5 h-5 text-green-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{setting.title}</h4>
//                           <p className="text-sm text-gray-600">{setting.description}</p>
//                         </div>
//                       </div>
//                       <div className="text-gray-400">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


// new and the final component
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { User, Calendar, Heart, Activity, Pill, FileText, Brain, Camera, AlertTriangle, Phone, MapPin, Mail, Edit3, Save, X, Settings, Shield, Bell, Globe, Briefcase, GraduationCap, Star, Award, Users, LogOut } from 'lucide-react';

const ProfilePage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    birthDate: '',
    bio: '',
    jobTitle: '',
    company: '',
    website: '',
    education: '',
    interests: [],
    joinDate: ''
  });

  const [tempData, setTempData] = useState(userData);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(prev => ({
        ...prev,
        firstName: parsedData.name?.split(' ')[0] || '',
        lastName: parsedData.name?.split(' ')[1] || '',
        email: parsedData.email || '',
        joinDate: parsedData.joinDate || new Date().toLocaleDateString()
      }));
      setTempData(prev => ({
        ...prev,
        firstName: parsedData.name?.split(' ')[0] || '',
        lastName: parsedData.name?.split(' ')[1] || '',
        email: parsedData.email || '',
        joinDate: parsedData.joinDate || new Date().toLocaleDateString()
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updatedUserData = {
      ...userData,
      ...tempData,
      name: `${tempData.firstName} ${tempData.lastName}`.trim()
    };
    
    setUserData(updatedUserData);
    setIsEditing(false);
    
    // Update localStorage with new data
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
    localStorage.setItem('userData', JSON.stringify({
      ...storedData,
      name: `${tempData.firstName} ${tempData.lastName}`.trim(),
      email: tempData.email
    }));
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Sample patient data
  const patientData = {
    name: `${userData.firstName} ${userData.lastName}`.trim() || "Sarah Johnson",
    id: "PT-2024-0157",
    age: 67,
    gender: "Female",
    bloodType: "O+",
    lastVisit: "March 15, 2024",
    nextAppt: "April 22, 2024"
  };

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'vitals', label: 'Vital Signs', icon: Heart },
    { id: 'parkinsons', label: "Parkinson's Assessment", icon: Brain },
    { id: 'imaging', label: 'AI Medical Imaging', icon: Camera },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Sample data for charts
  const vitalSignsData = {
    bloodPressure: [
      { date: '2024-01-15', systolic: 125, diastolic: 82 },
      { date: '2024-02-01', systolic: 130, diastolic: 85 },
      { date: '2024-02-15', systolic: 128, diastolic: 80 },
      { date: '2024-03-01', systolic: 135, diastolic: 88 },
      { date: '2024-03-15', systolic: 132, diastolic: 84 }
    ],
    heartRate: [
      { date: '2024-01-15', rate: 72 },
      { date: '2024-02-01', rate: 75 },
      { date: '2024-02-15', rate: 70 },
      { date: '2024-03-01', rate: 78 },
      { date: '2024-03-15', rate: 74 }
    ],
    glucose: [
      { date: '2024-01-15', level: 110 },
      { date: '2024-02-01', level: 125 },
      { date: '2024-02-15', level: 108 },
      { date: '2024-03-01', level: 132 },
      { date: '2024-03-15', level: 118 }
    ]
  };

  const stats = [
    { label: 'Visits', value: '24', icon: Briefcase },
    { label: 'Medications', value: '6', icon: Pill },
    { label: 'Assessments', value: '12', icon: Heart },
    { label: 'Rating', value: '4.9', icon: Star }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5 text-green-600" />
                  Contact Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{userData.phone || '(555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{userData.email || 'sarah.j@email.com'}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{userData.location || '123 Main St, City, State 12345'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                  Emergency Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Robert Johnson (Husband)</p>
                  <p className="text-gray-600">(555) 987-6543</p>
                </div>
              </div>
            </div>

            {/* Current Vitals */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="text-green-600 text-sm font-medium">Blood Pressure</div>
                  <div className="text-2xl font-bold text-green-700">132/84</div>
                  <div className="text-xs text-green-600">mmHg</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="text-blue-600 text-sm font-medium">Heart Rate</div>
                  <div className="text-2xl font-bold text-blue-700">74</div>
                  <div className="text-xs text-blue-600">bpm</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="text-orange-600 text-sm font-medium">Temperature</div>
                  <div className="text-2xl font-bold text-orange-700">98.6°F</div>
                  <div className="text-xs text-orange-600">Normal</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="text-purple-600 text-sm font-medium">Oxygen Sat</div>
                  <div className="text-2xl font-bold text-purple-700">98%</div>
                  <div className="text-xs text-purple-600">Normal</div>
                </div>
              </div>

              {/* Conditions and Allergies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Conditions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-sm">Type 2 Diabetes</span>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Managed</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-sm">Hypertension</span>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Controlled</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                      <span className="text-sm">Early-stage Parkinson's</span>
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">Monitoring</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Allergies</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Penicillin - Severe</span>
                    </div>
                    <div className="flex items-center p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Shellfish - Moderate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Blood Pressure Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Pressure Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={vitalSignsData.bloodPressure}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Heart Rate Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Heart Rate Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={vitalSignsData.heartRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#bfdbfe" name="Heart Rate (bpm)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Blood Glucose Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Glucose Levels</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={vitalSignsData.glucose}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="level" fill="#f97316" name="Glucose (mg/dL)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Vitals Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Readings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <span className="text-green-600 font-semibold">132/84 mmHg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <span className="text-blue-600 font-semibold">74 bpm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Blood Glucose</span>
                    <span className="text-orange-600 font-semibold">118 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">BMI</span>
                    <span className="text-purple-600 font-semibold">24.7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'parkinsons':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                Parkinson's Disease Assessment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Motor Symptoms */}
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">Motor Symptoms</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tremor</span>
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rigidity</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Minimal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bradykinesia</span>
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Postural Instability</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
                    </div>
                  </div>
                </div>

                {/* Non-Motor Symptoms */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Non-Motor Symptoms</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sleep Disturbances</span>
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Mild</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cognitive Changes</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Depression/Anxiety</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Autonomic Issues</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">None</span>
                    </div>
                  </div>
                </div>

                {/* Assessment Scores */}
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-3">Assessment Scores</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>UPDRS III</span>
                        <span className="font-semibold">18/108</span>
                      </div>
                      <div className="bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '16.7%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Hoehn & Yahr</span>
                        <span className="font-semibold">Stage 1</span>
                      </div>
                      <div className="bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>PDQ-39</span>
                        <span className="font-semibold">25/156</span>
                      </div>
                      <div className="bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '16%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Plan */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Current Treatment Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Medications</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Carbidopa/Levodopa 25-100mg TID</li>
                      <li>• Ropinirole 2mg BID</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Therapies</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Physical Therapy - Weekly</li>
                      <li>• Speech Therapy - Bi-weekly</li>
                      <li>• Exercise Program - Daily</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'imaging':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Camera className="mr-2 h-5 w-5 text-cyan-600" />
                AI Medical Imaging Analysis
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Scans */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Recent Scans</h4>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Brain MRI</span>
                      <span className="text-xs text-gray-500">March 10, 2024</span>
                    </div>
                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <span className="text-gray-500 text-sm">MRI Image Preview</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AI Analysis Status</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Complete</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">DaTscan</span>
                      <span className="text-xs text-gray-500">February 28, 2024</span>
                    </div>
                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <span className="text-gray-500 text-sm">DaTscan Image Preview</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AI Analysis Status</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Complete</span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Results */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">AI Analysis Results</h4>
                  
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">Brain MRI Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Brain Atrophy</span>
                        <span className="text-green-600 font-medium">Normal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>White Matter Changes</span>
                        <span className="text-yellow-600 font-medium">Mild</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Structural Abnormalities</span>
                        <span className="text-green-600 font-medium">None</span>
                      </div>
                      <div className="mt-3 p-2 bg-blue-100 rounded">
                        <p className="text-xs text-blue-800">
                          <strong>AI Confidence:</strong> 94% - Age-appropriate changes with minimal white matter hyperintensities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">DaTscan Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dopamine Transporter Density</span>
                        <span className="text-yellow-600 font-medium">Reduced</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Striatal Uptake Pattern</span>
                        <span className="text-orange-600 font-medium">Asymmetric</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Putamen/Caudate Ratio</span>
                        <span className="text-yellow-600 font-medium">1.2</span>
                      </div>
                      <div className="mt-3 p-2 bg-purple-100 rounded">
                        <p className="text-xs text-purple-800">
                          <strong>AI Confidence:</strong> 91% - Pattern consistent with early-stage Parkinson's disease.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">Recommendations</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Continue current treatment protocol</li>
                      <li>• Follow-up DaTscan in 12 months</li>
                      <li>• Consider MRI in 18 months</li>
                      <li>• Monitor symptom progression</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'medications':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Pill className="mr-2 h-5 w-5 text-green-600" />
                Current Medications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-800">Carbidopa/Levodopa</h4>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 25-100mg</p>
                    <p><strong>Frequency:</strong> Three times daily</p>
                    <p><strong>Purpose:</strong> Parkinson's symptoms</p>
                    <p><strong>Started:</strong> Jan 15, 2024</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-800">Ropinirole</h4>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 2mg</p>
                    <p><strong>Frequency:</strong> Twice daily</p>
                    <p><strong>Purpose:</strong> Dopamine agonist</p>
                    <p><strong>Started:</strong> Feb 1, 2024</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-800">Metformin</h4>
                    <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 1000mg</p>
                    <p><strong>Frequency:</strong> Twice daily</p>
                    <p><strong>Purpose:</strong> Type 2 Diabetes</p>
                    <p><strong>Started:</strong> Nov 10, 2023</p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-orange-800">Lisinopril</h4>
                    <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 10mg</p>
                    <p><strong>Frequency:</strong> Once daily</p>
                    <p><strong>Purpose:</strong> Hypertension</p>
                    <p><strong>Started:</strong> Oct 5, 2023</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-800">Atorvastatin</h4>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 20mg</p>
                    <p><strong>Frequency:</strong> Once daily</p>
                    <p><strong>Purpose:</strong> Cholesterol</p>
                    <p><strong>Started:</strong> Sep 20, 2023</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-800">Vitamin D3</h4>
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Dosage:</strong> 2000 IU</p>
                    <p><strong>Frequency:</strong> Once daily</p>
                    <p><strong>Purpose:</strong> Supplement</p>
                    <p><strong>Started:</strong> Aug 15, 2023</p>
                  </div>
                </div>
              </div>

              {/* Medication Schedule */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Daily Medication Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-700 mb-2">Morning (8:00 AM)</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Carbidopa/Levodopa 25-100mg</li>
                      <li>• Ropinirole 2mg</li>
                      <li>• Metformin 1000mg</li>
                      <li>• Lisinopril 10mg</li>
                      <li>• Vitamin D3 2000 IU</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-700 mb-2">Afternoon (2:00 PM)</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Carbidopa/Levodopa 25-100mg</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-700 mb-2">Evening (8:00 PM)</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Carbidopa/Levodopa 25-100mg</li>
                      <li>• Ropinirole 2mg</li>
                      <li>• Metformin 1000mg</li>
                      <li>• Atorvastatin 20mg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8">
            {/* Bio */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {userData.bio || 'Add a bio to tell others about yourself...'}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{userData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Phone number"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {userData.phone || 'Add phone number'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Location"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {userData.location || 'Add your location'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={tempData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {formatDate(userData.birthDate)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={tempData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Website URL"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {userData.website ? (
                        <a href={`https://${userData.website}`} className="text-green-600 hover:underline">
                          {userData.website}
                        </a>
                      ) : (
                        'Add website'
                      )}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Education"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {userData.education || 'Add your education'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view patient data</div>;
    }
  };

  if (!userData.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Patient Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-green-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{patientData.name}</h1>
                <p className="text-gray-600">Patient ID: {patientData.id}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span>{patientData.age} years old</span>
                  <span>•</span>
                  <span>{patientData.gender}</span>
                  <span>•</span>
                  <span>Blood Type: <span className="font-semibold text-red-600">{patientData.bloodType}</span></span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                Last Visit: {patientData.lastVisit}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Calendar className="h-4 w-4 mr-1" />
                Next Appointment: {patientData.nextAppt}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 mb-6 border border-gray-200 shadow-lg">
          <div className="flex space-x-2 overflow-x-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;



//componentwise breaked
// import React, { useState, useEffect } from 'react';
// import PatientHeader from '../components/profilePageComp/PatientHeader';
// import NavigationTabs from '../components/profilePageComp/PatientHeader';
// import OverviewTab from '../components/profilePageComp/tabs/OverviewTab';
// import VitalsTab from '../components/profilePageComp/tabs/VitalsTab';
// import ParkinsonsTab from '../components/profilePageComp/tabs/ParkinsonsTab';
// import ImagingTab from '../components/profilePageComp/tabs/ImagingTab';
// import MedicationsTab from '../components/profilePageComp/tabs/MedicationsTab';
// import ProfileTab from '../components/profilePageComp/tabs/ProfileTab';

// const ProfilePage = ({ onLogout }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     location: '',
//     birthDate: '',
//     bio: '',
//     jobTitle: '',
//     company: '',
//     website: '',
//     education: '',
//     interests: [],
//     joinDate: ''
//   });

//   const [tempData, setTempData] = useState({...userData});

//   // Load user data from localStorage on component mount
//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       const parsedData = JSON.parse(storedUserData);
//       const updatedUserData = {
//         ...userData,
//         firstName: parsedData.name?.split(' ')[0] || '',
//         lastName: parsedData.name?.split(' ')[1] || '',
//         email: parsedData.email || '',
//         joinDate: parsedData.joinDate || new Date().toLocaleDateString()
//       };
      
//       setUserData(updatedUserData);
//       setTempData(updatedUserData);
//     }
//   }, []);

//   const handleInputChange = (field, value) => {
//     setTempData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     const updatedUserData = {
//       ...userData,
//       ...tempData,
//       name: `${tempData.firstName} ${tempData.lastName}`.trim()
//     };
    
//     setUserData(updatedUserData);
//     setIsEditing(false);
    
//     // Update localStorage with new data
//     const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
//     localStorage.setItem('userData', JSON.stringify({
//       ...storedData,
//       name: `${tempData.firstName} ${tempData.lastName}`.trim(),
//       email: tempData.email
//     }));
//   };

//   const handleCancel = () => {
//     setTempData(userData);
//     setIsEditing(false);
//   };

//   // Sample patient data
//   const patientData = {
//     name: `${userData.firstName} ${userData.lastName}`.trim() || "Sarah Johnson",
//     id: "PT-2024-0157",
//     age: 67,
//     gender: "Female",
//     bloodType: "O+",
//     lastVisit: "March 15, 2024",
//     nextAppt: "April 22, 2024"
//   };

//   // Navigation items
//   const navItems = [
//     { id: 'overview', label: 'Overview', icon: 'User' },
//     { id: 'vitals', label: 'Vital Signs', icon: 'Heart' },
//     { id: 'parkinsons', label: "Parkinson's Assessment", icon: 'Brain' },
//     { id: 'imaging', label: 'AI Medical Imaging', icon: 'Camera' },
//     { id: 'medications', label: 'Medications', icon: 'Pill' },
//     { id: 'profile', label: 'Profile', icon: 'User' }
//   ];

//   if (!userData.email) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'overview':
//         return <OverviewTab userData={userData} />;
//       case 'vitals':
//         return <VitalsTab />;
//       case 'parkinsons':
//         return <ParkinsonsTab />;
//       case 'imaging':
//         return <ImagingTab />;
//       case 'medications':
//         return <MedicationsTab />;
//       case 'profile':
//         return (
//           <ProfileTab 
//             userData={userData} 
//             tempData={tempData} 
//             isEditing={isEditing} 
//             onInputChange={handleInputChange} 
//           />
//         );
//       default:
//         return <div>Select a tab to view patient data</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <PatientHeader 
//           patientData={patientData} 
//           isEditing={isEditing}
//           onEdit={() => setIsEditing(true)}
//           onSave={handleSave}
//           onCancel={handleCancel}
//           onLogout={onLogout}
//         />
        
//         <NavigationTabs 
//           navItems={navItems} 
//           activeTab={activeTab} 
//           onTabChange={setActiveTab} 
//         />
        
//         <div className="transition-all duration-300">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;