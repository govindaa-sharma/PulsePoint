// import React, { useState, useEffect } from 'react';
// import { MapPin, Phone, Clock, Navigation, Hospital, Pill, Stethoscope, Search } from 'lucide-react';

// const HealthcareLocator = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedService, setSelectedService] = useState('all');
//   const [searchRadius, setSearchRadius] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);

//   // Mock healthcare facilities data
//   const healthcareFacilities = [
//     {
//       id: 1,
//       name: "City General Hospital",
//       type: "hospital",
//       address: "123 Medical Center Dr",
//       phone: "+1 (555) 123-4567",
//       hours: "24/7",
//       distance: 2.3,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.5,
//       specialties: ["Emergency", "Cardiology", "Surgery"]
//     },
//     {
//       id: 2,
//       name: "HealthCare Plus Clinic",
//       type: "clinic",
//       address: "456 Wellness Ave",
//       phone: "+1 (555) 234-5678",
//       hours: "8:00 AM - 8:00 PM",
//       distance: 1.8,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.2,
//       specialties: ["Family Medicine", "Pediatrics"]
//     },
//     {
//       id: 3,
//       name: "MediQuick Pharmacy",
//       type: "pharmacy",
//       address: "789 Health St",
//       phone: "+1 (555) 345-6789",
//       hours: "7:00 AM - 11:00 PM",
//       distance: 0.9,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.7,
//       specialties: ["Prescription Filling", "Health Consultations"]
//     },
//     {
//       id: 4,
//       name: "Sunrise Medical Center",
//       type: "hospital",
//       address: "321 Care Blvd",
//       phone: "+1 (555) 456-7890",
//       hours: "24/7",
//       distance: 3.7,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.3,
//       specialties: ["Orthopedics", "Neurology", "ICU"]
//     },
//     {
//       id: 5,
//       name: "QuickCare Clinic",
//       type: "clinic",
//       address: "654 Rapid Response Rd",
//       phone: "+1 (555) 567-8901",
//       hours: "6:00 AM - 10:00 PM",
//       distance: 2.1,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.1,
//       specialties: ["Urgent Care", "X-Ray", "Lab Services"]
//     },
//     {
//       id: 6,
//       name: "Green Cross Pharmacy",
//       type: "pharmacy",
//       address: "987 Medicine Way",
//       phone: "+1 (555) 678-9012",
//       hours: "8:00 AM - 9:00 PM",
//       distance: 1.5,
//       lat: 19.0760 + Math.random() * 0.01,
//       lng: 72.8777 + Math.random() * 0.01,
//       rating: 4.4,
//       specialties: ["24hr Emergency", "Compounding"]
//     }
//   ];

//   const serviceTypes = [
//     { value: 'all', label: 'All Services', icon: Search, color: 'bg-blue-500' },
//     { value: 'hospital', label: 'Hospitals', icon: Hospital, color: 'bg-red-500' },
//     { value: 'clinic', label: 'Clinics', icon: Stethoscope, color: 'bg-green-500' },
//     { value: 'pharmacy', label: 'Pharmacies', icon: Pill, color: 'bg-purple-500' }
//   ];

//   const filteredFacilities = healthcareFacilities.filter(facility => 
//     selectedService === 'all' || facility.type === selectedService
//   ).filter(facility => facility.distance <= searchRadius);

//   const getUserLocation = () => {
//     setIsLoading(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//           setIsLoading(false);
//         },
//         (error) => {
//           // Fallback to Mumbai coordinates
//           setUserLocation({
//             lat: 19.0760,
//             lng: 72.8777
//           });
//           setIsLoading(false);
//         }
//       );
//     } else {
//       setUserLocation({
//         lat: 19.0760,
//         lng: 72.8777
//       });
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserLocation();
//   }, []);

//   const getServiceIcon = (type) => {
//     switch(type) {
//       case 'hospital': return Hospital;
//       case 'clinic': return Stethoscope;
//       case 'pharmacy': return Pill;
//       default: return MapPin;
//     }
//   };

//   const getServiceColor = (type) => {
//     switch(type) {
//       case 'hospital': return 'bg-red-500';
//       case 'clinic': return 'bg-green-500';
//       case 'pharmacy': return 'bg-purple-500';
//       default: return 'bg-blue-500';
//     }
//   };

//   const handleDirections = (facility) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Header */}
//       <div className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-600 p-2 rounded-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Healthcare Services Locator</h1>
//                 <p className="text-gray-600">Find nearby hospitals, clinics, and pharmacies</p>
//               </div>
//             </div>
//             <button
//               onClick={getUserLocation}
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
//             >
//               <Navigation className="w-4 h-4" />
//               <span>{isLoading ? 'Locating...' : 'Update Location'}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Filters Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Services</h2>
              
//               {/* Service Type Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
//                 <div className="space-y-2">
//                   {serviceTypes.map((type) => {
//                     const IconComponent = type.icon;
//                     return (
//                       <button
//                         key={type.value}
//                         onClick={() => setSelectedService(type.value)}
//                         className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
//                           selectedService === type.value
//                             ? 'border-blue-500 bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className={`p-2 rounded-lg ${type.color}`}>
//                           <IconComponent className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="font-medium text-gray-700">{type.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Search Radius */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search Radius: {searchRadius} km
//                 </label>
//                 <input
//                   type="range"
//                   min="1"
//                   max="20"
//                   value={searchRadius}
//                   onChange={(e) => setSearchRadius(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>1 km</span>
//                   <span>20 km</span>
//                 </div>
//               </div>
//             </div>

//             {/* Facilities List */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 Nearby Services ({filteredFacilities.length})
//               </h2>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {filteredFacilities.map((facility) => {
//                   const ServiceIcon = getServiceIcon(facility.type);
//                   return (
//                     <div
//                       key={facility.id}
//                       onClick={() => setSelectedFacility(facility)}
//                       className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
//                         selectedFacility?.id === facility.id
//                           ? 'border-blue-500 bg-blue-50'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className={`p-2 rounded-lg ${getServiceColor(facility.type)}`}>
//                           <ServiceIcon className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-900 truncate">{facility.name}</h3>
//                           <p className="text-sm text-gray-600 truncate">{facility.address}</p>
//                           <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                             <span>{facility.distance} km</span>
//                             <span>★ {facility.rating}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Map and Details */}
//           <div className="lg:col-span-2">
//             {/* Map Container */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Map View</h2>
//               <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20"></div>
//                 <div className="text-center z-10">
//                   <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
//                   <p className="text-gray-700 font-medium">Interactive Map</p>
//                   <p className="text-gray-600 text-sm">Showing healthcare services near you</p>
//                   {userLocation && (
//                     <div className="mt-4 space-y-2">
//                       {filteredFacilities.slice(0, 3).map((facility, index) => (
//                         <div key={facility.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${getServiceColor(facility.type)}`}></div>
//                           <span className="text-sm font-medium">{facility.name}</span>
//                           <span className="text-xs text-gray-500">{facility.distance}km</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Selected Facility Details */}
//             {selectedFacility && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-3 rounded-lg ${getServiceColor(selectedFacility.type)}`}>
//                       {React.createElement(getServiceIcon(selectedFacility.type), { 
//                         className: "w-6 h-6 text-white" 
//                       })}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900">{selectedFacility.name}</h3>
//                       <p className="text-gray-600 capitalize">{selectedFacility.type}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center space-x-1">
//                       <span className="text-yellow-400">★</span>
//                       <span className="font-semibold text-gray-900">{selectedFacility.rating}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">{selectedFacility.distance} km away</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-3">
//                       <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Address</p>
//                         <p className="text-gray-600">{selectedFacility.address}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Phone</p>
//                         <p className="text-gray-600">{selectedFacility.phone}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Hours</p>
//                         <p className="text-gray-600">{selectedFacility.hours}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {selectedFacility.specialties.map((specialty, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                         >
//                           {specialty}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleDirections(selectedFacility)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Navigation className="w-4 h-4" />
//                         <span>Get Directions</span>
//                       </button>
//                       <a
//                         href={`tel:${selectedFacility.phone}`}
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Phone className="w-4 h-4" />
//                         <span>Call</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthcareLocator;

// import React, { useState, useEffect, useRef } from 'react';
// import { MapPin, Phone, Clock, Navigation, Hospital, Pill, Stethoscope, Search } from 'lucide-react';

// const HealthcareLocator = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedService, setSelectedService] = useState('all');
//   const [searchRadius, setSearchRadius] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);
//   const [map, setMap] = useState(null);
//   const [mapCenter, setMapCenter] = useState([72.8777, 19.0760]); // [lng, lat] for OpenRouteService
//   const mapContainer = useRef(null);

//   // Mock healthcare facilities data
//   const healthcareFacilities = [
//     {
//       id: 1,
//       name: "City General Hospital",
//       type: "hospital",
//       address: "123 Medical Center Dr",
//       phone: "+1 (555) 123-4567",
//       hours: "24/7",
//       distance: 2.3,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01], // [lng, lat]
//       rating: 4.5,
//       specialties: ["Emergency", "Cardiology", "Surgery"]
//     },
//     {
//       id: 2,
//       name: "HealthCare Plus Clinic",
//       type: "clinic",
//       address: "456 Wellness Ave",
//       phone: "+1 (555) 234-5678",
//       hours: "8:00 AM - 8:00 PM",
//       distance: 1.8,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01],
//       rating: 4.2,
//       specialties: ["Family Medicine", "Pediatrics"]
//     },
//     {
//       id: 3,
//       name: "MediQuick Pharmacy",
//       type: "pharmacy",
//       address: "789 Health St",
//       phone: "+1 (555) 345-6789",
//       hours: "7:00 AM - 11:00 PM",
//       distance: 0.9,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01],
//       rating: 4.7,
//       specialties: ["Prescription Filling", "Health Consultations"]
//     },
//     {
//       id: 4,
//       name: "Sunrise Medical Center",
//       type: "hospital",
//       address: "321 Care Blvd",
//       phone: "+1 (555) 456-7890",
//       hours: "24/7",
//       distance: 3.7,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01],
//       rating: 4.3,
//       specialties: ["Orthopedics", "Neurology", "ICU"]
//     },
//     {
//       id: 5,
//       name: "QuickCare Clinic",
//       type: "clinic",
//       address: "654 Rapid Response Rd",
//       phone: "+1 (555) 567-8901",
//       hours: "6:00 AM - 10:00 PM",
//       distance: 2.1,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01],
//       rating: 4.1,
//       specialties: ["Urgent Care", "X-Ray", "Lab Services"]
//     },
//     {
//       id: 6,
//       name: "Green Cross Pharmacy",
//       type: "pharmacy",
//       address: "987 Medicine Way",
//       phone: "+1 (555) 678-9012",
//       hours: "8:00 AM - 9:00 PM",
//       distance: 1.5,
//       coordinates: [72.8777 + Math.random() * 0.01, 19.0760 + Math.random() * 0.01],
//       rating: 4.4,
//       specialties: ["24hr Emergency", "Compounding"]
//     }
//   ];

//   const serviceTypes = [
//     { value: 'all', label: 'All Services', icon: Search, color: 'bg-blue-500' },
//     { value: 'hospital', label: 'Hospitals', icon: Hospital, color: 'bg-red-500' },
//     { value: 'clinic', label: 'Clinics', icon: Stethoscope, color: 'bg-green-500' },
//     { value: 'pharmacy', label: 'Pharmacies', icon: Pill, color: 'bg-purple-500' }
//   ];

//   const filteredFacilities = healthcareFacilities.filter(facility => 
//     selectedService === 'all' || facility.type === selectedService
//   ).filter(facility => facility.distance <= searchRadius);

//   const getUserLocation = () => {
//     setIsLoading(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setUserLocation(location);
//           setMapCenter([location.lng, location.lat]);
//           setIsLoading(false);
          
//           // Reinitialize map with new center
//           if (window.map) {
//             window.map.setView([location.lat, location.lng], 13);
//           } else {
//             initMap();
//           }
//         },
//         (error) => {
//           // Fallback to Mumbai coordinates
//           const location = {
//             lat: 19.0760,
//             lng: 72.8777
//           };
//           setUserLocation(location);
//           setMapCenter([location.lng, location.lat]);
//           setIsLoading(false);
//         }
//       );
//     } else {
//       const location = {
//         lat: 19.0760,
//         lng: 72.8777
//       };
//       setUserLocation(location);
//       setMapCenter([location.lng, location.lat]);
//       setIsLoading(false);
//     }
//   };

//   // Initialize OpenRouteService map
//   const initMap = () => {
//     if (!mapContainer.current) return;
    
//     // Clear previous map if exists
//     if (window.map) {
//       window.map.remove();
//     }
    
//     // Initialize the map
//     window.map = L.map(mapContainer.current).setView([mapCenter[1], mapCenter[0]], 13);
    
//     // Add OpenRouteService tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(window.map);
    
//     // Add user location marker if available
//     if (userLocation) {
//       L.marker([userLocation.lat, userLocation.lng])
//         .addTo(window.map)
//         .bindPopup('Your Location')
//         .openPopup();
//     }
    
//     // Add markers for healthcare facilities
//     filteredFacilities.forEach(facility => {
//       const marker = L.marker([facility.coordinates[1], facility.coordinates[0]])
//         .addTo(window.map)
//         .bindPopup(`
//           <div>
//             <strong>${facility.name}</strong><br/>
//             ${facility.address}<br/>
//             ${facility.distance} km away
//           </div>
//         `);
      
//       // Add click event to select facility
//       marker.on('click', () => {
//         setSelectedFacility(facility);
//       });
//     });
//   };

//   useEffect(() => {
//     // Load Leaflet CSS and JS dynamically
//     const loadLeaflet = () => {
//       // Check if Leaflet is already loaded
//       if (window.L) {
//         initMap();
//         return;
//       }
      
//       // Load Leaflet CSS
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
//       link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
//       link.crossOrigin = '';
//       document.head.appendChild(link);
      
//       // Load Leaflet JS
//       const script = document.createElement('script');
//       script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
//       script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
//       script.crossOrigin = '';
//       script.onload = initMap;
//       document.head.appendChild(script);
//     };
    
//     loadLeaflet();
    
//     return () => {
//       // Clean up map when component unmounts
//       if (window.map) {
//         window.map.remove();
//         window.map = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Update map when facilities or center changes
//     if (window.map && userLocation) {
//       initMap();
//     }
//   }, [filteredFacilities, mapCenter]);

//   useEffect(() => {
//     if (selectedFacility) {
//       setMapCenter(selectedFacility.coordinates);
//       if (window.map) {
//         window.map.setView([selectedFacility.coordinates[1], selectedFacility.coordinates[0]], 15);
//       }
//     }
//   }, [selectedFacility]);

//   const getServiceIcon = (type) => {
//     switch(type) {
//       case 'hospital': return Hospital;
//       case 'clinic': return Stethoscope;
//       case 'pharmacy': return Pill;
//       default: return MapPin;
//     }
//   };

//   const getServiceColor = (type) => {
//     switch(type) {
//       case 'hospital': return 'bg-red-500';
//       case 'clinic': return 'bg-green-500';
//       case 'pharmacy': return 'bg-purple-500';
//       default: return 'bg-blue-500';
//     }
//   };

//   const handleDirections = (facility) => {
//     if (userLocation) {
//       // Use OpenRouteService directions
//       const url = `https://maps.openrouteservice.org/directions?n1=${userLocation.lat}&n2=${userLocation.lng}&n3=13&a=${userLocation.lat},${userLocation.lng},${facility.coordinates[1]},${facility.coordinates[0]}&b=0&c=0&k1=en-US&k2=km`;
//       window.open(url, '_blank');
//     } else {
//       // Fallback to Google Maps
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[1]},${facility.coordinates[0]}`;
//       window.open(url, '_blank');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Header */}
//       <div className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-600 p-2 rounded-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Healthcare Services Locator</h1>
//                 <p className="text-gray-600">Find nearby hospitals, clinics, and pharmacies</p>
//               </div>
//             </div>
//             <button
//               onClick={getUserLocation}
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
//             >
//               <Navigation className="w-4 h-4" />
//               <span>{isLoading ? 'Locating...' : 'Update Location'}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Filters Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Services</h2>
              
//               {/* Service Type Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
//                 <div className="space-y-2">
//                   {serviceTypes.map((type) => {
//                     const IconComponent = type.icon;
//                     return (
//                       <button
//                         key={type.value}
//                         onClick={() => setSelectedService(type.value)}
//                         className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
//                           selectedService === type.value
//                             ? 'border-blue-500 bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className={`p-2 rounded-lg ${type.color}`}>
//                           <IconComponent className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="font-medium text-gray-700">{type.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Search Radius */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search Radius: {searchRadius} km
//                 </label>
//                 <input
//                   type="range"
//                   min="1"
//                   max="20"
//                   value={searchRadius}
//                   onChange={(e) => setSearchRadius(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>1 km</span>
//                   <span>20 km</span>
//                 </div>
//               </div>
//             </div>

//             {/* Facilities List */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 Nearby Services ({filteredFacilities.length})
//               </h2>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {filteredFacilities.map((facility) => {
//                   const ServiceIcon = getServiceIcon(facility.type);
//                   return (
//                     <div
//                       key={facility.id}
//                       onClick={() => setSelectedFacility(facility)}
//                       className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
//                         selectedFacility?.id === facility.id
//                           ? 'border-blue-500 bg-blue-50'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className={`p-2 rounded-lg ${getServiceColor(facility.type)}`}>
//                           <ServiceIcon className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-900 truncate">{facility.name}</h3>
//                           <p className="text-sm text-gray-600 truncate">{facility.address}</p>
//                           <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                             <span>{facility.distance} km</span>
//                             <span>★ {facility.rating}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Map and Details */}
//           <div className="lg:col-span-2">
//             {/* Map Container */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Map View</h2>
//               <div 
//                 ref={mapContainer} 
//                 className="rounded-lg h-80 bg-gray-100"
//                 style={{ minHeight: '320px' }}
//               >
//                 {/* Map will be rendered here by Leaflet */}
//                 {!userLocation && (
//                   <div className="flex items-center justify-center h-full">
//                     <div className="text-center">
//                       <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
//                       <p className="text-gray-700 font-medium">Map Loading</p>
//                       <p className="text-gray-600 text-sm">Getting your location...</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Selected Facility Details */}
//             {selectedFacility && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-3 rounded-lg ${getServiceColor(selectedFacility.type)}`}>
//                       {React.createElement(getServiceIcon(selectedFacility.type), { 
//                         className: "w-6 h-6 text-white" 
//                       })}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900">{selectedFacility.name}</h3>
//                       <p className="text-gray-600 capitalize">{selectedFacility.type}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center space-x-1">
//                       <span className="text-yellow-400">★</span>
//                       <span className="font-semibold text-gray-900">{selectedFacility.rating}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">{selectedFacility.distance} km away</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-3">
//                       <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Address</p>
//                         <p className="text-gray-600">{selectedFacility.address}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Phone</p>
//                         <p className="text-gray-600">{selectedFacility.phone}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Hours</p>
//                         <p className="text-gray-600">{selectedFacility.hours}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {selectedFacility.specialties.map((specialty, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                         >
//                           {specialty}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleDirections(selectedFacility)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Navigation className="w-4 h-4" />
//                         <span>Get Directions</span>
//                       </button>
//                       <a
//                         href={`tel:${selectedFacility.phone}`}
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Phone className="w-4 h-4" />
//                         <span>Call</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthcareLocator;





// import React, { useState, useEffect, useRef } from 'react';
// import { MapPin, Phone, Clock, Navigation, Hospital, Pill, Stethoscope, Search } from 'lucide-react';

// const HealthcareLocator = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedService, setSelectedService] = useState('all');
//   const [searchRadius, setSearchRadius] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);
//   const [mapInitialized, setMapInitialized] = useState(false);
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markersRef = useRef([]);

//   // Mock healthcare facilities data
//   const healthcareFacilities = [
//     {
//       id: 1,
//       name: "City General Hospital",
//       type: "hospital",
//       address: "123 Medical Center Dr",
//       phone: "+1 (555) 123-4567",
//       hours: "24/7",
//       distance: 2.3,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01], // [lat, lng]
//       rating: 4.5,
//       specialties: ["Emergency", "Cardiology", "Surgery"]
//     },
//     {
//       id: 2,
//       name: "HealthCare Plus Clinic",
//       type: "clinic",
//       address: "456 Wellness Ave",
//       phone: "+1 (555) 234-5678",
//       hours: "8:00 AM - 8:00 PM",
//       distance: 1.8,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01],
//       rating: 4.2,
//       specialties: ["Family Medicine", "Pediatrics"]
//     },
//     {
//       id: 3,
//       name: "MediQuick Pharmacy",
//       type: "pharmacy",
//       address: "789 Health St",
//       phone: "+1 (555) 345-6789",
//       hours: "7:00 AM - 11:00 PM",
//       distance: 0.9,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01],
//       rating: 4.7,
//       specialties: ["Prescription Filling", "Health Consultations"]
//     },
//     {
//       id: 4,
//       name: "Sunrise Medical Center",
//       type: "hospital",
//       address: "321 Care Blvd",
//       phone: "+1 (555) 456-7890",
//       hours: "24/7",
//       distance: 3.7,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01],
//       rating: 4.3,
//       specialties: ["Orthopedics", "Neurology", "ICU"]
//     },
//     {
//       id: 5,
//       name: "QuickCare Clinic",
//       type: "clinic",
//       address: "654 Rapid Response Rd",
//       phone: "+1 (555) 567-8901",
//       hours: "6:00 AM - 10:00 PM",
//       distance: 2.1,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01],
//       rating: 4.1,
//       specialties: ["Urgent Care", "X-Ray", "Lab Services"]
//     },
//     {
//       id: 6,
//       name: "Green Cross Pharmacy",
//       type: "pharmacy",
//       address: "987 Medicine Way",
//       phone: "+1 (555) 678-9012",
//       hours: "8:00 AM - 9:00 PM",
//       distance: 1.5,
//       coordinates: [19.0760 + Math.random() * 0.01, 72.8777 + Math.random() * 0.01],
//       rating: 4.4,
//       specialties: ["24hr Emergency", "Compounding"]
//     }
//   ];

//   const serviceTypes = [
//     { value: 'all', label: 'All Services', icon: Search, color: 'bg-blue-500' },
//     { value: 'hospital', label: 'Hospitals', icon: Hospital, color: 'bg-red-500' },
//     { value: 'clinic', label: 'Clinics', icon: Stethoscope, color: 'bg-green-500' },
//     { value: 'pharmacy', label: 'Pharmacies', icon: Pill, color: 'bg-purple-500' }
//   ];

//   const filteredFacilities = healthcareFacilities.filter(facility => 
//     selectedService === 'all' || facility.type === selectedService
//   ).filter(facility => facility.distance <= searchRadius);

//   const getUserLocation = () => {
//     setIsLoading(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setUserLocation(location);
//           setIsLoading(false);
          
//           // Initialize or update map with new location
//           if (mapRef.current) {
//             mapRef.current.setView([location.lat, location.lng], 13);
//             updateMapMarkers();
//           } else {
//             initMap(location);
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Fallback to Mumbai coordinates
//           const location = {
//             lat: 19.0760,
//             lng: 72.8777
//           };
//           setUserLocation(location);
//           setIsLoading(false);
          
//           if (!mapRef.current) {
//             initMap(location);
//           }
//         }
//       );
//     } else {
//       // Fallback to Mumbai coordinates
//       const location = {
//         lat: 19.0760,
//         lng: 72.8777
//       };
//       setUserLocation(location);
//       setIsLoading(false);
      
//       if (!mapRef.current) {
//         initMap(location);
//       }
//     }
//   };

//   // Initialize map
//   const initMap = (centerLocation) => {
//     if (!mapContainer.current || mapRef.current) return;
    
//     // Create map with center location
//     mapRef.current = L.map(mapContainer.current).setView(
//       [centerLocation.lat, centerLocation.lng], 
//       13
//     );
    
//     // Add OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(mapRef.current);
    
//     // Add user location marker
//     const userMarker = L.marker([centerLocation.lat, centerLocation.lng])
//       .addTo(mapRef.current)
//       .bindPopup('Your Location')
//       .openPopup();
    
//     // Add custom icon for user location
//     userMarker.setIcon(
//       L.icon({
//         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//       })
//     );
    
//     // Add markers for healthcare facilities
//     updateMapMarkers();
    
//     setMapInitialized(true);
//   };

//   // Update map markers based on filtered facilities
//   const updateMapMarkers = () => {
//     if (!mapRef.current) return;
    
//     // Clear existing markers
//     markersRef.current.forEach(marker => {
//       mapRef.current.removeLayer(marker);
//     });
//     markersRef.current = [];
    
//     // Add new markers for filtered facilities
//     filteredFacilities.forEach(facility => {
//       const marker = L.marker(facility.coordinates)
//         .addTo(mapRef.current)
//         .bindPopup(`
//           <div>
//             <strong>${facility.name}</strong><br/>
//             ${facility.address}<br/>
//             ${facility.distance} km away
//           </div>
//         `);
      
//       // Add click event to select facility
//       marker.on('click', () => {
//         setSelectedFacility(facility);
//       });
      
//       markersRef.current.push(marker);
//     });
//   };

//   useEffect(() => {
//     // Load Leaflet CSS and JS dynamically
//     const loadLeaflet = () => {
//       // Check if Leaflet is already loaded
//       if (window.L) {
//         // Get user location which will initialize the map
//         getUserLocation();
//         return;
//       }
      
//       // Load Leaflet CSS
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
//       link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
//       link.crossOrigin = '';
//       document.head.appendChild(link);
      
//       // Load Leaflet JS
//       const script = document.createElement('script');
//       script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
//       script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
//       script.crossOrigin = '';
//       script.onload = () => {
//         // Get user location which will initialize the map
//         getUserLocation();
//       };
//       document.head.appendChild(script);
//     };
    
//     loadLeaflet();
    
//     return () => {
//       // Clean up map when component unmounts
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Update map markers when facilities change
//     if (mapRef.current) {
//       updateMapMarkers();
//     }
//   }, [filteredFacilities]);

//   useEffect(() => {
//     // Center map on selected facility
//     if (selectedFacility && mapRef.current) {
//       mapRef.current.setView(selectedFacility.coordinates, 15);
//     }
//   }, [selectedFacility]);

//   const getServiceIcon = (type) => {
//     switch(type) {
//       case 'hospital': return Hospital;
//       case 'clinic': return Stethoscope;
//       case 'pharmacy': return Pill;
//       default: return MapPin;
//     }
//   };

//   const getServiceColor = (type) => {
//     switch(type) {
//       case 'hospital': return 'bg-red-500';
//       case 'clinic': return 'bg-green-500';
//       case 'pharmacy': return 'bg-purple-500';
//       default: return 'bg-blue-500';
//     }
//   };

//   const handleDirections = (facility) => {
//     if (userLocation) {
//       // Use Google Maps directions
//       const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
//       window.open(url, '_blank');
//     } else {
//       // Fallback to just destination
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
//       window.open(url, '_blank');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Header */}
//       <div className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-600 p-2 rounded-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Healthcare Services Locator</h1>
//                 <p className="text-gray-600">Find nearby hospitals, clinics, and pharmacies</p>
//               </div>
//             </div>
//             <button
//               onClick={getUserLocation}
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
//             >
//               <Navigation className="w-4 h-4" />
//               <span>{isLoading ? 'Locating...' : 'Update Location'}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Filters Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Services</h2>
              
//               {/* Service Type Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
//                 <div className="space-y-2">
//                   {serviceTypes.map((type) => {
//                     const IconComponent = type.icon;
//                     return (
//                       <button
//                         key={type.value}
//                         onClick={() => setSelectedService(type.value)}
//                         className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
//                           selectedService === type.value
//                             ? 'border-blue-500 bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className={`p-2 rounded-lg ${type.color}`}>
//                           <IconComponent className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="font-medium text-gray-700">{type.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Search Radius */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search Radius: {searchRadius} km
//                 </label>
//                 <input
//                   type="range"
//                   min="1"
//                   max="20"
//                   value={searchRadius}
//                   onChange={(e) => setSearchRadius(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>1 km</span>
//                   <span>20 km</span>
//                 </div>
//               </div>
//             </div>

//             {/* Facilities List */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 Nearby Services ({filteredFacilities.length})
//               </h2>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {filteredFacilities.map((facility) => {
//                   const ServiceIcon = getServiceIcon(facility.type);
//                   return (
//                     <div
//                       key={facility.id}
//                       onClick={() => setSelectedFacility(facility)}
//                       className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
//                         selectedFacility?.id === facility.id
//                           ? 'border-blue-500 bg-blue-50'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className={`p-2 rounded-lg ${getServiceColor(facility.type)}`}>
//                           <ServiceIcon className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-900 truncate">{facility.name}</h3>
//                           <p className="text-sm text-gray-600 truncate">{facility.address}</p>
//                           <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                             <span>{facility.distance} km</span>
//                             <span>★ {facility.rating}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Map and Details */}
//           <div className="lg:col-span-2">
//             {/* Map Container */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Map View</h2>
//               <div 
//                 ref={mapContainer} 
//                 className="rounded-lg h-80 bg-gray-100"
//                 style={{ minHeight: '320px' }}
//               >
//                 {!mapInitialized && (
//                   <div className="flex items-center justify-center h-full">
//                     <div className="text-center">
//                       <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
//                       <p className="text-gray-700 font-medium">Map Loading</p>
//                       <p className="text-gray-600 text-sm">
//                         {isLoading ? 'Getting your location...' : 'Initializing map...'}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Selected Facility Details */}
//             {selectedFacility && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-3 rounded-lg ${getServiceColor(selectedFacility.type)}`}>
//                       {React.createElement(getServiceIcon(selectedFacility.type), { 
//                         className: "w-6 h-6 text-white" 
//                       })}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900">{selectedFacility.name}</h3>
//                       <p className="text-gray-600 capitalize">{selectedFacility.type}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center space-x-1">
//                       <span className="text-yellow-400">★</span>
//                       <span className="font-semibold text-gray-900">{selectedFacility.rating}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">{selectedFacility.distance} km away</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-3">
//                       <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Address</p>
//                         <p className="text-gray-600">{selectedFacility.address}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Phone</p>
//                         <p className="text-gray-600">{selectedFacility.phone}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-3">
//                       <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
//                       <div>
//                         <p className="font-medium text-gray-900">Hours</p>
//                         <p className="text-gray-600">{selectedFacility.hours}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {selectedFacility.specialties.map((specialty, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                         >
//                           {specialty}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleDirections(selectedFacility)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Navigation className="w-4 h-4" />
//                         <span>Get Directions</span>
//                       </button>
//                       <a
//                         href={`tel:${selectedFacility.phone}`}
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                       >
//                         <Phone className="w-4 h-4" />
//                         <span>Call</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthcareLocator;





import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Navigation, Hospital, Pill, Stethoscope, Search, Loader } from 'lucide-react';

const HealthcareLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedService, setSelectedService] = useState('all');
  const [searchRadius, setSearchRadius] = useState(2); // Default to 2km
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingFacilities, setIsFetchingFacilities] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [healthcareFacilities, setHealthcareFacilities] = useState([]);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const serviceTypes = [
    { value: 'all', label: 'All Services', icon: Search, color: 'bg-blue-500' },
    { value: 'hospital', label: 'Hospitals', icon: Hospital, color: 'bg-red-500' },
    { value: 'clinic', label: 'Clinics', icon: Stethoscope, color: 'bg-green-500' },
    { value: 'pharmacy', label: 'Pharmacies', icon: Pill, color: 'bg-purple-500' }
  ];

  // Filter facilities based on selected service and search radius
  const filteredFacilities = healthcareFacilities.filter(facility => 
    selectedService === 'all' || facility.type === selectedService
  ).filter(facility => facility.distance <= searchRadius);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Fetch healthcare facilities from Overpass API
  const fetchHealthcareFacilities = async (lat, lng, radius) => {
    setIsFetchingFacilities(true);
    setError(null);
    
    try {
      // Define OSM tags for different healthcare facility types
      const facilityTypes = {
        hospital: 'amenity=hospital',
        clinic: 'amenity=clinic OR healthcare=clinic',
        pharmacy: 'amenity=pharmacy'
      };
      
      let overpassQuery = '';
      
      if (selectedService === 'all') {
        // Query all healthcare facilities
        overpassQuery = `(
          node[${facilityTypes.hospital}](around:${radius * 1000},${lat},${lng});
          node[${facilityTypes.clinic}](around:${radius * 1000},${lat},${lng});
          node[${facilityTypes.pharmacy}](around:${radius * 1000},${lat},${lng});
          way[${facilityTypes.hospital}](around:${radius * 1000},${lat},${lng});
          way[${facilityTypes.clinic}](around:${radius * 1000},${lat},${lng});
          way[${facilityTypes.pharmacy}](around:${radius * 1000},${lat},${lng});
          relation[${facilityTypes.hospital}](around:${radius * 1000},${lat},${lng});
          relation[${facilityTypes.clinic}](around:${radius * 1000},${lat},${lng});
          relation[${facilityTypes.pharmacy}](around:${radius * 1000},${lat},${lng});
        );`;
      } else {
        // Query specific facility type
        overpassQuery = `(
          node[${facilityTypes[selectedService]}](around:${radius * 1000},${lat},${lng});
          way[${facilityTypes[selectedService]}](around:${radius * 1000},${lat},${lng});
          relation[${facilityTypes[selectedService]}](around:${radius * 1000},${lat},${lng});
        );`;
      }
      
      const query = `
        [out:json][timeout:25];
        ${overpassQuery}
        out center;
      `;
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch healthcare facilities');
      }
      
      const data = await response.json();
      
      // Process the results
      const facilities = data.elements.map(element => {
        // Get coordinates - handle different OSM element types
        let coords;
        if (element.type === 'node') {
          coords = [element.lat, element.lon];
        } else if (element.center) {
          coords = [element.center.lat, element.center.lon];
        } else {
          // Skip elements without coordinates
          return null;
        }
        
        const distance = calculateDistance(lat, lng, coords[0], coords[1]);
        
        // Determine facility type based on tags
        let type = 'clinic';
        if (element.tags.amenity === 'hospital') type = 'hospital';
        if (element.tags.amenity === 'pharmacy') type = 'pharmacy';
        if (element.tags.healthcare === 'clinic') type = 'clinic';
        
        return {
          id: element.id,
          name: element.tags.name || 'Unnamed Facility',
          type: type,
          address: element.tags['addr:full'] || 
                   [element.tags['addr:street'], element.tags['addr:city']]
                     .filter(Boolean).join(', ') || 
                   'Address not available',
          phone: element.tags.phone || 'Phone not available',
          hours: element.tags.opening_hours || 'Hours not available',
          distance: parseFloat(distance.toFixed(1)),
          coordinates: coords,
          rating: (3.5 + Math.random() * 1.5).toFixed(1), // Mock rating
          specialties: getSpecialtiesFromTags(element.tags, type),
          tags: element.tags
        };
      }).filter(Boolean); // Remove null entries
      
      setHealthcareFacilities(facilities);
      
    } catch (err) {
      console.error('Error fetching healthcare facilities:', err);
      setError('Failed to load healthcare facilities. Please try again.');
      
      // Fallback to mock data if API fails
      setHealthcareFacilities(generateMockFacilities(lat, lng, radius));
    } finally {
      setIsFetchingFacilities(false);
    }
  };

  // Generate mock facilities as fallback
  const generateMockFacilities = (lat, lng, radius) => {
    const facilities = [];
    const types = ['hospital', 'clinic', 'pharmacy'];
    const names = {
      hospital: ['General Hospital', 'Medical Center', 'City Hospital', 'Community Hospital'],
      clinic: ['Health Clinic', 'Medical Clinic', 'Urgent Care', 'Family Practice'],
      pharmacy: ['Pharmacy', 'Drug Store', 'Medicare', 'Health Pharmacy']
    };
    
    // Generate 6-12 random facilities
    const count = 6 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const name = `${names[type][Math.floor(Math.random() * names[type].length)]} ${i + 1}`;
      
      // Generate random coordinates within the radius
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radius;
      const dx = distance * Math.cos(angle) / 111.32; // 1 degree ≈ 111.32 km
      const dy = distance * Math.sin(angle) / (111.32 * Math.cos(lat * Math.PI / 180));
      
      const facilityLat = lat + dx;
      const facilityLng = lng + dy;
      const actualDistance = calculateDistance(lat, lng, facilityLat, facilityLng);
      
      facilities.push({
        id: i,
        name: name,
        type: type,
        address: `${Math.floor(100 + Math.random() * 900)} ${['Main St', 'Oak Ave', 'Maple Rd'][Math.floor(Math.random() * 3)]}`,
        phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        hours: Math.random() > 0.5 ? '8:00 AM - 6:00 PM' : '24/7',
        distance: parseFloat(actualDistance.toFixed(1)),
        coordinates: [facilityLat, facilityLng],
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        specialties: getMockSpecialties(type)
      });
    }
    
    return facilities;
  };

  const getSpecialtiesFromTags = (tags, type) => {
    const specialties = [];
    
    if (tags.healthcare) {
      specialties.push(tags.healthcare);
    }
    
    // Add some common specialties based on facility type
    if (type === 'hospital') {
      specialties.push('Emergency', 'Surgery', 'ICU');
    } else if (type === 'clinic') {
      specialties.push('Primary Care', 'Urgent Care');
    } else if (type === 'pharmacy') {
      specialties.push('Prescriptions', 'Health Products');
    }
    
    return specialties.length > 0 ? specialties : ['General Healthcare'];
  };

  const getMockSpecialties = (type) => {
    const specialties = {
      hospital: ['Emergency', 'Surgery', 'Cardiology', 'ICU', 'Pediatrics'],
      clinic: ['Primary Care', 'Urgent Care', 'Family Medicine', 'Vaccinations'],
      pharmacy: ['Prescriptions', 'Health Products', 'Consultations']
    };
    
    // Return 2-3 random specialties
    const count = 2 + Math.floor(Math.random() * 2);
    const result = [];
    const available = [...specialties[type]];
    
    for (let i = 0; i < count && available.length > 0; i++) {
      const index = Math.floor(Math.random() * available.length);
      result.push(available.splice(index, 1)[0]);
    }
    
    return result;
  };

  const getUserLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLoading(false);
          
          // Fetch facilities based on location and current search radius
          await fetchHealthcareFacilities(location.lat, location.lng, searchRadius);
          
          // Initialize or update map
          if (mapRef.current) {
            mapRef.current.setView([location.lat, location.lng], 13);
            updateMapMarkers();
          } else {
            initMap(location);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError('Could not get your location. Using default location.');
          
          // Fallback to Mumbai coordinates
          const location = {
            lat: 19.0760,
            lng: 72.8777
          };
          setUserLocation(location);
          setIsLoading(false);
          
          // Fetch facilities for fallback location
          fetchHealthcareFacilities(location.lat, location.lng, searchRadius);
          
          if (!mapRef.current) {
            initMap(location);
          }
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Using default location.');
      
      // Fallback to Mumbai coordinates
      const location = {
        lat: 19.0760,
        lng: 72.8777
      };
      setUserLocation(location);
      setIsLoading(false);
      
      // Fetch facilities for fallback location
      fetchHealthcareFacilities(location.lat, location.lng, searchRadius);
      
      if (!mapRef.current) {
        initMap(location);
      }
    }
  };

  // Initialize map
  const initMap = (centerLocation) => {
    if (!mapContainer.current || mapRef.current) return;
    
    // Create map with center location
    mapRef.current = L.map(mapContainer.current).setView(
      [centerLocation.lat, centerLocation.lng], 
      13
    );
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);
    
    // Add user location marker
    const userMarker = L.marker([centerLocation.lat, centerLocation.lng])
      .addTo(mapRef.current)
      .bindPopup('Your Location')
      .openPopup();
    
    // Add custom icon for user location
    userMarker.setIcon(
      L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    );
    
    // Add circle to show search radius
    const radiusCircle = L.circle([centerLocation.lat, centerLocation.lng], {
      color: 'blue',
      fillColor: '#3388ff',
      fillOpacity: 0.2,
      radius: searchRadius * 1000 // Convert km to meters
    }).addTo(mapRef.current);
    
    // Add markers for healthcare facilities
    updateMapMarkers();
    
    setMapInitialized(true);
  };

  // Update map markers based on filtered facilities
  const updateMapMarkers = () => {
    if (!mapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = [];
    
    // Add new markers for filtered facilities
    filteredFacilities.forEach(facility => {
      const markerColor = getMarkerColor(facility.type);
      
      const marker = L.marker(facility.coordinates, {
        icon: L.icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      })
      .addTo(mapRef.current)
      .bindPopup(`
        <div class="p-2">
          <strong>${facility.name}</strong><br/>
          <small>${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}</small><br/>
          ${facility.address}<br/>
          ${facility.distance} km away
        </div>
      `);
      
      // Add click event to select facility
      marker.on('click', () => {
        setSelectedFacility(facility);
      });
      
      markersRef.current.push(marker);
    });
  };

  const getMarkerColor = (type) => {
    switch(type) {
      case 'hospital': return 'red';
      case 'clinic': return 'green';
      case 'pharmacy': return 'violet';
      default: return 'blue';
    }
  };

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = () => {
      // Check if Leaflet is already loaded
      if (window.L) {
        // Get user location which will initialize the map
        getUserLocation();
        return;
      }
      
      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
      link.crossOrigin = '';
      document.head.appendChild(link);
      
      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
      script.crossOrigin = '';
      script.onload = () => {
        // Get user location which will initialize the map
        getUserLocation();
      };
      document.head.appendChild(script);
    };
    
    loadLeaflet();
    
    return () => {
      // Clean up map when component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update map markers when facilities change
    if (mapRef.current && userLocation) {
      updateMapMarkers();
      
      // Update search radius circle
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Circle) {
          mapRef.current.removeLayer(layer);
        }
      });
      
      L.circle([userLocation.lat, userLocation.lng], {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.2,
        radius: searchRadius * 1000
      }).addTo(mapRef.current);
    }
  }, [healthcareFacilities, searchRadius]);

  useEffect(() => {
    // Refetch facilities when service type or search radius changes
    if (userLocation) {
      fetchHealthcareFacilities(userLocation.lat, userLocation.lng, searchRadius);
    }
  }, [selectedService, searchRadius]);

  useEffect(() => {
    // Center map on selected facility
    if (selectedFacility && mapRef.current) {
      mapRef.current.setView(selectedFacility.coordinates, 15);
    }
  }, [selectedFacility]);

  const getServiceIcon = (type) => {
    switch(type) {
      case 'hospital': return Hospital;
      case 'clinic': return Stethoscope;
      case 'pharmacy': return Pill;
      default: return MapPin;
    }
  };

  const getServiceColor = (type) => {
    switch(type) {
      case 'hospital': return 'bg-red-500';
      case 'clinic': return 'bg-green-500';
      case 'pharmacy': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const handleDirections = (facility) => {
    if (userLocation) {
      // Use Google Maps directions
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
      window.open(url, '_blank');
    } else {
      // Fallback to just destination
      const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Healthcare Services Locator</h1>
                <p className="text-gray-600">Find nearby hospitals, clinics, and pharmacies</p>
              </div>
            </div>
            <button
              onClick={getUserLocation}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Navigation className="w-4 h-4" />
              <span>{isLoading ? 'Locating...' : 'Update Location'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Services</h2>
              
              {/* Service Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
                <div className="space-y-2">
                  {serviceTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setSelectedService(type.value)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                          selectedService === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Radius */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Radius: {searchRadius} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>

            {/* Facilities List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Nearby Services ({filteredFacilities.length})
                </h2>
                {isFetchingFacilities && <Loader className="w-5 h-5 animate-spin text-blue-600" />}
              </div>
              
              {isFetchingFacilities ? (
                <div className="flex justify-center items-center h-40">
                  <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading facilities...</span>
                </div>
              ) : filteredFacilities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No facilities found within {searchRadius} km</p>
                  <p className="text-sm">Try increasing the search radius</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredFacilities.map((facility) => {
                    const ServiceIcon = getServiceIcon(facility.type);
                    return (
                      <div
                        key={facility.id}
                        onClick={() => setSelectedFacility(facility)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                          selectedFacility?.id === facility.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getServiceColor(facility.type)}`}>
                            <ServiceIcon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{facility.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{facility.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{facility.distance} km</span>
                              <span>★ {facility.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-2">
            {/* Map Container */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Map View</h2>
              <div 
                ref={mapContainer} 
                className="rounded-lg h-80 bg-gray-100"
                style={{ minHeight: '320px' }}
              >
                {!mapInitialized && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-700 font-medium">Map Loading</p>
                      <p className="text-gray-600 text-sm">
                        {isLoading ? 'Getting your location...' : 'Initializing map...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Facility Details */}
            {selectedFacility && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${getServiceColor(selectedFacility.type)}`}>
                      {React.createElement(getServiceIcon(selectedFacility.type), { 
                        className: "w-6 h-6 text-white" 
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedFacility.name}</h3>
                      <p className="text-gray-600 capitalize">{selectedFacility.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-900">{selectedFacility.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedFacility.distance} km away</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{selectedFacility.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{selectedFacility.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Hours</p>
                        <p className="text-gray-600">{selectedFacility.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedFacility.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDirections(selectedFacility)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Get Directions</span>
                      </button>
                      <a
                        href={`tel:${selectedFacility.phone.replace(/\D/g, '')}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareLocator;