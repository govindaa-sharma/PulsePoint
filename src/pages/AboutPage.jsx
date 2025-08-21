import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About HealthCare</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            At HealthCare, our mission is to provide accessible, high-quality healthcare to everyone. 
            We believe that quality medical care should be available to all, regardless of their circumstances.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2010, HealthCare has grown from a small clinic to a comprehensive healthcare provider 
            serving thousands of patients annually. Our journey has been guided by our commitment to 
            excellence in patient care and medical innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Compassionate care for all patients</li>
              <li>Excellence in medical practice</li>
              <li>Innovation in treatment approaches</li>
              <li>Integrity in all our actions</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Achievements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Accredited by the Medical Quality Commission</li>
              <li>Recipient of the Healthcare Excellence Award 2022</li>
              <li>Recognized for community health initiatives</li>
              <li>98% patient satisfaction rate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;