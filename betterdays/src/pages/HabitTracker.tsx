
import React from 'react';
import WeekBody from '../components/HabitParts/Collections/weekBody';
import DayBody from '../components/HabitParts/Collections/dayBody';
import MonthBody from '../components/HabitParts/Collections/monthBody';
import { Task, ViewType } from '../utils/props/Objects';

interface HabitPageProps {
  activeView: ViewType;
  date: Date;
  openModal : (task:Task)=>void;
}

const HabitPage: React.FC<HabitPageProps> = ({ activeView, date, openModal }) => {
  
  return (
    <div>
      {activeView === 'hday' && <DayBody date={date} openModal={openModal}/>}
      {activeView === 'hweek' && <WeekBody date={date} openModal={openModal}/>}
      {activeView === 'Habit Tracker' && <MonthBody date={date} openModal={openModal}/>}
      {activeView === 'hmonth' && <MonthBody date={date} openModal={openModal}/>}
    </div>
  );
};

export default HabitPage;
