
/*
import React, { useState } from 'react';
import WeekBody from '../components/calendarParts/Collections/weekBody';
import DayBody from '../components/calendarParts/Collections/dayBody';
import MonthBody from '../components/calendarParts/Collections/monthBody';
import MenuModal from '../components/menuModal';
import FormModal from '../components/headerParts/formModal';
// Header parts
import MenuButton from '../components/headerParts/menuButton';
import PlusButton from '../components/headerParts/plusButton';
import TopNav from '../components/headerParts/4Calendar/topNav';
import { TitlePartition } from '../components/headerParts/4Calendar/titlePartition';
import TaskPage from './TaskPage';
import FAQPage from './FAQPage';
import {Task, ViewType} from '../utils/props/Objects'
import Settings from './Settings';



const CalendarPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('week');
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function addTask(task: Task): void {
    setTasks(tasks.concat(task));
  }

  return (
    <div>
      {/* ===== Calendar-Specific Header ===== }
      <header className="calendar-header">
        {/* Title Partition }
        <div className="title-partition">
          <TitlePartition />
        </div>

        {/* 3-Column Section }
        <div className="header-content">
          {/* Left Column (Menu Button) }
          <div className="header-column left-column">
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>

          {/* Middle Column (TopNav) }
          <div className="header-column middle-column">
            <TopNav activeView={viewType} onChangeView={setViewType} />
          </div>

          {/* Right Column (Plus Button) }
          <div className="header-column right-column">
            <PlusButton onClick={() => setModalOpen(true)} />
          </div>
        </div>

        <style>{`
          .calendar-header {
            width: 100%;
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .title-partition {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #CCCCCC;
            padding: 0;
            text-align: center;
          }

          .header-content {
            display: flex;
            width: 100%;
            gap: 0;
            background-color: #CCCCCC;
            border-radius: 0;
            padding: 8px 0 0 0;
          }

          .header-column {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
          }

          .left-column {
            width: 15%;
          }

          .middle-column {
            width: 70%;
          }

          .right-column {
            width: 15%;
          }
        `}</style>
      </header>

      {/* ===== Menu Modal ===== }
      <MenuModal 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onMenuItemClick={(title) => setViewType(title as ViewType)}
      />
      
      {/* ===== Form Modal ===== }
      <FormModal isOpen={modalOpen} onClose={() => {setModalOpen(false)}}/>


      {viewType === 'To Do' && <TaskPage tasks={tasks}/>}
      {viewType === 'FAQ' && <FAQPage/>}
      {viewType === 'settings' && <Settings/>}
      
      {/* ===== Calendar Body Views ===== }
      {viewType === 'day' && <DayBody />}
      {viewType === 'week' && <WeekBody />}
      {viewType === 'month' && <MonthBody />}
      
      
    </div>
  );
};

export default CalendarPage;
*/

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
      {activeView === 'day' && <DayBody date={date} />}
      {activeView === 'week' && <WeekBody date={date} openModal={openModal}/>}
      {activeView === 'month' && <MonthBody date={date} openModal={openModal}/>}
    </div>
  );
};

export default CalendarPage;
