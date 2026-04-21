import React from 'react';
import MonthHeader from '../Headings/MonthHeader';
import { MonthDay } from '../Fields/MonthDay';
import styles from './monthBody.module.css';

interface MonthProps {
  date: Date
}

const MonthBody: React.FC<MonthProps> = ({date}) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <MonthHeader />
        <MonthDay date={date}/>
      </div>
    </div>
  );
};

export default MonthBody;
