import React, { useEffect } from 'react';

export const DayDay: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  });
  
  // Automatically scroll down to 8am
  useEffect(() => {document.getElementById("weekview-6am")?.scrollIntoView();}, [])

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
              fontSize: '12px',
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
              padding: '8px',
              height: '100px',
            }}
          />
        ))}
      </div>
    </div>
  );
};
