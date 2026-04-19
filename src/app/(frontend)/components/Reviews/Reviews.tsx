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
  const initialFormState = {
    reviewerName: '',
    reviewText: '',
    rating: 5,
    reviewAvatarFile: null as File | null,
    reviewerPictureFile: null as File | null,
  }

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formState, setFormState] = useState(initialFormState)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  )
  const [submitError, setSubmitError] = useState<string | null>(null)

  const fetchReviews = async () => {
    try {
      setError(null)
      // Always fetch only approved reviews for the public website view
      const response = await fetch('/api/reviews?where[approved][equals]=true&sort=-date')
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

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isModalOpen])

  const uploadMediaFile = async (file: File) => {
    const mediaFormData = new FormData()
    mediaFormData.append('file', file)
    mediaFormData.append('alt', '')
    mediaFormData.append('_payload', JSON.stringify({ alt: '' }))

    const response = await fetch('/api/media', {
      method: 'POST',
      body: mediaFormData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.errors?.[0]?.message || errorData?.message || 'העלאת קובץ נכשלה'
      throw new Error(message)
    }

    const data = await response.json()
    return data.doc?.id || data.id
  }

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitError(null)

    try {
      let reviewAvatarId: string | undefined
      let reviewerPictureId: string | undefined

      if (formState.reviewAvatarFile) {
        reviewAvatarId = await uploadMediaFile(formState.reviewAvatarFile)
      }

      if (formState.reviewerPictureFile) {
        reviewerPictureId = await uploadMediaFile(formState.reviewerPictureFile)
      }

      const reviewPayload: Record<string, unknown> = {
        reviewerName: formState.reviewerName,
        reviewText: formState.reviewText,
        rating: formState.rating,
        date: new Date().toISOString(),
        approved: false,
      }

      if (reviewAvatarId) reviewPayload.reviewAvatar = reviewAvatarId
      if (reviewerPictureId) reviewPayload.reviewerPicture = reviewerPictureId

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewPayload),
      })

      if (!response.ok) {
        throw new Error('שמירת חוות הדעת נכשלה')
      }

      await fetchReviews()
      setSubmitState('success')
      setFormState(initialFormState)
    } catch (submitErr: unknown) {
      setSubmitState('error')
      setSubmitError(submitErr instanceof Error ? submitErr.message : 'שגיאה בשליחת חוות הדעת')
    }
  }

  const openModal = () => {
    setSubmitState('idle')
    setSubmitError(null)
    setHoverRating(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
      {loading && (
        <div className="reviews-feedback" role="status" aria-live="polite">
          <p>טוען חוות דעת...</p>
        </div>
      )}

      {!loading && error && (
        <div className="reviews-feedback" role="alert">
          <p style={{ color: 'red' }}>שגיאה: {error}</p>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="reviews-feedback" role="status" aria-live="polite">
          <p>לא נמצאו חוות דעת.</p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
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
          centerInsufficientSlides={true}
          centeredSlides={true} /* Center slides when there are fewer than slidesPerView */
          centeredSlidesBounds={true} /* Ensure active slide is always centered */
          watchOverflow={true}
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
                      alt={review.reviewText || 'צילום מסך חוות דעת'}
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
                          alt={`תמונת פרופיל של ${review.reviewerName}`}
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
      )}

      <div className="reviews-actions">
        <button
          type="button"
          className="open-review-modal-button"
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          aria-controls="review-submission-dialog"
        >
          כתיבת חוות דעת
        </button>
      </div>

      {isModalOpen && (
        <div
          className="review-modal-overlay"
          onClick={(e) => e.currentTarget === e.target && closeModal()}
        >
          <div
            id="review-submission-dialog"
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <button
              type="button"
              className="review-modal-close"
              aria-label="סגירת חלון חוות דעת"
              onClick={closeModal}
            >
              ×
            </button>

            <h3 id="review-modal-title">השאירו חוות דעת</h3>

            <form className="review-form" onSubmit={handleSubmitReview}>
              <label htmlFor="reviewer-name">שם מלא</label>
              <input
                id="reviewer-name"
                type="text"
                value={formState.reviewerName}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, reviewerName: e.target.value }))
                }
                required
              />

              <label htmlFor="review-avatar">תמונת פרופיל (אופציונלי)</label>
              <input
                id="review-avatar"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    reviewAvatarFile: e.target.files?.[0] || null,
                  }))
                }
              />

              <label htmlFor="review-text">תוכן חוות הדעת</label>
              <textarea
                id="review-text"
                rows={4}
                value={formState.reviewText}
                onChange={(e) => setFormState((prev) => ({ ...prev, reviewText: e.target.value }))}
                required
              />

              <label htmlFor="review-rating">דירוג</label>
              <div
                id="review-rating"
                className="interactive-rating"
                role="radiogroup"
                aria-label="בחירת דירוג בכוכבים"
                onMouseLeave={() => setHoverRating(null)}
              >
                {[1, 2, 3, 4, 5].map((value) => {
                  const activeRating = hoverRating ?? formState.rating
                  const isFilled = activeRating >= value

                  return (
                    <button
                      key={value}
                      type="button"
                      className={`rating-star-button ${isFilled ? 'filled' : ''}`}
                      role="radio"
                      aria-checked={formState.rating === value}
                      aria-label={`${value} כוכבים`}
                      onClick={() => setFormState((prev) => ({ ...prev, rating: value }))}
                      onMouseEnter={() => setHoverRating(value)}
                      onFocus={() => setHoverRating(value)}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  )
                })}
              </div>
              <p className="rating-value" aria-live="polite">
                דירוג נבחר: {formState.rating} מתוך 5
              </p>

              {/* <label htmlFor="review-picture">או העלאת תמונה מלאה לביקורת (אופציונלי)</label>
              <input
                id="review-picture"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    reviewerPictureFile: e.target.files?.[0] || null,
                  }))
                }
              /> */}

              <button
                type="submit"
                className="submit-review-button"
                disabled={submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'שולח...' : 'שליחת חוות דעת'}
              </button>

              {submitState === 'success' && (
                <p className="review-form-success" role="status">
                  חוות הדעת נשלחה בהצלחה וממתינה לאישור.
                </p>
              )}

              {submitState === 'error' && submitError && (
                <p className="review-form-error" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Reviews
