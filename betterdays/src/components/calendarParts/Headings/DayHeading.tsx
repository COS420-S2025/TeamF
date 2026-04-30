import React, { useEffect } from 'react';
import { Task } from '../../../utils/props/Objects';
import { useTasks } from '../../../services/databaseManager';
import { isSameDay } from '../../../services/dateVerify';
import moment from 'moment';

interface DayProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const DayHeading: React.FC<DayProps> = ( {date, openModal} ) => {
  const {tasks, refreshTasks } = useTasks();
      
  useEffect(() => {
    refreshTasks()
  }, [refreshTasks]);

  return (
    <div style={{ 
          width: '100%', 
          display: 'flex', 
          position: 'sticky',
          background: 'white',
          top: '5rem',
          right: '0px', 
          borderBottom: '1px solid #ccc',
          zIndex: 5}}>
        <div style={{width: '80px'}}></div>
        <div style={{width: '100%', marginTop: '4px'}}>
            {tasks.filter((task)=> isSameDay(date, task.start)
                                      && (moment(task.start).format("HH:mm") === "00:00" &&
                                                  moment(task.end).format("HH:mm") === "23:59")
                                      ).map((task) => ( 
                  <div
                    key={task.id}
                    style={{
                      fontSize: "12px",
                      background: task.filterNum ? "#fde3e3" : "#e3f2fd",
                      margin: "4px 2px",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      width: '99%'
                    }}
                    onClick={() => {
                      openModal(task);
                    }}
                  >
                    {task.title}
                  </div>))}
          </div>
    </div>
  );
};

export default DayHeading;