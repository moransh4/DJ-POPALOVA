'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';

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
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    const fetchWorkWith = async () => {
      try {
        const response = await fetch('/api/work-with'); // Assuming API endpoint for WorkWith
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorkWithItems(data.docs);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch "Work With" items');
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
    return (
      <section className="work-with-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>טוען אומנים...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="work-with-section" role="alert" lang="he" dir="rtl">
        <p style={{ color: 'red' }}>שגיאה: {error}</p>
      </section>
    );
  }

  if (workWithItems.length === 0) {
    return (
      <section className="work-with-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>לא נמצאו אומנים.</p>
      </section>
    );
  }

  return (
    <section id="work-with-section" role="region" aria-labelledby="work-with-heading" lang="he" dir="rtl">
      <h2 id="work-with-heading" className="work-with-title">אומנים שעבדתי איתם</h2>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Get Swiper instance
        modules={[Navigation, Keyboard, A11y]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'האומן הקודם',
          nextSlideMessage: 'האומן הבא',
          firstSlideMessage: 'זוהי השקופית הראשונה',
          lastSlideMessage: 'זוהי השקופית האחרונה',
          containerMessage: 'קרוסלת אומנים שעבדתי איתם',
          containerRoleDescriptionMessage: 'קרוסלה',
          itemRoleDescriptionMessage: 'שקופית',
        }}
        loop={false}
        observer={true}
        observeParents={true}
        centeredSlides={true}
        centeredSlidesBounds={true}
        freeMode={true}
        className="mySwiper"
        aria-label="קרוסלת אומנים שעבדתי איתם"
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
          <SwiperSlide key={item.id} aria-label={item.name}>
            <article className="work-with-card" tabIndex={0} aria-label={`אומן: ${item.name}`}>
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
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WorkWith;
