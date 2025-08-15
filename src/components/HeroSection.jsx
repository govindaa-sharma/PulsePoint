import React from 'react';
import './HeroSection.css';
import Button from './Button.jsx';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">Your Health And Safety Is Our Priority</h1>
                    <p className="hero-subtitle">
                        We provide the best healthcare solutions with a team of expert doctors and state-of-the-art technology. Your well-being is our commitment.
                    </p>
                    <Button type="primary">Get Started</Button>
                </div>
                <div className="hero-image-container">
                    <div className="hero-image-placeholder"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
