// pages/DoctorsPage.jsx
import React from 'react';

const DoctorsPage = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "12 years",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "15 years",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      experience: "10 years",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "18 years",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Lisa Patel",
      specialty: "Dermatology",
      experience: "9 years",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Robert Kim",
      specialty: "Oncology",
      experience: "14 years",
      image: "👨‍⚕️"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Medical Team</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Meet our team of dedicated healthcare professionals committed to your well-being.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="text-6xl text-center mb-4">{doctor.image}</div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{doctor.name}</h3>
                <p className="text-blue-600 text-center font-medium mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-center">Experience: {doctor.experience}</p>
              </div>
              <div className="bg-blue-50 p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Join Our Team</h2>
          <p className="text-gray-700 text-center mb-6">
            Are you a healthcare professional looking to make a difference? We're always looking for talented individuals to join our team.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Career Opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;