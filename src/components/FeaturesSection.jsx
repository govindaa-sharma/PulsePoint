import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    const features = [
      { icon: '📢', name: 'Create Health Campaign' },
      { icon: '⛑️', name: 'Emergency Lessons' },
      { icon: '🔑', name: 'Login / Signup' },
      { icon: '👨‍⚕️', name: 'Consult with Doctors' },
      { icon: '💬', name: 'Feedback' },
      { icon: '📈', name: 'Users Data Marketplace' },
      { icon: '🤖', name: 'Chatbot' },
      { icon: '🩺', name: "Parkinson's Regular Test" },
      { icon: '📄', name: 'Diagnosis' },
    ];

    return (
        <section className="features-section">
            <div className="container">
                <h2 className="section-title">Our Core Features</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-name">{feature.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
