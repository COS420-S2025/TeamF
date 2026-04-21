import React from 'react';
import WeekHeadings from '../Headings/WeekHeadings';
import { WeekDay } from '../Fields/WeekDay';
import styles from './weekBody.module.css';

interface WeekProps {
  date: Date
}

const WeekBody: React.FC<WeekProps> = ( {date} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <WeekHeadings date={date}/>
        <WeekDay date={date}/>
      </div>
    </div>
  );
};

export default WeekBody;
