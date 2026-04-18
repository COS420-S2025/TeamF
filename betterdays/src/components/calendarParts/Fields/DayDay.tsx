import React, { useEffect, useState } from 'react';

export const DayDay: React.FC = () => {
  const currentTime = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });
  
  const [time, setTime] = useState(new Date());
  
  // Automatically scroll down to 8am
  useEffect(() => {document.getElementById("weekview-6am")?.scrollIntoView();}, []);
  
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
      {/* Hours column - fixed */}
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

      {/* Time slots column */}
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
            }}
          >
            {index===currentTime.getHours() && 
            <div style={{
                borderBottom:'2px solid red',
                height: `${(currentTime.getMinutes())/60*100}%`,
                padding: 0
              }}
            />}
          </div>
        ))}
      </div>
    </div>
  );
};
