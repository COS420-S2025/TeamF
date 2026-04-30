//updated with AI for filter

import React, { useEffect, useState } from 'react';
import { Task } from '../../../utils/props/Objects';
import moment from 'moment';
import { isSameDay } from '../../../services/dateVerify';
import { useTasks } from '../../../services/databaseManager';

interface DayProps {
  date: Date;
  openModal: (task: Task) => void;
}

export const DayDay: React.FC<DayProps> = ({ date, openModal }) => {
  // Gets the current date and time so the day view can draw the red current-time line.
  const currentTime = new Date();

  // Checks whether this day view is showing the real current day.
  const isCurrentDay = currentTime.getDate() === date.getDate()
    && currentTime.getMonth() === date.getMonth()
    && currentTime.getFullYear() === date.getFullYear();

  // Creates the hour labels for the left side of the day calendar.
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });

  // Loads tasks from the database manager.
  const { tasks, refreshTasks } = useTasks();

  // Refreshes tasks when the day calendar loads.
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  // Stores the current time so the red time line can update while the page is open.
  const [time, setTime] = useState(new Date());

  // Automatically scroll down to 6am when the day view opens.
  useEffect(() => {
    document.getElementById("weekview-6am")?.scrollIntoView();
  }, []);

  // Updates the current-time state once per second.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '75px calc(100vw - 75px)',
        gap: '0',
        position: 'relative',
      }}
    >
      {/* Hours column. */}
      <div
        style={{
          left: 0,
          top: 0,
          width: '75px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        {hours.map((hour, index) => (
          <div
            key={`hour-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid #ccc',
              fontSize: '16px',
              fontWeight: 'bold',
              height: '100px',
            }}
          >
            {hour}
          </div>
        ))}
      </div>

      {/* Time slots column. */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {hours.map((_, index) => (
          <div
            key={`slot-${index}`}
            style={{
              border: '1px solid #ddd',
              height: '100px',
              position: 'relative'
            }}
          >
            {/* Red current-time line. */}
            {isCurrentDay && index === time.getHours() &&
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

            {/* Timed tasks for this day and hour. Filtered tasks stay visible but turn pink. */}
            {tasks.filter((task) =>
              isSameDay(date, task.start)
              && index === task.start.getHours()
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
          </div>
        ))}
      </div>
    </div>
  );
};