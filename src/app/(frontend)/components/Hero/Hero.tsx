'use client'

import React, { useEffect, useRef, useState } from 'react'
import './Hero.scss'

const SOUND_PREFERENCE_KEY = 'hero-video-sound-enabled'

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  // const servicesRef = useRef<HTMLElement>(null); // Ref for the Services section - REMOVED
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const tryAutoplay = async () => {
      video.muted = true

      try {
        await video.play()
        setIsMuted(true)
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    void tryAutoplay()
  }, [])

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const soundShouldBeEnabled = window.localStorage.getItem(SOUND_PREFERENCE_KEY) === 'true'

    if (!soundShouldBeEnabled) {
      return
    }

    const enableSoundAfterInteraction = async () => {
      video.muted = false
      setIsMuted(false)

      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        video.muted = true
        setIsMuted(true)
      }

      window.removeEventListener('pointerdown', enableSoundAfterInteraction)
      window.removeEventListener('keydown', enableSoundAfterInteraction)
      window.removeEventListener('touchstart', enableSoundAfterInteraction)
    }

    window.addEventListener('pointerdown', enableSoundAfterInteraction)
    window.addEventListener('keydown', enableSoundAfterInteraction)
    window.addEventListener('touchstart', enableSoundAfterInteraction)

    return () => {
      window.removeEventListener('pointerdown', enableSoundAfterInteraction)
      window.removeEventListener('keydown', enableSoundAfterInteraction)
      window.removeEventListener('touchstart', enableSoundAfterInteraction)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, String(!isMuted))
  }, [isMuted])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        if (videoEnded) {
          videoRef.current.currentTime = 0
          setVideoEnded(false)
        }
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleVideoEnded = () => {
    setVideoEnded(true)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 15
      videoRef.current.pause()
    }
  }

  const scrollToNextSection = () => {
    const servicesSection = document.getElementById('about-section')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero-section">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        preload="auto"
        muted={isMuted} /* Use isMuted state */
        playsInline
        onEnded={handleVideoEnded}
      >
        <source src="/VADIM.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-title-container">
        <h1>DJ POPALOVA</h1>
        <button
          type="button"
          className="scroll-down-arrow"
          onClick={scrollToNextSection}
          aria-label="גלול למקטע הבא"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div className="hero-controls-container">
        {/* <h1>Welcome to Vadim's Music Site</h1>
        <p>Experience the captivating sounds</p> */}
        <button
          onClick={handlePlayPause}
          className="video-control-button"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="4" x2="6" y2="20"></line>
              <line x1="18" y1="4" x2="18" y2="20"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        <button
          onClick={handleToggleMute}
          className="video-control-button mute-button"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          aria-pressed={isMuted}
        >
          {isMuted ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}

export default Hero
