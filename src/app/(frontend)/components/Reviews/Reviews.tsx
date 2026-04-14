'use client'

import React, { useState, useEffect } from 'react' // Import useState and useEffect
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay, Keyboard, A11y } from 'swiper/modules'
import Image from 'next/image' // Import Image component

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './Reviews.scss'

// Define the type for a review item (optional but good practice)
interface Review {
  id: string
  reviewerName: string
  reviewAvatar?: {
    id: string
    url: string
  }
  reviewText: string
  date: string
  rating: number
  reviewerPicture?: {
    // Payload upload type often includes id and url
    id: string
    url: string
  }
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>,
    )
  }
  return (
    <div className="star-rating" role="img" aria-label={`דירוג ${rating} מתוך 5 כוכבים`}>
      {stars}
    </div>
  )
}

const formatReviewDate = (date: string) =>
  new Date(date).toLocaleDateString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Assuming Payload API is accessible at /api/reviews
        const response = await fetch('/api/reviews')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Payload returns data in a 'docs' array
        setReviews(data.docs)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <section className="reviews-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>טוען חוות דעת...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="reviews-section" role="alert" lang="he" dir="rtl">
        <p style={{ color: 'red' }}>שגיאה: {error}</p>
      </section>
    )
  }

  if (reviews.length === 0) {
    return (
      <section className="reviews-section" role="status" aria-live="polite" lang="he" dir="rtl">
        <p>לא נמצאו חוות דעת.</p>
      </section>
    )
  }

  return (
    <section
      id="reviews-section"
      role="region"
      aria-labelledby="reviews-heading"
      lang="he"
      dir="rtl"
    >
      <h2 id="reviews-heading" className="reviews-title">
        המלצות
      </h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay, Keyboard, A11y]}
        spaceBetween={50}
        slidesPerView={1} /* Default for smallest screens */
        navigation
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'חוות הדעת הקודמת',
          nextSlideMessage: 'חוות הדעת הבאה',
          firstSlideMessage: 'זוהי חוות הדעת הראשונה',
          lastSlideMessage: 'זוהי חוות הדעת האחרונה',
          containerMessage: 'קרוסלת חוות דעת מלקוחות',
          containerRoleDescriptionMessage: 'קרוסלה',
          itemRoleDescriptionMessage: 'שקופית',
        }}
        // pagination={{ clickable: true }}
        // autoplay={{ // Autoplay commented out by user
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        loop={false} // Loop commented out by user
        centeredSlides={true} /* Center slides when there are fewer than slidesPerView */
        centeredSlidesBounds={true} /* Ensure active slide is always centered */
        className="mySwiper"
        aria-label="קרוסלת חוות דעת מלקוחות"
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
            slidesPerView: 'auto' /* Changed to auto to allow CSS to control slide width */,
            spaceBetween: 40,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} aria-label={`חוות דעת של ${review.reviewerName}`}>
            <div
              className={`review-card ${review.reviewerPicture?.url ? 'review-card--photo' : 'review-card--text'}`}
              tabIndex={0}
              role="group"
              aria-label={`חוות דעת של ${review.reviewerName}, דירוג ${review.rating} מתוך 5, מתאריך ${formatReviewDate(review.date)}`}
            >
              {review.reviewerPicture && review.reviewerPicture.url ? (
                <>
                  <Image
                    src={review.reviewerPicture.url}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="reviewer-picture-full"
                  />
                  <span className="sr-only">חוות דעת של {review.reviewerName}</span>
                </>
              ) : (
                <div className="review-card-content">
                  <div className="review-card-accent" aria-hidden="true" />
                  <p className="review-quote-mark" aria-hidden="true">
                    &rdquo;
                  </p>
                  <StarRating rating={review.rating} />
                  <p className="review-text">&quot;{review.reviewText}&quot;</p>
                  <div className="review-footer">
                    {review.reviewAvatar && review.reviewAvatar.url && (
                      <Image
                        src={review.reviewAvatar.url}
                        alt=""
                        aria-hidden="true"
                        width={72}
                        height={72}
                        className="reviewer-avatar"
                      />
                    )}
                    <div className="review-footer-meta">
                      <p className="client-name">{review.reviewerName}</p>
                      <p className="review-date">{formatReviewDate(review.date)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Reviews
