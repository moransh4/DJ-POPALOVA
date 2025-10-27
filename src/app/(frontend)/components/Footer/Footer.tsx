'use client';

import React, { useState, useEffect } from 'react';
import './Footer.scss';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const reviewsSection = document.getElementById('about-section');
      if (reviewsSection) {
        const sectionTop = reviewsSection.getBoundingClientRect().top;
        const scrolledPast = sectionTop <= 0;
        setShowButton(scrolledPast);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 
  return (
    <div className="footer">
    {showButton && (
      <button onClick={scrollToTop} className="button-up"></button>
    )}
    <p>Developed by Moran Sharabi</p>
  </div>
  );
};

export default Footer;
