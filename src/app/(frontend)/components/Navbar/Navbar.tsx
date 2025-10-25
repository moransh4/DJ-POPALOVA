"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../../assets/images/vadim-logo.png'; // Adjust the path as needed
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (menuOpen) {
        // If menu is open, don't hide navbar on scroll
        return;
      }

      setVisible(currentScrollPos < 100); /* Only show if at the top of the page */
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, menuOpen]);

  return (
    <nav className={`nav ${!visible ? 'hidden' : ''}`}> {/* Apply hidden class conditionally */}
      <div className="container">
        <div className="logo">
          <a href="#"><Image src={logo} alt="My Logo"/>
          </a>
        </div>
        <div id="mainListDiv" className={`main_list ${menuOpen ? 'show_list' : ''}`}>
          <ul className="navlinks">
            <li><a href="#about-section" onClick={(e) => handleScrollToSection(e, 'about-section')}>About</a></li>
            <li><a href="#services-section" onClick={(e) => handleScrollToSection(e, 'services-section')}>Services</a></li>
            <li><a href="#work-with-section" onClick={(e) => handleScrollToSection(e, 'work-with-section')}>work with</a></li>
            <li><a href="#reviews-section" onClick={(e) => handleScrollToSection(e, 'reviews-section')}>Recommendations</a></li>
            {/* <li><a href="#portfolio" onClick={(e) => handleScrollToSection(e, 'portfolio')}>Portfolio</a></li> */}
            <li><a href="#gallery-section" onClick={(e) => handleScrollToSection(e, 'gallery-section')}>Gallery</a></li>
            <li><a href="#instagram-feed-section" onClick={(e) => handleScrollToSection(e, 'instagram-feed-section')}>Videos</a></li>
            <li><a href="#contact-section" onClick={(e) => handleScrollToSection(e, 'contact-section')}>Contact</a></li>
          </ul>
        </div>
        <span className="navTrigger" onClick={toggleMenu}>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;