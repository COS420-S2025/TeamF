import React, { useEffect } from 'react';

const WeekDay: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });
  
  // Automatically scroll down to 8am
  useEffect(() => {document.getElementById("weekview-6am")?.scrollIntoView();}, [])

  return (
    <div className="week-day-grid">
      <div className="grid-container">
        {hours.map((hour, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            <div className="time-cell" id={`weekview-${hour}`}>{hour}</div>
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="blank-cell"></div>
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
        }
      `}</style>
    </div>
  );
};

export { WeekDay };
export default WeekDay;
