'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../assets/images/vadim-logo.png' // Adjust the path as needed
import './Navbar.scss'

const Navbar: React.FC = () => {
  const HIDE_THRESHOLD = 20
  const [menuOpen, setMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const navRef = useRef<HTMLElement | null>(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).blur()
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false) // Close mobile menu after clicking a link

      // Re-check nav visibility after smooth scrolling has progressed.
      setTimeout(() => {
        setVisible(window.scrollY < HIDE_THRESHOLD)
      }, 450)

      // After smooth scroll, move focus into the section for keyboard users
      // Use a small timeout to allow the smooth scroll to start/complete
      setTimeout(() => {
        try {
          // Prefer a heading inside the section (h1/h2/...)
          const heading = section.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null
          if (heading) {
            heading.setAttribute('tabindex', '-1')
            heading.focus({ preventScroll: true })
          } else {
            // Fallback: focus the section itself
            section.setAttribute('tabindex', '-1')
            ;(section as HTMLElement).focus({ preventScroll: true })
          }
        } catch (ignoreError) {
          // ignore
        }
      }, 400)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (menuOpen) {
        // If menu is open, don't hide navbar on scroll
        return
      }

      setVisible(currentScrollPos < HIDE_THRESHOLD) /* Show only very close to top of page */
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, menuOpen])

  // Make navbar visible when any element inside it receives focus (keyboard navigation)
  useEffect(() => {
    const navEl = navRef.current
    if (!navEl) return

    const onFocusIn = () => {
      setVisible(true)
    }

    const onFocusOut = (e: FocusEvent) => {
      // When focus moves outside the nav, respect scroll position to hide again
      const related = e.relatedTarget as Node | null
      if (!navEl.contains(related)) {
        // hide only if scrolled beyond threshold
        if (window.scrollY > HIDE_THRESHOLD) setVisible(false)
      }
    }

    navEl.addEventListener('focusin', onFocusIn)
    navEl.addEventListener('focusout', onFocusOut)

    return () => {
      navEl.removeEventListener('focusin', onFocusIn)
      navEl.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="ניווט ראשי"
      className={`nav ${!visible ? 'hidden' : ''}`}
    >
      <div className="container">
        <div id="mainListDiv" className={`main_list ${menuOpen ? 'show_list' : ''}`}>
          <ul className="navlinks">
            <li>
              <a
                href="#about-section"
                onClick={(e) => handleScrollToSection(e, 'about-section')}
                onKeyDown={(e) => handleKeyDown(e, 'about-section')}
              >
                אודות
              </a>
            </li>
            <li>
              <a
                href="#services-section"
                onClick={(e) => handleScrollToSection(e, 'services-section')}
                onKeyDown={(e) => handleKeyDown(e, 'services-section')}
              >
                שירותים
              </a>
            </li>
            <li>
              <a
                href="#work-with-section"
                onClick={(e) => handleScrollToSection(e, 'work-with-section')}
                onKeyDown={(e) => handleKeyDown(e, 'work-with-section')}
              >
                אומנים
              </a>
            </li>
            <li>
              <a
                href="#reviews-section"
                onClick={(e) => handleScrollToSection(e, 'reviews-section')}
                onKeyDown={(e) => handleKeyDown(e, 'reviews-section')}
              >
                המלצות
              </a>
            </li>
            <li>
              <a
                href="#gallery-section"
                onClick={(e) => handleScrollToSection(e, 'gallery-section')}
                onKeyDown={(e) => handleKeyDown(e, 'gallery-section')}
              >
                גלריה
              </a>
            </li>
            <li>
              <a
                href="#instagram-feed-section"
                onClick={(e) => handleScrollToSection(e, 'instagram-feed-section')}
                onKeyDown={(e) => handleKeyDown(e, 'instagram-feed-section')}
              >
                סרטונים
              </a>
            </li>
            <li>
              <a
                href="#contact-section"
                onClick={(e) => handleScrollToSection(e, 'contact-section')}
                onKeyDown={(e) => handleKeyDown(e, 'contact-section')}
              >
                צור קשר
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="navTrigger"
          aria-label={menuOpen ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט'}
          aria-expanded={menuOpen}
          aria-controls="mainListDiv"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggleMenu()
            }
          }}
        >
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
        </button>
        <div className="logo">
          <Link
            href="/"
            aria-label="דף הבית - ואדים פופלבסקי"
            title="דף הבית"
            className="logo-link"
          >
            <Image src={logo} alt="" />
            <span className="sr-only">דף הבית</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
