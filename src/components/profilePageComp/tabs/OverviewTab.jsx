import React from 'react';
import { User, Phone, Mail, MapPin, AlertTriangle } from 'lucide-react';

const OverviewTab = ({ userData }) => {
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
};

export default OverviewTab;