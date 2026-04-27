
import React from 'react';
import WeekBody from '../components/calendarParts/Collections/weekBody';
import DayBody from '../components/calendarParts/Collections/dayBody';
import MonthBody from '../components/calendarParts/Collections/monthBody';
import { Task, ViewType } from '../utils/props/Objects';

interface CalendarPageProps {
  activeView: ViewType;
  date: Date;
  openModal : (task:Task)=>void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ activeView, date, openModal }) => {
  return (
    <div>
      {activeView === 'day' && <DayBody date={date} openModal={openModal}/>}
      {activeView === 'week' && <WeekBody date={date} openModal={openModal}/>}
      {activeView === 'month' && <MonthBody date={date} openModal={openModal}/>}
    </div>
  );
};

export default CalendarPage;
