'use client';

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image'; // Import Image component

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Reviews.scss';

// Define the type for a review item (optional but good practice)
interface Review {
  id: string;
  reviewerName: string;
  reviewAvatar?: {
    id: string;
    url: string;
  };
  reviewText: string;
  date: string;
  rating: number;
  reviewerPicture?: { // Payload upload type often includes id and url
    id: string;
    url: string;
  };
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Assuming Payload API is accessible at /api/reviews
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Payload returns data in a 'docs' array
        setReviews(data.docs);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <section className="reviews-section"><p>Loading reviews...</p></section>;
  }

  if (error) {
    return <section className="reviews-section"><p style={{ color: 'red' }}>Error: {error}</p></section>;
  }

  if (reviews.length === 0) {
    return <section className="reviews-section"><p>No reviews found.</p></section>;
  }

  return (
    <section id="reviews-section">
      <h2 className="reviews-title">חוות דעת מלקוחות</h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1} /* Default for smallest screens */
        navigation
        // pagination={{ clickable: true }}
        // autoplay={{ // Autoplay commented out by user
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        loop={false} // Loop commented out by user
        centeredSlides={true} /* Center slides when there are fewer than slidesPerView */
        centeredSlidesBounds={true} /* Ensure active slide is always centered */
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 'auto', /* Changed to auto to allow CSS to control slide width */
            spaceBetween: 40,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="review-card">
              {review.reviewerPicture && review.reviewerPicture.url ? (
                <Image
                  src={review.reviewerPicture.url}
                  alt={review.reviewerName}
                  fill
                  className="reviewer-picture-full"
                />
              ) : (
                <>
                  {review.reviewAvatar && review.reviewAvatar.url && (
                    <Image
                      src={review.reviewAvatar.url}
                      alt={review.reviewerName}
                      width={80}
                      height={80}
                      className="reviewer-avatar"
                    />
                  )}
                  <StarRating rating={review.rating} />
                  <p className="review-text">"{review.reviewText}"</p>
                  <p className="client-name">{review.reviewerName}</p>
                  <p className="review-date">{new Date(review.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
