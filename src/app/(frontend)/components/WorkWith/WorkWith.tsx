'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './WorkWith.scss';

interface WorkWithItem {
  id: string;
  name: string;
  image: {
    id: string;
    url: string;
  };
}

const WorkWith = () => {
  const [workWithItems, setWorkWithItems] = useState<WorkWithItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<any>(null); // Use useRef to get Swiper instance

  useEffect(() => {
    const fetchWorkWith = async () => {
      try {
        const response = await fetch('/api/work-with'); // Assuming API endpoint for WorkWith
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorkWithItems(data.docs);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch "Work With" items');
      } finally {
        setLoading(false);
        // Update Swiper after data is loaded and component has rendered
        if (swiperRef.current) {
          swiperRef.current.update();
        }
      }
    };

    fetchWorkWith();
  }, []);

  if (loading) {
    return <section className="work-with-section"><p>Loading famous people...</p></section>;
  }

  if (error) {
    return <section className="work-with-section"><p style={{ color: 'red' }}>Error: {error}</p></section>;
  }

  if (workWithItems.length === 0) {
    return <section className="work-with-section"><p>No famous people found.</p></section>;
  }

  return (
    <section id="work-with-section">
      <h2 className="work-with-title">אומנים שעבדתי איתם</h2>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Get Swiper instance
        modules={[Navigation]} // Add Navigation module back
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation // Add navigation prop back
        loop={false} // Set loop to false
        observer={true} // Observe changes on Swiper itself
        observeParents={true} // Observe changes on parent elements
        centeredSlides={true}
        centeredSlidesBounds={true}
        freeMode={true} // Add freeMode for smoother, non-snapping scrolling
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 'auto', // Allow CSS to control slide width
            spaceBetween: 40,
          },
        }}
      >
        {workWithItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="work-with-card">
              <h3>{item.name}</h3>
              {item.image && item.image.url && (
                <Image
                  src={item.image.url}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="work-with-image"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WorkWith;
