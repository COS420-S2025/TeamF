import React from 'react';
import WeekHeadings from '../Headings/WeekHeadings';
import { WeekDay } from '../Fields/WeekDay';
import styles from './weekBody.module.css';

const WeekBody: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <WeekHeadings />
        <WeekDay />
      </div>
    </div>
  );
};

export default WeekBody;
