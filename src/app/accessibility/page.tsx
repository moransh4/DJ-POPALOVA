import React from 'react';
import styles from './accessibility.module.scss';

export const metadata = {
  title: 'הצהרת נגישות',
};

export default function AccessibilityStatementPage() {
  return (
    <main className={styles.container} dir="rtl" lang="he">
      <h1 className={styles.title}>הצהרת נגישות</h1>

      <p className={styles.lead}>
        אנו שמים דגש רב על מתן שירות שוויוני ונגיש לכלל המשתמשים, כולל אנשים עם מוגבלויות.
        מטרתנו היא לאפשר לכל אדם להשתמש באתר בנוחות, בקלות ובאופן עצמאי.
        האתר פועל בהתאם להנחיות הנגישות הבינלאומיות WCAG 2.1 ברמה AA, ובהתאם לתקנות נגישות השירות בישראל.
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
        למרות מאמצינו, ייתכן שחלק מהתכנים באתר עדיין אינם נגישים באופן מלא.
        אנו פועלים לשפר ולתקן כל ליקוי נגישות בהקדם האפשרי.
      </p>

      <h2 className={styles.heading}>פניות בנושא נגישות</h2>
      <p className={styles.paragraph}>
        אם נתקלתם בבעיה או קושי בגלישה באתר, נשמח לקבל מכם משוב.
        אנו מתחייבים לטפל בכל פנייה במהירות ובמקצועיות.
      </p>

      <div className={styles.contact}>
        <p className={styles.contactTitle}>פרטי יצירת קשר לנגישות:</p>
        <p className={styles.contactDetails}>
          שם איש קשר: ואדים פופלבסקי<br />
          טלפון: ______<br />
          דוא"ל: ______<br />
          שעות פעילות: ______
        </p>
      </div>

      <p className={styles.updated}>הצהרה זו עודכנה בתאריך: 15.01.2026</p>
    </main>
  );
}
