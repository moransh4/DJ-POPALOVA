import React from 'react'
import styles from './accessibility.module.scss'

export const metadata = {
  title: 'הצהרת נגישות',
}

export default function AccessibilityStatementPage() {
  return (
    <main className={styles.container} dir="rtl" lang="he" aria-labelledby="accessibility-title">
      <h1 id="accessibility-title" className={styles.title}>
        הצהרת נגישות
      </h1>

      <p className={styles.lead}>
        אנו שמים דגש רב על מתן שירות שוויוני ונגיש לכלל המשתמשים, כולל אנשים עם מוגבלויות. מטרתנו
        היא לאפשר לכל אדם להשתמש באתר בנוחות, בקלות ובאופן עצמאי. האתר פועל בהתאם להנחיות הנגישות
        הבינלאומיות WCAG 2.1 ברמה AA, ובהתאם לתקנות נגישות השירות בישראל.
      </p>

      <h2 className={styles.heading}>התאמות נגישות שבוצעו באתר</h2>
      <ul className={styles.list}>
        <li>שימוש במבנה סמנטי תקין של HTML</li>
        <li>אפשרות ניווט מלאה באמצעות מקלדת</li>
        <li>התאמת ניגודיות צבעים בהתאם לדרישות התקן</li>
        <li>טקסט חלופי לתמונות ולרכיבים גרפיים</li>
        <li>כותרות מסודרות לפי היררכיה</li>
        <li>טפסים נגישים עם תוויות והנחיות ברורות</li>
        <li>התאמה למכשירים ניידים</li>
        <li>מניעת הבהובים ותוכן שעלול לגרום לרגישות</li>
        <li>תמיכה בקוראי מסך</li>
        <li>שימוש ב־ARIA במקומות הנדרשים</li>
        <li>אפשרות להגדלת טקסט באמצעות דפדפן ללא פגיעה בתצוגה</li>
      </ul>

      <h2 className={styles.heading}>תכנים שאינם נגישים במלואם</h2>
      <p className={styles.paragraph}>
        למרות מאמצינו, ייתכן שחלק מהתכנים באתר עדיין אינם נגישים באופן מלא. אנו פועלים לשפר ולתקן כל
        ליקוי נגישות בהקדם האפשרי.
      </p>

      <h2 className={styles.heading}>פניות בנושא נגישות</h2>
      <p className={styles.paragraph}>
        אם נתקלתם בבעיה או קושי בגלישה באתר, נשמח לקבל מכם משוב. אנו מתחייבים לטפל בכל פנייה במהירות
        ובמקצועיות.
      </p>

      <div className={styles.contact}>
        <p id="contact-details-title" className={styles.contactTitle}>
          פרטי יצירת קשר לנגישות:
        </p>
        <dl className={styles.contactDetails} aria-labelledby="contact-details-title">
          <div className={styles.contactRow}>
            <dt className={styles.contactLabel}>שם איש קשר:</dt>
            <dd>ואדים פופלבסקי</dd>
          </div>
          <div className={styles.contactRow}>
            <dt className={styles.contactLabel}>טלפון:</dt>
            <dd>
              <a
                className={styles.contactLink}
                href="tel:+972544432984"
                aria-label="התקשרו למספר 054-44432984"
              >
                054-44432984
              </a>
            </dd>
          </div>
          <div className={styles.contactRow}>
            <dt className={styles.contactLabel}>דוא&quot;ל:</dt>
            <dd>
              <a
                className={styles.contactLink}
                href="mailto:v1987p@gmail.com"
                aria-label="שליחת אימייל לכתובת v1987p@gmail.com"
              >
                v1987p@gmail.com
              </a>
            </dd>
          </div>
          <div className={styles.contactRow}>
            <dt className={styles.contactLabel}>שעות פעילות:</dt>
            <dd>בימים א&#x27;-ה&#x27; 08:00-17:00</dd>
          </div>
        </dl>
      </div>

      <p className={styles.updated}>הצהרה זו עודכנה בתאריך: 14.04.2026</p>
    </main>
  )
}
