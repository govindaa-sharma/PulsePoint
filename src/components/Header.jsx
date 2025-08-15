import React from 'react';
import './Header.css';
import Button from './Button.jsx';

// --- Heartbeat Icon (Moved into this file) ---
const HeartbeatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="var(--primary-color)" stroke="var(--primary-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo">
                    <HeartbeatIcon />
                    <h1>HealthCare</h1>
                </div>
                <nav className="nav-menu">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#doctors">Doctors</a>
                    <a href="#contact">Contact</a>
                </nav>
                <Button type="primary">Login / Sign Up</Button>
            </div>
        </header>
    );
};

export default Header;
