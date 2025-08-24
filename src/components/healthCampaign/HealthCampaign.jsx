

// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Users, Clock, Heart, UserPlus, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// const HealthCampComponent = () => {
//   const [camps, setCamps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newCamp, setNewCamp] = useState({
//     name: '',
//     date: '',
//     time: '',
//     location: '',
//     capacity: '',
//     services: []
//   });
//   const [newService, setNewService] = useState('');
//   const [registering, setRegistering] = useState(null);

//   // API base URL
//   const API_BASE_URL = 'http://localhost:8000/web/api/health-camps';

//   // Fetch all health camps
//   const fetchCamps = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(API_BASE_URL);
//       if (!response.ok) {
//         throw new Error('Failed to fetch camps');
//       }
//       const data = await response.json();
//       setCamps(data.data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching camps:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create a new health camp
//   const handleCreateCamp = async () => {
//     if (newCamp.name && newCamp.date && newCamp.location) {
//       try {
//         const formattedServices = newCamp.services.map(service => ({ name: service }));
        
//         const response = await fetch(API_BASE_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ...newCamp,
//             services: formattedServices,
//             capacity: parseInt(newCamp.capacity) || 100,
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to create camp');
//         }

//         const data = await response.json();
//         setCamps([...camps, data.data]);
//         setNewCamp({
//           name: '',
//           date: '',
//           time: '',
//           location: '',
//           capacity: '',
//           services: []
//         });
//         setShowCreateForm(false);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error creating camp:', err);
//       }
//     }
//   };

//   // Register for a camp
//   const registerForCamp = async (campId) => {
//     try {
//       setRegistering(campId);
//       const response = await fetch(`${API_BASE_URL}/${campId}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to register for camp');
//       }

//       const data = await response.json();
      
//       // Update the specific camp in the state
//       setCamps(camps.map(camp => 
//         camp._id === campId ? data.data : camp
//       ));
      
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error registering for camp:', err);
//     } finally {
//       setRegistering(null);
//     }
//   };

//   // Delete a camp
//   const deleteCamp = async (campId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${campId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to delete camp');
//       }

//       setCamps(camps.filter(camp => camp._id !== campId));
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error deleting camp:', err);
//     }
//   };

//   // Fetch camps on component mount
//   useEffect(() => {
//     fetchCamps();
//   }, []);

//   const addService = () => {
//     if (newService.trim() && !newCamp.services.includes(newService.trim())) {
//       setNewCamp({
//         ...newCamp,
//         services: [...newCamp.services, newService.trim()]
//       });
//       setNewService('');
//     }
//   };

//   const removeService = (serviceToRemove) => {
//     setNewCamp({
//       ...newCamp,
//       services: newCamp.services.filter(service => service !== serviceToRemove)
//     });
//   };

//   const getStatusColor = (camp) => {
//     const availableSpots = camp.capacity - camp.registered;
//     if (availableSpots === 0) return 'text-red-600 bg-red-50';
//     if (availableSpots <= 20) return 'text-orange-600 bg-orange-50';
//     return 'text-green-600 bg-green-50';
//   };

//   const getStatusIcon = (camp) => {
//     const availableSpots = camp.capacity - camp.registered;
//     if (availableSpots === 0) return <AlertCircle className="w-4 h-4" />;
//     return <CheckCircle className="w-4 h-4" />;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading health camps...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
//           <span className="block sm:inline">{error}</span>
//           <button
//             className="absolute top-0 right-0 p-3"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//               <Heart className="text-red-500" />
//               Health Camp Management
//             </h1>
//             <p className="text-gray-600 mt-2">Organize and manage community health screening camps</p>
//           </div>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
//           >
//             <UserPlus className="w-5 h-5" />
//             Create New Camp
//           </button>
//         </div>
//       </div>

//       {showCreateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-6">Create New Health Camp</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Camp Name</label>
//                 <input
//                   type="text"
//                   value={newCamp.name}
//                   onChange={(e) => setNewCamp({...newCamp, name: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., Community Health Screening"
//                   required
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//                   <input
//                     type="date"
//                     value={newCamp.date}
//                     onChange={(e) => setNewCamp({...newCamp, date: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
//                   <input
//                     type="text"
//                     value={newCamp.time}
//                     onChange={(e) => setNewCamp({...newCamp, time: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 9:00 AM - 4:00 PM"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   type="text"
//                   value={newCamp.location}
//                   onChange={(e) => setNewCamp({...newCamp, location: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., Community Center Hall"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
//                 <input
//                   type="number"
//                   value={newCamp.capacity}
//                   onChange={(e) => setNewCamp({...newCamp, capacity: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Maximum participants"
//                   min="1"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={newService}
//                     onChange={(e) => setNewService(e.target.value)}
//                     className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Blood Pressure Check"
//                     onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
//                   />
//                   <button
//                     type="button"
//                     onClick={addService}
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {newCamp.services.map((service, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
//                     >
//                       {service}
//                       <button
//                         type="button"
//                         onClick={() => removeService(service)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={handleCreateCamp}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
//                 >
//                   Create Camp
//                 </button>
//                 <button
//                   onClick={() => setShowCreateForm(false)}
//                   className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid gap-6">
//         {camps.map((camp) => (
//           <div key={camp._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{camp.name}</h3>
//                 <div className="flex items-center gap-6 text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     <span>{formatDate(camp.date)}</span>
//                   </div>
//                   {camp.time && (
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span>{camp.time}</span>
//                     </div>
//                   )}
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     <span>{camp.location}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(camp)}`}>
//                 {getStatusIcon(camp)}
//                 <span className="text-sm font-medium">
//                   {camp.capacity - camp.registered === 0 ? 'Full' : `${camp.capacity - camp.registered} spots left`}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <Users className="w-4 h-4 text-gray-500" />
//                 <span className="text-sm text-gray-600">
//                   Registration: {camp.registered} / {camp.capacity}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-600 h-2 rounded-full transition-all"
//                   style={{ width: `${(camp.registered / camp.capacity) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-medium text-gray-700 mb-2">Services Offered:</h4>
//               <div className="flex flex-wrap gap-2">
//                 {camp.services.map((service, index) => (
//                   <span
//                     key={index}
//                     className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {service.name}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => registerForCamp(camp._id)}
//                 disabled={camp.registered >= camp.capacity || registering === camp._id}
//                 className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                   camp.registered >= camp.capacity
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 }`}
//               >
//                 {registering === camp._id ? (
//                   <>
//                     <Loader className="w-4 h-4 animate-spin" />
//                     Registering...
//                   </>
//                 ) : camp.registered >= camp.capacity ? (
//                   'Registration Full'
//                 ) : (
//                   'Register Now'
//                 )}
//               </button>
//               <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
//                 View Details
//               </button>
//               <button
//                 onClick={() => deleteCamp(camp._id)}
//                 className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {camps.length === 0 && (
//         <div className="text-center py-12">
//           <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-500 mb-2">No Health Camps Yet</h3>
//           <p className="text-gray-400 mb-4">Create your first health camp to get started</p>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
//           >
//             Create New Camp
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HealthCampComponent;



// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Users, Clock, Heart, UserPlus, CheckCircle, AlertCircle, Loader, Trash2, Eye } from 'lucide-react';

// const HealthCampComponent = () => {
//   const [camps, setCamps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newCamp, setNewCamp] = useState({
//     name: '',
//     date: '',
//     time: '',
//     location: '',
//     capacity: '',
//     services: []
//   });
//   const [newService, setNewService] = useState('');
//   const [registering, setRegistering] = useState(null);
//   const [creating, setCreating] = useState(false);
//   const [deleting, setDeleting] = useState(null);

//   // API base URL
//   const API_BASE_URL = 'http://localhost:8000/web/api/health-camps';

//   // Fetch all health camps
//   const fetchCamps = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(API_BASE_URL);
//       if (!response.ok) {
//         throw new Error('Failed to fetch camps');
//       }
//       const data = await response.json();
//       setCamps(data.data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching camps:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create a new health camp
//   const handleCreateCamp = async () => {
//     if (newCamp.name && newCamp.date && newCamp.location) {
//       try {
//         setCreating(true);
//         const formattedServices = newCamp.services.map(service => ({ name: service }));
        
//         const response = await fetch(API_BASE_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ...newCamp,
//             services: formattedServices,
//             capacity: parseInt(newCamp.capacity) || 100,
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to create camp');
//         }

//         const data = await response.json();
//         setCamps([...camps, data.data]);
//         setNewCamp({
//           name: '',
//           date: '',
//           time: '',
//           location: '',
//           capacity: '',
//           services: []
//         });
//         setShowCreateForm(false);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error creating camp:', err);
//       } finally {
//         setCreating(false);
//       }
//     }
//   };

//   // Register for a camp
//   const registerForCamp = async (campId) => {
//     try {
//       setRegistering(campId);
//       const response = await fetch(`${API_BASE_URL}/${campId}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to register for camp');
//       }

//       const data = await response.json();
      
//       // Update the specific camp in the state
//       setCamps(camps.map(camp => 
//         camp._id === campId ? data.data : camp
//       ));
      
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error registering for camp:', err);
//     } finally {
//       setRegistering(null);
//     }
//   };

//   // Delete a camp
//   const deleteCamp = async (campId) => {
//     try {
//       setDeleting(campId);
//       const response = await fetch(`${API_BASE_URL}/${campId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to delete camp');
//       }

//       setCamps(camps.filter(camp => camp._id !== campId));
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error deleting camp:', err);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   // Fetch camps on component mount
//   useEffect(() => {
//     fetchCamps();
//   }, []);

//   const addService = () => {
//     if (newService.trim() && !newCamp.services.includes(newService.trim())) {
//       setNewCamp({
//         ...newCamp,
//         services: [...newCamp.services, newService.trim()]
//       });
//       setNewService('');
//     }
//   };

//   const removeService = (serviceToRemove) => {
//     setNewCamp({
//       ...newCamp,
//       services: newCamp.services.filter(service => service !== serviceToRemove)
//     });
//   };

//   const getStatusColor = (camp) => {
//     const availableSpots = camp.capacity - camp.registered;
//     if (availableSpots === 0) return 'text-red-600 bg-red-50';
//     if (availableSpots <= 20) return 'text-orange-600 bg-orange-50';
//     return 'text-green-600 bg-green-50';
//   };

//   const getStatusIcon = (camp) => {
//     const availableSpots = camp.capacity - camp.registered;
//     if (availableSpots === 0) return <AlertCircle className="w-4 h-4" />;
//     return <CheckCircle className="w-4 h-4" />;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading health camps...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
//           <span className="block sm:inline">{error}</span>
//           <button
//             className="absolute top-0 right-0 p-3 cursor-pointer"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//               <Heart className="text-red-500" />
//               Health Camp Management
//             </h1>
//             <p className="text-gray-600 mt-2">Organize and manage community health screening camps</p>
//           </div>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
//           >
//             <UserPlus className="w-5 h-5" />
//             Create New Camp
//           </button>
//         </div>
//       </div>

//       {showCreateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-2xl font-bold mb-6">Create New Health Camp</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Camp Name</label>
//                 <input
//                   type="text"
//                   value={newCamp.name}
//                   onChange={(e) => setNewCamp({...newCamp, name: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., Community Health Screening"
//                   required
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//                   <input
//                     type="date"
//                     value={newCamp.date}
//                     onChange={(e) => setNewCamp({...newCamp, date: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
//                   <input
//                     type="text"
//                     value={newCamp.time}
//                     onChange={(e) => setNewCamp({...newCamp, time: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 9:00 AM - 4:00 PM"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   type="text"
//                   value={newCamp.location}
//                   onChange={(e) => setNewCamp({...newCamp, location: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., Community Center Hall"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
//                 <input
//                   type="number"
//                   value={newCamp.capacity}
//                   onChange={(e) => setNewCamp({...newCamp, capacity: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Maximum participants"
//                   min="1"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={newService}
//                     onChange={(e) => setNewService(e.target.value)}
//                     className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Blood Pressure Check"
//                     onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
//                   />
//                   <button
//                     type="button"
//                     onClick={addService}
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {newCamp.services.map((service, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 cursor-default"
//                     >
//                       {service}
//                       <button
//                         type="button"
//                         onClick={() => removeService(service)}
//                         className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={handleCreateCamp}
//                   disabled={creating}
//                   className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
//                     creating ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
//                   }`}
//                 >
//                   {creating ? (
//                     <>
//                       <Loader className="w-5 h-5 animate-spin mr-2" />
//                       Creating...
//                     </>
//                   ) : (
//                     'Create Camp'
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setShowCreateForm(false)}
//                   className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid gap-6">
//         {camps.map((camp) => (
//           <div key={camp._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-default">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{camp.name}</h3>
//                 <div className="flex items-center gap-6 text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     <span>{formatDate(camp.date)}</span>
//                   </div>
//                   {camp.time && (
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span>{camp.time}</span>
//                     </div>
//                   )}
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     <span>{camp.location}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(camp)}`}>
//                 {getStatusIcon(camp)}
//                 <span className="text-sm font-medium">
//                   {camp.capacity - camp.registered === 0 ? 'Full' : `${camp.capacity - camp.registered} spots left`}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <Users className="w-4 h-4 text-gray-500" />
//                 <span className="text-sm text-gray-600">
//                   Registration: {camp.registered} / {camp.capacity}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-600 h-2 rounded-full transition-all"
//                   style={{ width: `${(camp.registered / camp.capacity) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-medium text-gray-700 mb-2">Services Offered:</h4>
//               <div className="flex flex-wrap gap-2">
//                 {camp.services.map((service, index) => (
//                   <span
//                     key={index}
//                     className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-default"
//                   >
//                     {service.name}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => registerForCamp(camp._id)}
//                 disabled={camp.registered >= camp.capacity || registering === camp._id}
//                 className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                   camp.registered >= camp.capacity
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
//                 }`}
//               >
//                 {registering === camp._id ? (
//                   <>
//                     <Loader className="w-4 h-4 animate-spin" />
//                     Registering...
//                   </>
//                 ) : camp.registered >= camp.capacity ? (
//                   'Registration Full'
//                 ) : (
//                   'Register Now'
//                 )}
//               </button>
//               <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2">
//                 <Eye className="w-4 h-4" />
//                 View Details
//               </button>
//               <button
//                 onClick={() => deleteCamp(camp._id)}
//                 disabled={deleting === camp._id}
//                 className={`px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                   deleting === camp._id ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
//                 }`}
//               >
//                 {deleting === camp._id ? (
//                   <Loader className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Trash2 className="w-4 h-4" />
//                 )}
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {camps.length === 0 && (
//         <div className="text-center py-12">
//           <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-500 mb-2">No Health Camps Yet</h3>
//           <p className="text-gray-400 mb-4">Create your first health camp to get started</p>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
//           >
//             Create New Camp
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HealthCampComponent;


import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Heart, UserPlus, CheckCircle, AlertCircle, Loader, Trash2, Eye, X } from 'lucide-react';

const HealthCampComponent = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [newCamp, setNewCamp] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    services: []
  });
  const [newService, setNewService] = useState('');
  const [registering, setRegistering] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // API base URL
  const API_BASE_URL = 'http://localhost:8000/web/api/health-camps';

  // Fetch all health camps
  const fetchCamps = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch camps');
      }
      const data = await response.json();
      setCamps(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching camps:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new health camp
  const handleCreateCamp = async () => {
    if (newCamp.name && newCamp.date && newCamp.location) {
      try {
        setCreating(true);
        const formattedServices = newCamp.services.map(service => ({ name: service }));
        
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newCamp,
            services: formattedServices,
            capacity: parseInt(newCamp.capacity) || 100,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create camp');
        }

        const data = await response.json();
        setCamps([...camps, data.data]);
        setNewCamp({
          name: '',
          date: '',
          time: '',
          location: '',
          capacity: '',
          services: []
        });
        setShowCreateForm(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error creating camp:', err);
      } finally {
        setCreating(false);
      }
    }
  };

  // Register for a camp
  const registerForCamp = async (campId) => {
    try {
      setRegistering(campId);
      const response = await fetch(`${API_BASE_URL}/${campId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register for camp');
      }

      const data = await response.json();
      
      // Update the specific camp in the state
      setCamps(camps.map(camp => 
        camp._id === campId ? data.data : camp
      ));
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error registering for camp:', err);
    } finally {
      setRegistering(null);
    }
  };

  // Delete a camp
  const deleteCamp = async (campId) => {
    try {
      setDeleting(campId);
      const response = await fetch(`${API_BASE_URL}/${campId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete camp');
      }

      setCamps(camps.filter(camp => camp._id !== campId));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting camp:', err);
    } finally {
      setDeleting(null);
    }
  };

  // View camp details
  const viewCampDetails = (camp) => {
    setSelectedCamp(camp);
    setShowDetailsModal(true);
  };

  // Fetch camps on component mount
  useEffect(() => {
    fetchCamps();
  }, []);

  const addService = () => {
    if (newService.trim() && !newCamp.services.includes(newService.trim())) {
      setNewCamp({
        ...newCamp,
        services: [...newCamp.services, newService.trim()]
      });
      setNewService('');
    }
  };

  const removeService = (serviceToRemove) => {
    setNewCamp({
      ...newCamp,
      services: newCamp.services.filter(service => service !== serviceToRemove)
    });
  };

  const getStatusColor = (camp) => {
    const availableSpots = camp.capacity - camp.registered;
    if (availableSpots === 0) return 'text-red-600 bg-red-50';
    if (availableSpots <= 20) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusIcon = (camp) => {
    const availableSpots = camp.capacity - camp.registered;
    if (availableSpots === 0) return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading health camps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 right-0 p-3 cursor-pointer"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Heart className="text-red-500" />
              Health Camp Management
            </h1>
            <p className="text-gray-600 mt-2">Organize and manage community health screening camps</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            Create New Camp
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">Create New Health Camp</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Camp Name</label>
                <input
                  type="text"
                  value={newCamp.name}
                  onChange={(e) => setNewCamp({...newCamp, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Community Health Screening"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newCamp.date}
                    onChange={(e) => setNewCamp({...newCamp, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={newCamp.time}
                    onChange={(e) => setNewCamp({...newCamp, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 9:00 AM - 4:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newCamp.location}
                  onChange={(e) => setNewCamp({...newCamp, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Community Center Hall"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  value={newCamp.capacity}
                  onChange={(e) => setNewCamp({...newCamp, capacity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maximum participants"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Blood Pressure Check"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCamp.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 cursor-default"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCreateCamp}
                  disabled={creating}
                  className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    creating ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {creating ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Camp'
                  )}
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camp Details Modal */}
      {showDetailsModal && selectedCamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Camp Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedCamp.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(selectedCamp.date)}</span>
                  </div>
                  {selectedCamp.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedCamp.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedCamp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{selectedCamp.registered} / {selectedCamp.capacity} registered</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                <div className={`px-3 py-2 rounded-full inline-flex items-center gap-2 ${getStatusColor(selectedCamp)}`}>
                  {getStatusIcon(selectedCamp)}
                  <span className="text-sm font-medium">
                    {selectedCamp.capacity - selectedCamp.registered === 0 
                      ? 'Fully Booked' 
                      : `${selectedCamp.capacity - selectedCamp.registered} spots available`}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCamp.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-default"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => registerForCamp(selectedCamp._id)}
                  disabled={selectedCamp.registered >= selectedCamp.capacity || registering === selectedCamp._id}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedCamp.registered >= selectedCamp.capacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  }`}
                >
                  {registering === selectedCamp._id ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Registering...
                    </>
                  ) : selectedCamp.registered >= selectedCamp.capacity ? (
                    'Registration Full'
                  ) : (
                    'Register Now'
                  )}
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {camps.map((camp) => (
          <div key={camp._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{camp.name}</h3>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(camp.date)}</span>
                  </div>
                  {camp.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{camp.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{camp.location}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(camp)}`}>
                {getStatusIcon(camp)}
                <span className="text-sm font-medium">
                  {camp.capacity - camp.registered === 0 ? 'Full' : `${camp.capacity - camp.registered} spots left`}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Registration: {camp.registered} / {camp.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(camp.registered / camp.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Services Offered:</h4>
              <div className="flex flex-wrap gap-2">
                {camp.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-default"
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => registerForCamp(camp._id)}
                disabled={camp.registered >= camp.capacity || registering === camp._id}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  camp.registered >= camp.capacity
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                }`}
              >
                {registering === camp._id ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : camp.registered >= camp.capacity ? (
                  'Registration Full'
                ) : (
                  'Register Now'
                )}
              </button>
              <button 
                onClick={() => viewCampDetails(camp)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={() => deleteCamp(camp._id)}
                disabled={deleting === camp._id}
                className={`px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  deleting === camp._id ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                }`}
              >
                {deleting === camp._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {camps.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No Health Camps Yet</h3>
          <p className="text-gray-400 mb-4">Create your first health camp to get started</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
          >
            Create New Camp
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthCampComponent;