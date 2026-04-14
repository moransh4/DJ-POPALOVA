import React from 'react'
import Image from 'next/image'
import './Services.scss'

// Import placeholder icons (you'll need to create these or update paths)
import weddingIcon from 'public/wedding.png'
import kidsIcon from 'public/torah.png'
import partyIcon from 'public/confetti.png'
import hennaIcon from 'public/henna.png'
import equipmentIcon from 'public/dj.png'
import phonograph from 'public/phonograph.png'

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
]

const Services = () => {
  return (
    <section
      id="services-section"
      role="region"
      aria-labelledby="services-heading"
      lang="he"
      dir="rtl">
      <h2 id="services-heading" className="services-title">
        השירותים שלי
      </h2>
      <ul className="services-grid" aria-label="רשימת השירותים">
        {servicesData.map((service, index) => (
          <li
            className="service-item"
            key={`${service.title}-${index}`}
            tabIndex={0}
            aria-label={`שירות: ${service.title}`}>
            <Image src={service.icon} alt="" aria-hidden="true" width={60} height={60} />
            <h3>{service.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Services
