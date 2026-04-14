'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      <div className="bubbles-container" aria-label="גלריית אומנים צפה">
        {workWithItems.map((item, index) => (
          <article
            key={item.id}
            className={`bubble bubble-${index % 6} ${expandedId === item.id ? 'expanded' : ''}`}
            tabIndex={0}
            role="button"
            aria-label={`אומן: ${item.name}. לחץ Enter או לחץ כדי להרחיב`}
            aria-expanded={expandedId === item.id}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpandedId(expandedId === item.id ? null : item.id);
              }
            }}
          >
            {item.image && item.image.url && (
              <Image
                src={item.image.url}
                alt={item.name}
                width={150}
                height={150}
                className="bubble-image"
              />
            )}
            <h3 className="bubble-name">{item.name}</h3>
          </article>
        ))}
      </div>

      {/* Expanded Modal Overlay */}
      {expandedId && (
        <div
          className="bubble-modal-overlay"
          onClick={() => setExpandedId(null)}
          role="presentation"
          aria-label="סגור חלון מורחב"
        >
          <article
            className="bubble-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {workWithItems.map((item) => {
              if (item.id !== expandedId) return null;
              return (
                <div key={item.id}>
                  {item.image && item.image.url && (
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="modal-image"
                    />
                  )}
                  <h2 id="modal-title">{item.name}</h2>
                  <button
                    className="modal-close"
                    onClick={() => setExpandedId(null)}
                    aria-label="סגור"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </article>
        </div>
      )}
    </section>
  );
};

export default WorkWith;
