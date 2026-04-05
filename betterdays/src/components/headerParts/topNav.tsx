import React, { useState } from 'react';
import styles from './topNav.module.css';

type ViewType = 'day' | 'week' | 'month';

export const TopNav: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('week');

  return (
    <div className={styles.navContainer}>
      <button
        className={`${styles.navButton} ${activeView === 'day' ? styles.active : ''}`}
        onClick={() => setActiveView('day')}
      >
        Day
      </button>
      <button
        className={`${styles.navButton} ${activeView === 'week' ? styles.active : ''}`}
        onClick={() => setActiveView('week')}
      >
        Week
      </button>
      <button
        className={`${styles.navButton} ${activeView === 'month' ? styles.active : ''}`}
        onClick={() => setActiveView('month')}
      >
        Month
      </button>
    </div>
  );
};

export default TopNav;
