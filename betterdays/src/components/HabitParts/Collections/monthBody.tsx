import React from 'react';
import MonthHeader from '../Headings/MonthHeader';
import { MonthDay } from '../Fields/MonthDay';
import styles from './monthBody.module.css';
import { Task } from '../../../utils/props/Objects';

interface MonthProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const MonthBody: React.FC<MonthProps> = ({date, openModal}) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <MonthHeader />
        <MonthDay date={date} openModal={openModal}/>
      </div>
    </div>
  );
};

export default MonthBody;
