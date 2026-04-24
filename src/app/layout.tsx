import React from 'react'
import './(frontend)/styles.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
