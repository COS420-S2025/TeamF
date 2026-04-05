import React from 'react';
import MonthHeader from '../Headings/MonthHeader';
import { MonthDay } from '../Fields/MonthDay';
import styles from './monthBody.module.css';

const MonthBody: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <MonthHeader />
        <MonthDay />
      </div>
    </div>
  );
};

export default MonthBody;
