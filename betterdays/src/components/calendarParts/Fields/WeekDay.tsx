import React, { useEffect, useState } from 'react';
import { Task } from '../../../utils/props/Objects';
import { useTasks } from '../../../services/databaseManager';

interface WeekProps {
  date: Date;
  openModal : (task:Task)=>void;
}

const WeekDay: React.FC<WeekProps> = ( {date, openModal} ) => {
  const currentTime = new Date();
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate()-weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate()+6);
  const hasCurrentDay = weekStart < currentTime && weekEnd > currentTime
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });
  
  const {tasks, refreshTasks } = useTasks();
  
    useEffect(() => {
      refreshTasks()
    }, [refreshTasks]);
  
  // Automatically scroll down to 8am
  useEffect(() => {document.getElementById("weekview-6am")?.scrollIntoView();}, []);
  
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="week-day-grid">
      <div className="grid-container">
        {hours.map((hour, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            <div className="time-cell" id={`weekview-${hour}`}>{hour}</div>
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="blank-cell">
                {tasks.filter((task)=>rowIndex===task.start.getHours() 
                        && colIndex===task.start.getDay()).map((task) => ( 
                    <div
                      key={task.id}
                      style={{
                        fontSize: "12px",
                        background: "#e3f2fd",
                        marginBottom: "2px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        openModal(task);
                      }}

                    >
                      {task.title}
                    </div>
                  ))}
                {rowIndex===currentTime.getHours() && hasCurrentDay && colIndex===currentTime.getDay() && 
                  <div style={{
                      borderBottom:'2px solid red',
                      position: 'absolute',
                      top: `${(currentTime.getMinutes())/60*100}%`,
                      width: '100%',
                      padding: 0,
                      zIndex: 5
                    }}
                  />}
                
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: 75px repeat(7, 1fr);
          gap: 0;
          position: relative;
        }
        .grid-row {
          display: contents;
        }
        .time-cell {
          position: sticky;
          left: 0;
          width: 75px;
          height: 100px;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background-color: #f5f5f5;
        }
        .blank-cell {
          width: 100%;
          height: 100px;
          border: 1px solid #ccc;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export { WeekDay };
export default WeekDay;
