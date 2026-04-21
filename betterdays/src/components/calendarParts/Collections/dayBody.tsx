import React from 'react';
import DayHeading from '../Headings/DayHeading';
import { DayDay } from '../Fields/DayDay';
import styles from './dayBody.module.css';

interface DayProps {
  date: Date;
}

const DayBody: React.FC<DayProps> = ( {date} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        {/*<DayHeading date={date}/>*/}
        <DayDay date={date}/>
      </div>
    </div>
  );
};

export default DayBody;
