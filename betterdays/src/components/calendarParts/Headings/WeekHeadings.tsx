import React, { useEffect } from 'react';
import { isSameDay } from '../../../services/dateVerify';
import { useTasks } from '../../../services/databaseManager';
import moment from 'moment';
import { Task } from '../../../utils/props/Objects';

interface WeekProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const WeekHeadings: React.FC<WeekProps> = ( {date, openModal} ) => {
  const today = new Date();
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = [];
  const dayOfMonth = date.getDate()-date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth();
  const {tasks, refreshTasks } = useTasks();
    
  useEffect(() => {
    refreshTasks()
  }, [refreshTasks]);
  
  for (let i = 0; i < 7; i++) {
    const dayNumber = dayOfMonth+i;
    const abbr = dayNames[i];
    cells.push(
      <div key={i} style={{
            width: 'calc(100vh / 7)',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: isSameDay(new Date(year, month, dayNumber), today) ? '#ffd1d1' : 'white',
            border: '1px solid #ccc'}}>
        <div>({abbr})</div>
        <br/>
        <div>{new Date(year, month, dayNumber).getDate()}</div>
        {tasks.filter((task)=> isSameDay(new Date(year, month, dayNumber), task.start)
                                && (moment(task.start).format("HH:mm") === "00:00" &&
                                            moment(task.end).format("HH:mm") === "23:59")
                                ).map((task) => ( 
            <div
              key={task.id}
              style={{
                fontSize: "12px",
                background: "#e3f2fd",
                marginBottom: "2px",
                padding: "2px 4px",
                borderRadius: "4px",
                width: '95%'
              }}
              onClick={() => {
                openModal(task);
              }}
            >
              {task.title}
            </div> ))}
      </div>
    );
  }
  return (
    <div style={{ 
          display: 'flex', 
          position: 'sticky',
          top: '5rem',
          background: 'white',
          zIndex: 5}}>
      <div className='time-cell' style={{height: 'auto'}}></div>
      {cells}
    </div>
  );
};

export default WeekHeadings;

function openModal(task: Task) {
  throw new Error('Function not implemented.');
}
