import React from 'react';
import styles from '../topNav.module.css';
import { ViewType } from '../../../utils/props/Objects';



interface TopNavProps {
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
}

const TopNav: React.FC<TopNavProps> = ({ activeView, onChangeView }) => {
  return (
    <div className={styles.navContainer}>
      <button
        className={`${styles.navButton} ${activeView === 'day' ? styles.active : ''}`}
        onClick={() => onChangeView('day')}
      >
        Day
      </button>

      <button
        className={`${styles.navButton} ${activeView === 'week' ? styles.active : ''}`}
        onClick={() => onChangeView('week')}
      >
        Week
      </button>

      <button
        className={`${styles.navButton} ${activeView === 'month' ? styles.active : ''}`}
        onClick={() => onChangeView('month')}
      >
        Month
      </button>
    </div>
  );
};

export default TopNav;