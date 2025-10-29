"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import logo from '../../../../assets/images/vadim-logo.png'; // Adjust the path as needed
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);

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

  // Make navbar visible when any element inside it receives focus (keyboard navigation)
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const onFocusIn = () => {
      setVisible(true);
    };

    const onFocusOut = (e: FocusEvent) => {
      // When focus moves outside the nav, respect scroll position to hide again
      const related = e.relatedTarget as Node | null;
      if (!navEl.contains(related)) {
        // hide only if scrolled beyond threshold
        if (window.scrollY > 100) setVisible(false);
      }
    };

    navEl.addEventListener('focusin', onFocusIn);
    navEl.addEventListener('focusout', onFocusOut);

    return () => {
      navEl.removeEventListener('focusin', onFocusIn);
      navEl.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <nav ref={navRef} role="navigation" aria-label="Main navigation" className={`nav ${!visible ? 'hidden' : ''}`}> {/* Apply hidden class conditionally */}
      <div className="container">
        <div className="logo">
          <a href="/" aria-label="Home - Vadim Poplavsky" title="Home" className="logo-link">
            <Image src={logo} alt="" />
            <span className="sr-only">Home</span>
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
        <button
          type="button"
          className="navTrigger"
          aria-expanded={menuOpen}
          aria-controls="mainListDiv"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
        >
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;