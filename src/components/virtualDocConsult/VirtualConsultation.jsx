// import React, { useState, useRef, useEffect } from 'react';
// import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Calendar, Clock, Star, MapPin, Award, Users } from 'lucide-react';

// const VirtualDocConsult = () => {
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [appointments, setAppointments] = useState([]);
  
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   const doctors = [
//     {
//       id: 1,
//       name: "Dr. Sarah Johnson",
//       specialty: "Cardiology",
//       rating: 4.9,
//       experience: 15,
//       location: "New York, NY",
//       image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 150,
//       consultations: 1250
//     },
//     {
//       id: 2,
//       name: "Dr. Michael Chen",
//       specialty: "Dermatology",
//       rating: 4.8,
//       experience: 12,
//       location: "Los Angeles, CA",
//       image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 120,
//       consultations: 980
//     },
//     {
//       id: 3,
//       name: "Dr. Emily Rodriguez",
//       specialty: "General Practice",
//       rating: 4.7,
//       experience: 8,
//       location: "Chicago, IL",
//       image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20abe2?w=300&h=300&fit=crop&crop=face",
//       available: false,
//       price: 100,
//       consultations: 750
//     },
//     {
//       id: 4,
//       name: "Dr. James Wilson",
//       specialty: "Pediatrics",
//       rating: 4.9,
//       experience: 20,
//       location: "Boston, MA",
//       image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 130,
//       consultations: 1400
//     }
//   ];

//   const startVideoCall = async (doctor) => {
//     setSelectedDoctor(doctor);
//     setIsVideoCallActive(true);
//     setCurrentView('video-call');
    
//     // Simulate getting user media
//     try {
//       // In a real app, you'd use navigator.mediaDevices.getUserMedia()
//       // Here we'll just simulate the video call interface
//       console.log('Starting video call with', doctor.name);
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//   };

//   const endVideoCall = () => {
//     setIsVideoCallActive(false);
//     setCurrentView('home');
//     setSelectedDoctor(null);
//   };

//   const bookAppointment = (doctor, date, time) => {
//     const newAppointment = {
//       id: Date.now(),
//       doctor,
//       date,
//       time,
//       status: 'scheduled'
//     };
//     setAppointments([...appointments, newAppointment]);
//     setCurrentView('home');
//   };

//   const DoctorCard = ({ doctor }) => (
//     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//       <div className="flex items-start space-x-4">
//         <img 
//           src={doctor.image} 
//           alt={doctor.name}
//           className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
//         />
//         <div className="flex-1">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//               doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}>
//               {doctor.available ? 'Available' : 'Busy'}
//             </span>
//           </div>
//           <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
//           <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
//             <div className="flex items-center space-x-1">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="font-medium">{doctor.rating}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Award className="w-4 h-4" />
//               <span>{doctor.experience} years exp.</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Users className="w-4 h-4" />
//               <span>{doctor.consultations} consultations</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
//             <MapPin className="w-4 h-4" />
//             <span>{doctor.location}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-2xl font-bold text-gray-900">${doctor.price}</span>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setCurrentView(`booking-${doctor.id}`)}
//                 className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
//               >
//                 Book Later
//               </button>
//               {doctor.available && (
//                 <button
//                   onClick={() => startVideoCall(doctor)}
//                   className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
//                 >
//                   Call Now
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const BookingForm = ({ doctor }) => (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment with {doctor.name}</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
//           <input 
//             type="date" 
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             min={new Date().toISOString().split('T')[0]}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
//           <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//             <option>9:00 AM</option>
//             <option>10:00 AM</option>
//             <option>11:00 AM</option>
//             <option>2:00 PM</option>
//             <option>3:00 PM</option>
//             <option>4:00 PM</option>
//           </select>
//         </div>
//       </div>
//       <div className="mt-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
//         <textarea 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
//           placeholder="Please describe your symptoms or reason for consultation..."
//         />
//       </div>
//       <div className="flex justify-between items-center mt-8">
//         <button
//           onClick={() => setCurrentView('home')}
//           className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => bookAppointment(doctor, new Date(), '10:00 AM')}
//           className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
//         >
//           Book Appointment - ${doctor.price}
//         </button>
//       </div>
//     </div>
//   );

//   const VideoCallInterface = ({ doctor }) => (
//     <div className="fixed inset-0 bg-gray-900 z-50">
//       <div className="h-full flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-800 p-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
//             <div>
//               <h3 className="text-white font-medium">{doctor.name}</h3>
//               <p className="text-gray-300 text-sm">{doctor.specialty}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="bg-green-500 w-2 h-2 rounded-full"></div>
//             <span className="text-white text-sm">Connected</span>
//           </div>
//         </div>

//         {/* Video Area */}
//         <div className="flex-1 relative bg-gray-900">
//           {/* Remote Video */}
//           <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//             <div className="text-center">
//               <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500" />
//               <h3 className="text-white text-xl font-medium">{doctor.name}</h3>
//               <p className="text-gray-300">Video call in progress...</p>
//             </div>
//           </div>
          
//           {/* Local Video Preview */}
//           <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
//             {isVideoEnabled ? (
//               <div className="text-white text-center">
//                 <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
//                   <span className="text-xl font-bold">You</span>
//                 </div>
//                 <p className="text-sm">Your video</p>
//               </div>
//             ) : (
//               <div className="text-gray-400 text-center">
//                 <VideoOff className="w-8 h-8 mx-auto mb-2" />
//                 <p className="text-sm">Video off</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-gray-800 p-6">
//           <div className="flex justify-center space-x-6">
//             <button
//               onClick={() => setIsVideoEnabled(!isVideoEnabled)}
//               className={`p-4 rounded-full transition-colors duration-200 ${
//                 isVideoEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
//               }`}
//             >
//               {isVideoEnabled ? <Video className="w-6 h-6 text-white" /> : <VideoOff className="w-6 h-6 text-white" />}
//             </button>
            
//             <button
//               onClick={() => setIsAudioEnabled(!isAudioEnabled)}
//               className={`p-4 rounded-full transition-colors duration-200 ${
//                 isAudioEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
//               }`}
//             >
//               {isAudioEnabled ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6 text-white" />}
//             </button>
            
//             <button
//               onClick={endVideoCall}
//               className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
//             >
//               <PhoneOff className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     if (currentView === 'video-call' && selectedDoctor) {
//       return <VideoCallInterface doctor={selectedDoctor} />;
//     }

//     if (currentView.startsWith('booking-')) {
//       const doctorId = parseInt(currentView.split('-')[1]);
//       const doctor = doctors.find(d => d.id === doctorId);
//       return <BookingForm doctor={doctor} />;
//     }

//     return (
//       <div className="space-y-8">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Connect with Doctors Instantly
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Get professional medical consultations through secure video calls from the comfort of your home
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
//                 <Clock className="w-5 h-5" />
//                 <span>24/7 Available</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
//                 <Video className="w-5 h-5" />
//                 <span>HD Video Quality</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
//                 <Award className="w-5 h-5" />
//                 <span>Certified Doctors</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-lg p-6 text-center shadow-md">
//             <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
//             <div className="text-gray-600">Doctors Available</div>
//           </div>
//           <div className="bg-white rounded-lg p-6 text-center shadow-md">
//             <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
//             <div className="text-gray-600">Consultations</div>
//           </div>
//           <div className="bg-white rounded-lg p-6 text-center shadow-md">
//             <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
//             <div className="text-gray-600">Average Rating</div>
//           </div>
//           <div className="bg-white rounded-lg p-6 text-center shadow-md">
//             <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
//             <div className="text-gray-600">Support</div>
//           </div>
//         </div>

//         {/* Available Doctors */}
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>
//           <div className="grid gap-6">
//             {doctors.map(doctor => (
//               <DoctorCard key={doctor.id} doctor={doctor} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default VirtualDocConsult;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DoctorList from './DoctorList';
// import BookingForm from './BookingForm';
// import VideoCallInterface from './VideoCallInterface';

// const VirtualConsultation = () => {
//   const navigate = useNavigate();
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   const doctors = [
//     {
//       id: 1,
//       name: "Dr. Sarah Johnson",
//       specialty: "Cardiology",
//       rating: 4.9,
//       experience: 15,
//       location: "New York, NY",
//       image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 150,
//       consultations: 1250
//     },
//     {
//       id: 2,
//       name: "Dr. Michael Chen",
//       specialty: "Dermatology",
//       rating: 4.8,
//       experience: 12,
//       location: "Los Angeles, CA",
//       image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 120,
//       consultations: 980
//     },
//     {
//       id: 3,
//       name: "Dr. Emily Rodriguez",
//       specialty: "General Practice",
//       rating: 4.7,
//       experience: 8,
//       location: "Chicago, IL",
//       image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20abe2?w=300&h=300&fit=crop&crop=face",
//       available: false,
//       price: 100,
//       consultations: 750
//     },
//     {
//       id: 4,
//       name: "Dr. James Wilson",
//       specialty: "Pediatrics",
//       rating: 4.9,
//       experience: 20,
//       location: "Boston, MA",
//       image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
//       available: true,
//       price: 130,
//       consultations: 1400
//     }
//   ];

//   const handleBookLater = (doctor) => {
//     setSelectedDoctor(doctor);
//     setCurrentView('booking');
//   };

//   const handleCallNow = (doctor) => {
//     setSelectedDoctor(doctor);
//     setCurrentView('video-call');
//   };

//   const handleBackToHome = () => {
//     setCurrentView('home');
//     setSelectedDoctor(null);
//   };

//   const handleBookAppointment = (appointmentData) => {
//     // Handle appointment booking logic here
//     console.log('Appointment booked:', appointmentData);
//     setCurrentView('home');
//   };

//   const renderContent = () => {
//     switch (currentView) {
//       case 'booking':
//         return (
//           <BookingForm 
//             doctor={selectedDoctor} 
//             onCancel={handleBackToHome}
//             onBook={handleBookAppointment}
//           />
//         );
//       case 'video-call':
//         return (
//           <VideoCallInterface 
//             doctor={selectedDoctor} 
//             onEndCall={handleBackToHome}
//           />
//         );
//       default:
//         return (
//           <DoctorList 
//             doctors={doctors}
//             onBookLater={handleBookLater}
//             onCallNow={handleCallNow}
//           />
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default VirtualConsultation;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DoctorList from './DoctorList';
// import BookingForm from './BookingForm';
// import VideoCallInterface from './VideoCallInterface';
// // import { apiService } from './apiService';

// const VirtualConsultation = () => {
//   const navigate = useNavigate();
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [patientInfo, setPatientInfo] = useState(null);
//   const [activeCall, setActiveCall] = useState(null);

//   // Your doctors array remains the same...

//   const handleCallNow = async (doctor) => {
//     try {
//       // In a real app, you would get patient info from authentication/context
//       const patientData = {
//         name: "John Doe", // This would come from user profile
//         reason: "General consultation"
//       };

//       // Initiate the call through your backend
//       const response = await apiService.initiateCall(patientData.name, patientData.reason);
      
//       if (response.success) {
//         setSelectedDoctor(doctor);
//         setPatientInfo(patientData);
//         setActiveCall({
//           id: response.callId,
//           meetingUrl: response.meetingUrl
//         });
//         setCurrentView('video-call');
        
//         // In a real app, you would join the Zoom meeting here
//         // For now, we'll just show the interface
//       } else {
//         console.error('Failed to initiate call:', response.message);
//         alert('Failed to start the call. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error initiating call:', error);
//       alert('An error occurred while starting the call.');
//     }
//   };

//   const handleEndCall = () => {
//     setCurrentView('home');
//     setSelectedDoctor(null);
//     setPatientInfo(null);
//     setActiveCall(null);
//   };

//   const renderContent = () => {
//     switch (currentView) {
//       case 'booking':
//         return (
//           <BookingForm 
//             doctor={selectedDoctor} 
//             onCancel={handleBackToHome}
//             onBook={handleBookAppointment}
//           />
//         );
//       case 'video-call':
//         return (
//           <VideoCallInterface 
//             doctor={selectedDoctor}
//             patient={patientInfo}
//             callId={activeCall?.id}
//             onEndCall={handleEndCall}
//           />
//         );
//       default:
//         return (
//           <DoctorList 
//             doctors={doctors}
//             onBookLater={handleBookLater}
//             onCallNow={handleCallNow}
//           />
//         );
//     }
//   };

//   // Rest of your component remains similar...
// };

// export default VirtualConsultation; // Add this line



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorList from './DoctorList';
import BookingForm from './BookingForm';
import VideoCallInterface from './VideoCallInterface';

const VirtualConsultation = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  // API configuration
  const API_BASE_URL = 'http://localhost:3000';

  // API service functions (merged into component)
  const apiService = {
    // Initiate a call with the doctor
    initiateCall: async (patientName, reason) => {
      const response = await fetch(`${API_BASE_URL}/api/initiate-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientName, reason }),
      });
      return response.json();
    },

    // Get pending calls (for doctor's dashboard)
    getPendingCalls: async () => {
      const response = await fetch(`${API_BASE_URL}/api/pending-calls`);
      return response.json();
    },

    // Accept a call (doctor action)
    acceptCall: async (callId) => {
      const response = await fetch(`${API_BASE_URL}/api/accept-call/${callId}`, {
        method: 'POST',
      });
      return response.json();
    },

    // End a call
    endCall: async (callId) => {
      const response = await fetch(`${API_BASE_URL}/api/end-call/${callId}`, {
        method: 'POST',
      });
      return response.json();
    },
  };

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: 15,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      available: true,
      price: 150,
      consultations: 1250
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      experience: 12,
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      available: true,
      price: 120,
      consultations: 980
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "General Practice",
      rating: 4.7,
      experience: 8,
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20abe2?w=300&h=300&fit=crop&crop=face",
      available: false,
      price: 100,
      consultations: 750
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: 20,
      location: "Boston, MA",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      available: true,
      price: 130,
      consultations: 1400
    }
  ];

  const handleBookLater = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('booking');
  };

  const handleCallNow = async (doctor) => {
    try {
      // In a real app, you would get patient info from authentication/context
      const patientData = {
        name: "John Doe", // This would come from user profile
        reason: "General consultation"
      };

      // Initiate the call through your backend
      const response = await apiService.initiateCall(patientData.name, patientData.reason);
      
      if (response.success) {
        setSelectedDoctor(doctor);
        setPatientInfo(patientData);
        setActiveCall({
          id: response.callId,
          meetingUrl: response.meetingUrl
        });
        setCurrentView('video-call');
        
        // In a real app, you would join the Zoom meeting here
        // For now, we'll just show the interface
      } else {
        console.error('Failed to initiate call:', response.message);
        alert('Failed to start the call. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      alert('An error occurred while starting the call.');
    }
  };

  const handleEndCall = async () => {
    if (activeCall?.id) {
      try {
        await apiService.endCall(activeCall.id);
      } catch (error) {
        console.error('Error ending call:', error);
      }
    }
    
    setCurrentView('home');
    setSelectedDoctor(null);
    setPatientInfo(null);
    setActiveCall(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDoctor(null);
  };

  const handleBookAppointment = (appointmentData) => {
    // Handle appointment booking logic here
    console.log('Appointment booked:', appointmentData);
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'booking':
        return (
          <BookingForm 
            doctor={selectedDoctor} 
            onCancel={handleBackToHome}
            onBook={handleBookAppointment}
          />
        );
      case 'video-call':
        return (
          <VideoCallInterface 
            doctor={selectedDoctor}
            patient={patientInfo}
            callId={activeCall?.id}
            onEndCall={handleEndCall}
          />
        );
      default:
        return (
          <DoctorList 
            doctors={doctors}
            onBookLater={handleBookLater}
            onCallNow={handleCallNow}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default VirtualConsultation;