import React from 'react';
import DayHeading from '../Headings/DayHeading';
import { DayDay } from '../Fields/DayDay';
import styles from './dayBody.module.css';
import { Task } from '../../../utils/props/Objects';

interface DayProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const DayBody: React.FC<DayProps> = ( {date, openModal} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <DayHeading date={date} openModal={openModal}/>
        <DayDay date={date} openModal={openModal}/>
      </div>
    </div>
  );
};

export default DayBody;
