// CustomToolbar.jsx
import React from 'react';
import styles from './CustomToolbar.module.css';

const CustomToolbar = (toolbar) => {
  const goToPreviousMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNextMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToToday = () => {
    toolbar.date.setMonth(new Date().getMonth());
    toolbar.onNavigate('current');
  };

  const goToView = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className={styles.toolbar}>
      <div>
        <button className={styles.button} onClick={goToPreviousMonth}>
            mois
        </button>
        <button className={styles.button} onClick={goToNextMonth}>
          Next Month
        </button>
        <button className={styles.button} onClick={goToToday}>
          Today
        </button>
      </div>
      <span className={styles.label}>{toolbar.label}</span>
      <div>
        <button className={styles.button} onClick={() => goToView('day')}>
         jour 
        </button>
        <button className={styles.button} onClick={() => goToView('week')}>
         semaine 
        </button>
        <button className={styles.button} onClick={() => goToView('month')}>
         mois 
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
