import React from 'react';
import { User, Calendar, Edit3, Save, X, LogOut } from 'lucide-react';

const PatientHeader = ({ patientData, isEditing, onEdit, onSave, onCancel, onLogout }) => {
  const stats = [
    { label: 'Visits', value: '24', icon: 'Briefcase' },
    { label: 'Medications', value: '6', icon: 'Pill' },
    { label: 'Assessments', value: '12', icon: 'Heart' },
    { label: 'Rating', value: '4.9', icon: 'Star' }
  ];

  return (
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

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              {/* Icon would be rendered based on stat.icon */}
            </div>
            <div className="font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        {!isEditing ? (
          <>
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={onCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;