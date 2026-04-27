import React from 'react';
import WeekHeadings from '../Headings/WeekHeadings';
import { WeekDay } from '../Fields/WeekDay';
import styles from './weekBody.module.css';
import { Task } from '../../../utils/props/Objects';

interface WeekProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const WeekBody: React.FC<WeekProps> = ( {date, openModal} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <WeekHeadings date={date} openModal={openModal}/>
        <WeekDay date={date} openModal={openModal}/>
      </div>
    </div>
  );
};

export default WeekBody;
