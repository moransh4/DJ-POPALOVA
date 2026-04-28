'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import './Gallery.scss'

// Define the type for a gallery image item
interface GalleryImage {
  id: string
  alt: string
  url: string
}

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null

  const closeLightbox = () => setSelectedIndex(null)

  const showNext = () => {
    if (!galleryImages.length || selectedIndex === null) {
      return
    }
    setSelectedIndex((selectedIndex + 1) % galleryImages.length)
  }

  const showPrev = () => {
    if (!galleryImages.length || selectedIndex === null) {
      return
    }
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        // Assuming Payload API is accessible at /api/gallery
        const response = await fetch('/api/gallery')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Payload returns data in a 'docs' array
        setGalleryImages(data.docs)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery images')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  useEffect(() => {
    if (selectedIndex === null) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowRight') {
        showNext()
      } else if (event.key === 'ArrowLeft') {
        showPrev()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [selectedIndex, galleryImages.length])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    touchEndX.current = null
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return
    }

    const diff = touchStartX.current - touchEndX.current
    const threshold = 40

    if (Math.abs(diff) < threshold) {
      return
    }

    if (diff > 0) {
      showNext()
    } else {
      showPrev()
    }
  }

  if (loading) {
    return (
      <section className="gallery-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>טוען גלריה...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="gallery-section" role="alert" lang="he" dir="rtl">
        <p style={{ color: 'red' }}>שגיאה: {error}</p>
      </section>
    )
  }

  if (galleryImages.length === 0) {
    return (
      <section className="gallery-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>לא נמצאו תמונות בגלריה.</p>
      </section>
    )
  }

  return (
    <section
      id="gallery-section"
      role="region"
      aria-labelledby="gallery-heading"
      lang="he"
      dir="rtl"
    >
      <h2 id="gallery-heading" className="gallery-title">
        הגלריה שלי
      </h2>

      <div className="gallery-mobile-swiper" aria-label="גלריית מובייל בתלת מימד">
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={12}
          coverflowEffect={{
            rotate: 28,
            stretch: 0,
            depth: 130,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          dir="rtl"
          className="gallery-swiper-instance"
        >
          {galleryImages.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="gallery-mobile-slide-card" aria-hidden="true">
                <Image
                  src={item.url}
                  alt={item.alt?.trim() || `תמונה מהגלריה ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="gallery-mobile-slide-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ul className="gallery-grid" aria-label="גלריית תמונות">
        {galleryImages.map((item, index) => (
          <li key={item.id} className="gallery-item">
            <button
              type="button"
              className="gallery-open-button"
              aria-label={`פתח תמונה ${index + 1} בגודל מלא`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={item.url}
                alt={item.alt?.trim() || `תמונה מהגלריה ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                className="gallery-image"
              />
            </button>
          </li>
        ))}
      </ul>

      {selectedImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="תצוגת תמונה מוגדלת"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav-prev"
            aria-label="תמונה קודמת"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav-next"
            aria-label="תמונה הבאה"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="סגור תצוגת תמונה"
            onClick={closeLightbox}
          >
            ×
          </button>
          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt?.trim() || 'תמונה מהגלריה'}
              fill
              sizes="100vw"
              className="gallery-lightbox-image"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
