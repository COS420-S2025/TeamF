import React, { useEffect, useState } from 'react';

export const MonthDay: React.FC = () => {
  const currentTime = new Date();
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Get first day of month and number of days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    
    // Create array of 35 cells (5 rows × 7 columns)
    const days = [];
    
    // Fill in empty cells before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Fill in days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    // Fill remaining cells up to 35
    while (days.length < 35) {
      days.push(null);
    }
    
    return days;
  };
  
   const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

  const days = generateCalendarDays();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 0,
        height: '80vh',
        width: '100%',
        position: 'relative',
      }}
    >
      {days.map((day, index) => (
        <div
          key={index}
          style={{
            height: '16vh',
            width: '100%',
            border: '1px solid #ccc',
            position: 'relative',
            backgroundColor: day ? (day===currentTime.getDate() ? '#ff7777': 'white') : '#f9f9f9',
          }}
        >
          {day && (
            <div
              style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {day}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthDay;
