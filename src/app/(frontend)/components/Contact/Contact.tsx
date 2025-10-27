'use client';

import React, { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact-section">
      <h2 className="contact-title">צרו קשר</h2>
      <div className="contact-content">
        <div className="social-media-wrapper">
          {/* <h3>עקבו אחרי</h3> */}
          <div className="social-icons">
            <a href="https://www.facebook.com/vadim.poplavsky.9" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/popalova" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.youtube.com/@djvadimpoplavsky" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 2 12c0 2.64.28 5.38 1.46 6.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C22.72 17.38 23 14.64 23 12c0-2.64-.28-5.38-1.46-6.58z"></path><path d="M10 15l5-3-5-3z"></path></svg>
            </a>
            {/* <a href="https://www.linkedin.com/in/vadim-poplavsky" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a> */}
            <a href="https://wa.me/972544432984" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.04 2C6.55 2 2.04 6.51 2.04 12c0 1.99.52 3.93 1.51 5.64L2 22l4.49-1.48c1.63.89 3.47 1.36 5.55 1.36 5.49 0 9.96-4.51 9.96-10S17.53 2 12.04 2zm0 18.4c-1.73 0-3.34-.45-4.75-1.3l-.34-.2-2.66.88.89-2.59-.22-.34c-.95-1.45-1.45-3.13-1.45-4.85 0-4.73 3.85-8.58 8.58-8.58 4.73 0 8.58 3.85 8.58 8.58 0 4.73-3.85 8.58-8.58 8.58zm4.7-6.57c-.26-.13-1.53-.76-1.77-.85-.24-.09-.42-.13-.6.13-.18.26-.69.85-.85 1.03-.16.18-.31.2-.57.07-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.29.38-.44.13-.15.17-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.52c-.18 0-.46.07-.7.33-.24.26-.93.91-.93 2.22s.95 2.57 1.08 2.75c.13.18 1.87 2.86 4.54 4.01.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.53-.63 1.75-1.24.22-.6.22-1.11.15-1.24-.07-.13-.24-.2-.5-.33z"/>
              </svg>
            </a>
            {/* <a href="mailto:v1987p@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Email">
              <svg  viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.5l-8 5-8-5V6l8 5 8-5v2.5z"/>
              </svg>
            </a> */}
          </div>
          <div className='contact-info-wrapper'>
              <div className='phone-number'>054-4432984</div>
              <div className='email'>v1987p@gmail.com</div>
          </div>
        </div>
        {/* <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group-name">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="שם פרטי"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="שם משפחה"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="הודעה"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              שלח הודעה
            </button>
          </form>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
