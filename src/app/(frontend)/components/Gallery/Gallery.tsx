'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// Removed Swiper imports
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Removed Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

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
      <ul className="gallery-grid" aria-label="גלריית תמונות">
        {galleryImages.map((item, index) => (
          <li key={item.id} className="gallery-item">
            <Image
              src={item.url}
              alt={item.alt?.trim() || `תמונה מהגלריה ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
              className="gallery-image"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Gallery
