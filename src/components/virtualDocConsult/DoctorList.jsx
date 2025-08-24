import React from 'react';
import { Star, Award, Users, MapPin, Clock, Video } from 'lucide-react';

const DoctorList = ({ doctors, onBookLater, onCallNow }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with Doctors Instantly
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Get professional medical consultations through secure video calls from the comfort of your home
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Video className="w-5 h-5" />
              <span>HD Video Quality</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Award className="w-5 h-5" />
              <span>Certified Doctors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Doctors Available</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
          <div className="text-gray-600">Consultations</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-gray-600">Support</div>
        </div>
      </div>

      {/* Available Doctors */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>
        <div className="grid gap-6">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{doctor.experience} years exp.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{doctor.consultations} consultations</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${doctor.price}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => onBookLater(doctor)}
                        className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                      >
                        Book Later
                      </button>
                      {doctor.available && (
                        <button
                          onClick={() => onCallNow(doctor)}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
                        >
                          Call Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;