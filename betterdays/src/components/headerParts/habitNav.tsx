import React from 'react';
import styles from './topNav.module.css';
import { ViewType } from '../../utils/props/Objects';



interface HabitNavProps {
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
}

const HabitNav: React.FC<HabitNavProps> = ({ activeView, onChangeView }) => {
  return (
    <div className={styles.navContainer}>
      <button
        className={`${styles.navButton} ${activeView === 'hday' ? styles.active : ''}`}
        onClick={() => onChangeView('hday')}
      >
        Day
      </button>

      <button
        className={`${styles.navButton} ${activeView === 'hmonth' ? styles.active : ''}`}
        onClick={() => onChangeView('hmonth')}
      >
        Month
      </button>
    </div>
  );
};

export default HabitNav;