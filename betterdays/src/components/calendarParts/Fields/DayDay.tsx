import React from 'react';

export const DayDay: React.FC = () => {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}${period}`;
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '75px calc(100vw - 75px)',
        gridTemplateRows: Array(12).fill('11.5vh').join(' '),
        gap: '0',
        height: '138vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      {/* Hours column - fixed */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '75px',
          height: '138vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
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
              height: '11.5vh',
              flex: 1,
            }}
          >
            {hour}
          </div>
        ))}
      </div>

      {/* Time slots column */}
      <div
        style={{
          marginLeft: '75px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {hours.map((_, index) => (
          <div
            key={`slot-${index}`}
            style={{
              borderBottom: '1px solid #ddd',
              padding: '8px',
              height: '11.5vh',
              flex: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};
