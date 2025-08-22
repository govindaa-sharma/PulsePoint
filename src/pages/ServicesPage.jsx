// pages/ServicesPage.jsx
import React from 'react';

const ServicesPage = () => {
  const services = [
    {
      title: "General Consultation",
      description: "Comprehensive health assessments and personalized treatment plans.",
      icon: "🩺"
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency services for critical health situations.",
      icon: "🚑"
    },
    {
      title: "Specialist Referrals",
      description: "Access to a network of specialized medical professionals.",
      icon: "👨‍⚕️"
    },
    {
      title: "Diagnostic Services",
      description: "Advanced imaging, laboratory tests, and health screenings.",
      icon: "🔍"
    },
    {
      title: "Preventive Care",
      description: "Vaccinations, health education, and wellness programs.",
      icon: "💉"
    },
    {
      title: "Telemedicine",
      description: "Virtual consultations with healthcare providers from home.",
      icon: "📱"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          We offer a comprehensive range of healthcare services to meet all your medical needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Schedule an Appointment</h2>
          <p className="text-gray-700 text-center mb-6">
            Ready to take charge of your health? Book an appointment with one of our healthcare professionals today.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;