'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Removed Swiper imports
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Removed Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './Gallery.scss';

// Define the type for a gallery image item
interface GalleryImage {
  id: string;
  alt: string;
  url: string;
}

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        // Assuming Payload API is accessible at /api/gallery
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Payload returns data in a 'docs' array
        setGalleryImages(data.docs);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (loading) {
    return <section className="gallery-section"><p>Loading gallery...</p></section>;
  }

  if (error) {
    return <section className="gallery-section"><p style={{ color: 'red' }}>Error: {error}</p></section>;
  }

  if (galleryImages.length === 0) {
    return <section className="gallery-section"><p>No gallery images found.</p></section>;
  }

  return (
    <section id="gallery-section">
      {/* <h2 className="gallery-title">הגלריה שלי</h2> Removed the title */}
      <div className="gallery-grid">
        {galleryImages.map((item) => (
          <div key={item.id} className="gallery-item">
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
