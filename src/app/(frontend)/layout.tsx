import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'DJ POPALOVA',
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Nested layout must not render <html> or <body> — those are provided by the root layout
  return <>{children}</>
}
