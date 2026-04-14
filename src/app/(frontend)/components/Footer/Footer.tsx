'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './Footer.scss'

const Footer = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const reviewsSection = document.getElementById('about-section')
      if (reviewsSection) {
        const sectionTop = reviewsSection.getBoundingClientRect().top
        const scrolledPast = sectionTop <= 0
        setShowButton(scrolledPast)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo" lang="he" dir="rtl">
      {showButton && (
        <button
          onClick={scrollToTop}
          className="button-up"
          aria-label="חזרה לראש העמוד"
          title="חזרה לראש העמוד"
        />
      )}
      <Link href="/accessibility" className="accessibility-link">
        הצהרת נגישות
      </Link>
      <p lang="en" dir="ltr">
        Developed by Moran Sharabi
      </p>
    </footer>
  )
}

export default Footer
