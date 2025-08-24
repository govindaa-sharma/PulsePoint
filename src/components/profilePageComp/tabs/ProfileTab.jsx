// import React from 'react';
// import { Mail, Phone, MapPin, Calendar, Globe, GraduationCap } from 'lucide-react';

// const ProfileTab = ({ userData, tempData, isEditing, handleInputChange, formatDate }) => {
//   return (
//     <div className="space-y-8">
//       {/* Bio */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
//         {isEditing ? (
//           <textarea
//             value={tempData.bio}
//             onChange={(e) => handleInputChange('bio', e.target.value)}
//             rows={4}
//             className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
//             placeholder="Tell us about yourself..."
//           />
//         ) : (
//           <p className="text-gray-600 leading-relaxed">
//             {userData.bio || 'Add a bio to tell others about yourself...'}
//           </p>
//         )}
//       </div>

//       {/* Contact Info */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex items-center space-x-3">
//             <Mail className="w-5 h-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="email"
//                 value={tempData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               />
//             ) : (
//               <span className="text-gray-700">{userData.email}</span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <Phone className="w-5 h-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="tel"
//                 value={tempData.phone}
//                 onChange={(e) => handleInputChange('phone', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                 placeholder="Phone number"
//               />
//             ) : (
//               <span className="text-gray-700">
//                 {userData.phone || 'Add phone number'}
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <MapPin className="w-5 h-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={tempData.location}
//                 onChange={(e) => handleInputChange('location', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                 placeholder="Location"
//               />
//             ) : (
//               <span className="text-gray-700">
//                 {userData.location || 'Add your location'}
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <Calendar className="w-5 w-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="date"
//                 value={tempData.birthDate}
//                 onChange={(e) => handleInputChange('birthDate', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               />
//             ) : (
//               <span className="text-gray-700">
//                 {formatDate(userData.birthDate)}
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <Globe className="w-5 h-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="url"
//                 value={tempData.website}
//                 onChange={(e) => handleInputChange('website', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                 placeholder="Website URL"
//               />
//             ) : (
//               <span className="text-gray-700">
//                 {userData.website ? (
//                   <a href={`https://${userData.website}`} className="text-green-600 hover:underline">
//                     {userData.website}
//                   </a>
//                 ) : (
//                   'Add website'
//                 )}
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <GraduationCap className="w-5 h-5 text-green-600" />
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={tempData.education}
//                 onChange={(e) => handleInputChange('education', e.target.value)}
//                 className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                 placeholder="Education"
//               />
//             ) : (
//               <span className="text-gray-700">
//                 {userData.education || 'Add your education'}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Interests */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests</h3>
//         <div className="flex flex-wrap gap-2">
//           {userData.interests.map((interest, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//             >
//               {interest}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileTab;



import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  Calendar, 
  Heart, 
  Thermometer, 
  Activity, 
  Droplets, 
  Stethoscope, 
  AlertCircle,
  Download,
  FileText
} from 'lucide-react';

const ProfileTab = () => {
  const { address, isConnected } = useAccount();
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch health data when component mounts or wallet connects
  useEffect(() => {
    const fetchHealthData = async () => {
      if (!isConnected || !address) return;
      
      setLoading(true);
      try {
        // Using the address from useAccount instead of hardcoded one
        const response = await fetch(`http://localhost:8000/web/api/health-records/fetch-Data/${address}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setHealthData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching health data:', err);
        setError('Failed to load health records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [isConnected, address]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Health metrics cards
  const MetricCard = ({ icon, title, value, unit, normalRange }) => (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800">{value || '--'}</p>
          <p className="text-sm text-gray-500 mt-1">{unit}</p>
        </div>
        {normalRange && (
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
            Normal: {normalRange}
          </span>
        )}
      </div>
    </div>
  );

  if (!isConnected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-3">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Wallet Not Connected</h2>
          <p className="text-gray-600">
            Please connect your wallet to view your health records.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 bg-blue-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your health records...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-3">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!healthData || healthData.records.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-3">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Health Records Found</h2>
          <p className="text-gray-600">
            You don't have any health records associated with your wallet address yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>
          <p className="text-gray-600 mt-2">
            Your medical history and health metrics in one secure place
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Export Records
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Records</h3>
          <p className="text-3xl font-bold">{healthData.records.length}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-2">Last Update</h3>
          <p className="text-xl font-bold">
            {healthData.records.length > 0 
              ? formatDate(healthData.records[healthData.records.length - 1].date) 
              : 'N/A'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-2">Conditions</h3>
          <p className="text-3xl font-bold">
            {new Set(healthData.records.flatMap(r => r.conditions || [])).size}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-2">Medications</h3>
          <p className="text-3xl font-bold">
            {new Set(healthData.records.flatMap(r => r.medications || [])).size}
          </p>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Health Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <MetricCard 
          icon={<Heart className="h-5 w-5" />} 
          title="Heart Rate" 
          value={healthData.latestMetrics?.heartRate} 
          unit="bpm" 
          normalRange="60-100 bpm" 
        />
        
        <MetricCard 
          icon={<Thermometer className="h-5 w-5" />} 
          title="Body Temperature" 
          value={healthData.latestMetrics?.temperature} 
          unit="°F" 
          normalRange="97.8-99.1°F" 
        />
        
        <MetricCard 
          icon={<Activity className="h-5 w-5" />} 
          title="Blood Pressure" 
          value={healthData.latestMetrics?.bloodPressure} 
          unit="mmHg" 
          normalRange="120/80 mmHg" 
        />
        
        <MetricCard 
          icon={<Droplets className="h-5 w-5" />} 
          title="Oxygen Saturation" 
          value={healthData.latestMetrics?.oxygenSaturation} 
          unit="%" 
          normalRange="95-100%" 
        />
        
        <MetricCard 
          icon={<Stethoscope className="h-5 w-5" />} 
          title="Respiratory Rate" 
          value={healthData.latestMetrics?.respiratoryRate} 
          unit="breaths/min" 
          normalRange="12-20 breaths/min" 
        />
      </div>

      {/* Records Table */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Medical History</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {healthData.records.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {formatDate(record.date)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{record.provider || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {record.visitType || 'General Checkup'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {record.conditions && record.conditions.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {record.conditions.map((condition, i) => (
                            <li key={i}>{condition}</li>
                          ))}
                        </ul>
                      ) : (
                        'No diagnosis recorded'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {record.medications && record.medications.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {record.medications.map((medication, i) => (
                            <li key={i}>{medication}</li>
                          ))}
                        </ul>
                      ) : (
                        'No medications prescribed'
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Disclaimer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This health data is retrieved from your medical records stored on the blockchain. 
          Only you and authorized healthcare providers can access this information.
        </p>
      </div>
    </div>
  );
};

export default ProfileTab;