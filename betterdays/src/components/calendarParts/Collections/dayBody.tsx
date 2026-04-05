import React from 'react';
import DayHeading from '../Headings/DayHeading';
import { DayDay } from '../Fields/DayDay';
import styles from './dayBody.module.css';

const DayBody: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <DayHeading />
        <DayDay />
      </div>
    </div>
  );
};

export default DayBody;
