// import React, { useState, useRef, useEffect } from 'react';
// import { Video, VideoOff, Mic, MicOff, PhoneOff, MapPin, Award, Users, Star } from 'lucide-react';

// const VideoCallInterface = ({ doctor, onEndCall }) => {
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [callDuration, setCallDuration] = useState(0);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   useEffect(() => {
//     // Simulate getting user media (in a real app, use navigator.mediaDevices.getUserMedia())
//     const timer = setInterval(() => {
//       setCallDuration(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 z-50">
//       <div className="h-full flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-800 p-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
//             <div>
//               <h3 className="text-white font-medium">{doctor.name}</h3>
//               <p className="text-gray-300 text-sm">{doctor.specialty}</p>
//               <div className="flex items-center space-x-2 mt-1">
//                 <div className="bg-green-500 w-2 h-2 rounded-full"></div>
//                 <span className="text-green-400 text-sm">{formatDuration(callDuration)}</span>
//               </div>
//             </div>
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
              
//               {/* Doctor Info */}
//               <div className="mt-6 p-4 bg-gray-700 rounded-lg max-w-md mx-auto">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="text-white font-medium">{doctor.rating}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Award className="w-4 h-4 text-blue-400" />
//                     <span className="text-gray-300">{doctor.experience} years exp.</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-1 text-sm text-gray-300">
//                   <MapPin className="w-4 h-4" />
//                   <span>{doctor.location}</span>
//                 </div>
//               </div>
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
//               onClick={onEndCall}
//               className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
//             >
//               <PhoneOff className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCallInterface;




import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, MapPin, Award, Users, Star } from 'lucide-react';
// In VirtualConsultation.jsx
// import { apiService } from './apiService'; // No file extension needed

const VideoCallInterface = ({ doctor, patient, callId, onEndCall }) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('active');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Start timer for call duration
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Setup video streams (simulated for now)
    // In a real app, you would use WebRTC or Zoom SDK here
    const setupVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoEnabled, 
          audio: isAudioEnabled 
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupVideo();

    return () => {
      clearInterval(timer);
      // Clean up media streams
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoEnabled, isAudioEnabled]);

  const handleEndCall = async () => {
    try {
      // Notify backend that call has ended
      await apiService.endCall(callId);
      setCallStatus('ended');
      
      // Stop all media tracks
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      
      // Call parent handler
      onEndCall();
    } catch (error) {
      console.error('Error ending call:', error);
      onEndCall(); // Still call parent handler even if API fails
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="text-white font-medium">{doctor.name}</h3>
              <p className="text-gray-300 text-sm">{doctor.specialty}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                <span className="text-green-400 text-sm">{formatDuration(callDuration)}</span>
              </div>
            </div>
          </div>
          {patient && (
            <div className="text-right">
              <p className="text-gray-300 text-sm">Patient:</p>
              <p className="text-white font-medium">{patient.name}</p>
            </div>
          )}
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Remote Video - Doctor's feed would go here */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500" />
              <h3 className="text-white text-xl font-medium">{doctor.name}</h3>
              <p className="text-gray-300">Video call in progress...</p>
              
              {/* Doctor Info */}
              <div className="mt-6 p-4 bg-gray-700 rounded-lg max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{doctor.experience} years exp.</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Local Video Preview */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-4 rounded-full transition-colors duration-200 ${
                isVideoEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6 text-white" /> : <VideoOff className="w-6 h-6 text-white" />}
            </button>
            
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-4 rounded-full transition-colors duration-200 ${
                isAudioEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6 text-white" />}
            </button>
            
            <button
              onClick={handleEndCall}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallInterface;