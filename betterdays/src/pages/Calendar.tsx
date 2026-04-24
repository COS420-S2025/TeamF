
import React from 'react';
import WeekBody from '../components/calendarParts/Collections/weekBody';
import DayBody from '../components/calendarParts/Collections/dayBody';
import MonthBody from '../components/calendarParts/Collections/monthBody';
import { ViewType } from '../utils/props/Objects';

interface CalendarPageProps {
  activeView: ViewType;
  date: Date;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ activeView, date }) => {
  return (
    <div>
      {activeView === 'day' && <DayBody date={date}/>}
      {activeView === 'week' && <WeekBody date={date}/>}
      {activeView === 'month' && <MonthBody date={date}/>}
    </div>
  );
};

export default CalendarPage;
