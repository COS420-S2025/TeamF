import React from 'react';
import DayBody from '../components/HabitParts/Collections/dayBody';
import MonthBody from '../components/HabitParts/Collections/monthBody';
import { ViewType } from '../utils/props/Objects';

interface HabitTrackerPageProps {
  activeView: ViewType;
}

const HabitTrackerPage: React.FC<HabitTrackerPageProps> = ({ activeView }) => {
  return (
    <div>
        {activeView === 'month' && <MonthBody/>}
        {activeView === 'month' && <MonthBody />}
    </div>
  );
};

export default HabitTrackerPage;