import React from 'react';
import './(frontend)/styles.css';

export const metadata = {
  title: 'DJ POPALOVA',
  description: 'A blank template using Payload in a Next.js app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
