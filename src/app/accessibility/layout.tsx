export const metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת נגישות לאתר',
}

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Do not render a new <html> or <body> here — return children so global styles from the root layout apply
  return <>{children}</>;
}
