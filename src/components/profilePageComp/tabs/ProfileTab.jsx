import React from 'react';
import { Mail, Phone, MapPin, Calendar, Globe, GraduationCap } from 'lucide-react';

const ProfileTab = ({ userData, tempData, isEditing, handleInputChange, formatDate }) => {
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
            <Calendar className="w-5 w-5 text-green-600" />
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
};

export default ProfileTab;