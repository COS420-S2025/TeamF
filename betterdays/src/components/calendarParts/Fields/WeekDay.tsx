//updated with AI to help filter

import React, { useEffect, useState } from 'react';
import { Task } from '../../../utils/props/Objects';
import { useTasks } from '../../../services/databaseManager';
import moment from 'moment';

interface WeekProps {
  date: Date;
  openModal: (task: Task) => void;
}

const WeekDay: React.FC<WeekProps> = ({ date, openModal }) => {
  // Gets the current date and time so the week view can draw the red current-time line.
  const currentTime = new Date();

  // Finds the Sunday at the start of the currently selected week.
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setMinutes(0);
  weekStart.setHours(0);
  weekStart.setSeconds(0);

  // Finds the Saturday at the end of the currently selected week.
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Checks whether the real current day is inside the selected week.
  const hasCurrentDay = weekStart < currentTime && weekEnd > currentTime;

  // Creates the hour labels for the left side of the week calendar.
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });

  // Loads tasks from the database manager.
  const { tasks, refreshTasks } = useTasks();

  // Refreshes tasks when the week calendar loads.
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  // Automatically scroll down to 6am when the week view opens.
  useEffect(() => {
    document.getElementById("weekview-6am")?.scrollIntoView();
  }, []);

  // Stores the current time so the red time line can update while the page is open.
  const [time, setTime] = useState(new Date());

  // Updates the current-time state once per second.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid='weekday' className="week-day-grid">
      <div className="grid-container">
        {hours.map((hour, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            <div className="time-cell" id={`weekview-${hour}`}>{hour}</div>

            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="blank-cell">
                {/* Timed tasks for this hour and weekday. Filtered tasks stay visible but turn pink. */}
                {tasks.filter((task) =>
                  rowIndex === task.start.getHours()
                  && colIndex === task.start.getDay()
                  && task.start > weekStart
                  && task.end < weekEnd
                  && !(moment(task.start).format("HH:mm") === "00:00" &&
                    moment(task.end).format("HH:mm") === "23:59")
                ).map((task) => (
                  <div
                    key={task.id}
                    style={{
                      fontSize: "12px",
                      border: '1px solid black',
                      background: task.filterNum ? "#fde3e3" : "#e3f2fd",
                      position: 'absolute',
                      top: `${(task.start.getMinutes()) / 60 * 100}%`,
                      height: `${(task.end.getTime() - task.start.getTime()) * 100 / (1000 * 60 * 60)}%`,
                      width: '100%',
                      borderRadius: "4px",
                      zIndex: 3
                    }}
                    onClick={() => {
                      openModal(task);
                    }}
                  >
                    {task.title}
                  </div>
                ))}

                {/* Red current-time line. */}
                {rowIndex === time.getHours() && hasCurrentDay && colIndex === time.getDay() &&
                  <div
                    style={{
                      borderBottom: '2px solid red',
                      position: 'inherit',
                      top: `${(time.getMinutes()) / 60 * 100}%`,
                      width: '100%',
                      padding: 0,
                      zIndex: 4
                    }}
                  />
                }
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