import React from 'react';
import Image from 'next/image';
import './Services.scss';

// Import placeholder icons (you'll need to create these or update paths)
import weddingIcon from 'public/wedding.png';
import kidsIcon from 'public/torah.png';
import partyIcon from 'public/confetti.png';
import hennaIcon from 'public/henna.png';
import equipmentIcon from 'public/dj.png';
import phonograph from 'public/phonograph.png';

const servicesData = [
  {
    title: 'חתונות',
    icon: weddingIcon,
  },
  {
    title: 'אירועי ילדים ובר/ת מצווה',
    icon: kidsIcon,
  },
  {
    title: 'מסיבות/ ימי הולדת',
    icon: partyIcon,
  },
  {
    title: 'חינות',
    icon: hennaIcon,
  },
  {
    title: 'השכרת ציוד',
    icon: equipmentIcon,
  },
  {
    title: 'שיעורי תקלוט',
    icon: phonograph,
  },
];

const Services = () => {
  return (
    <section id="services-section">
      <h2 className="services-title">השירותים שלי</h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-item" key={index}>
            <Image src={service.icon} alt={service.title} width={60} height={60} />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
