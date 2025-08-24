// import React from 'react';
// import './FeaturesSection.css';

// const FeaturesSection = () => {
//     const features = [
//       { icon: '📢', name: 'Create Health Campaign' },
//       { icon: '⛑️', name: 'Emergency Lessons' },
//       { icon: '🔑', name: 'Login / Signup' },
//       { icon: '👨‍⚕️', name: 'Virtually Connect Doctors' },
//       { icon: '💬', name: 'Feedback' },
//       { icon: '📈', name: 'Users Data Marketplace' },
//       { icon: '🤖', name: 'Chatbot' },
//       { icon: '🩺', name: "Parkinson's Regular Test" },
//       { icon: '📄', name: 'Diagnosis' },
//     ];

//     return (
//         <section className="features-section">
//             <div className="container">
//                 <h2 className="section-title">Our Core Features</h2>
//                 <div className="features-grid">
//                     {features.map((feature, index) => (
//                         <div key={index} className="feature-card">
//                             <div className="feature-icon">{feature.icon}</div>
//                             <h3 className="feature-name">{feature.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeaturesSection;



import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();
  
  const features = [
    { 
      icon: '📢', 
      name: 'Create Health Campaign',
      path: '/health-campaign',
      description: 'Design and launch health awareness campaigns'
    },
    { 
      icon: '⛑️', 
      name: 'Emergency Lessons',
      path: '/emergency-lessons',
      description: 'Learn critical emergency response procedures'
    },
    { 
      icon: '👨‍⚕️', 
      name: 'Virtually Connect Doctors',
      path: '/virtual-consultation',
      description: 'Consult with healthcare professionals online'
    },
    { 
      icon: '💬', 
      name: 'Feedback',
      path: '/feedback',
      description: 'Share your experience and suggestions'
    },
    { 
      icon: '📈', 
      name: 'Users Data Marketplace',
      path: '/data-marketplace',
      description: 'Access anonymized health data insights'
    },
    { 
      icon: '🤖', 
      name: 'Chatbot',
      path: '/chatbot',
      description: 'Get instant answers to health questions'
    },
    { 
      icon: '🩺', 
      name: "Parkinson's Regular Test",
      path: '/parkinsons-test',
      description: 'Monitor symptoms with regular assessments'
    },
    { 
      icon: '📄', 
      name: 'Diagnosis',
      path: '/mri-tumor-analyzer',
      description: 'Receive AI-assisted health assessments'
    },
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <div className="p-6">
                <div className="text-5xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {feature.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
              <div className="px-6 py-4 bg-blue-50 text-blue-600 font-medium text-center">
                Click to explore
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;