'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './InstagramFeed.scss'

interface InstagramPost {
  id: string
  link: string
  sortOrder?: number
}

type InstagramWindow = Window & {
  instgrm?: {
    Embeds: {
      process: () => void
    }
  }
}

const normalizeInstagramLink = (url: string): string => {
  try {
    const u = new URL(url)
    return `${u.protocol}//${u.hostname}${u.pathname}`
  } catch {
    return url
  }
}

const createInstagramBlockquote = (link: string): string => {
  const normalizedLink = normalizeInstagramLink(link)
  return `<blockquote class="instagram-media" data-instgrm-permalink="${normalizedLink}?utm_source=ig_web_copy_link" data-instgrm-version="14"><a href="${normalizedLink}" target="_blank" rel="noopener noreferrer">View this post on Instagram</a></blockquote>`
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/instagram?limit=30&sort=sortOrder')
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts')
        }
        const data: { docs: InstagramPost[] } = await response.json()
        const blockquotes = data.docs
          .filter((post) => post.link)
          .map((post) => createInstagramBlockquote(post.link))
        setPosts(blockquotes)
        setError(null)
      } catch (err) {
        console.error('Error fetching Instagram posts:', err)
        setError('Unable to load Instagram feed')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  useEffect(() => {
    if (posts.length === 0) return

    // Retry until Instagram's embed script is loaded (race condition on refresh)
    let attempts = 0
    const maxAttempts = 20

    const tryProcess = () => {
      const w = window as InstagramWindow
      if (w && typeof w.instgrm !== 'undefined') {
        w.instgrm.Embeds.process()
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(tryProcess, 300)
      }
    }

    const timeout = setTimeout(tryProcess, 100)
    return () => clearTimeout(timeout)
  }, [posts])

  return (
    <section id="instagram-feed-section">
      <h2 className="instagram-feed-title">עקבו אחרי באינסטגרם</h2>

      {loading && <div className="instagram-feed-state">📸 טוען תמונות מדהימות...</div>}

      {error && <div className="instagram-feed-state instagram-feed-state-error">⚠️ {error}</div>}

      {!loading && posts.length === 0 && !error && (
        <div className="instagram-feed-state">אין פוסטים להצגה כרגע</div>
      )}

      {!loading && posts.length > 0 && (
        <div className="instagram-swiper-wrapper">
          <div className="swiper-button-prev-custom">
            <span />
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ clickable: true }}
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
              1300: { slidesPerView: 3 },
            }}
            className="instagram-swiper"
          >
            {posts.map((embedCode, index) => (
              <SwiperSlide key={index}>
                <div
                  className="instagram-post-item"
                  dangerouslySetInnerHTML={{ __html: embedCode }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next-custom">
            <span />
          </div>
        </div>
      )}
    </section>
  )
}

export default InstagramFeed
