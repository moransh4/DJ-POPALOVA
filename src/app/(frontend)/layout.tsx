import React from 'react'
import './styles.css'

export const metadata = {
  title: 'DJ POPALOVA',
  description:
    'DJ POPALOVA - מוזיקה חיה, סטים לאירועים, חתונות ומסיבות. היכנסו לגלריה, לביקורות ולהזמנת אירוע.',
  openGraph: {
    title: 'DJ POPALOVA',
    description:
      'DJ POPALOVA - מוזיקה חיה, סטים לאירועים, חתונות ומסיבות. היכנסו לגלריה, לביקורות ולהזמנת אירוע.',
    type: 'website',
  },
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return <main>{children}</main>
}
