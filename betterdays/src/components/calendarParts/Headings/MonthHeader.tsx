import React from 'react';

const MonthHeader: React.FC = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div style={{ 
          display: 'flex', 
          margin: 'auto',
          position: 'sticky',
          top: '5rem',
          background: 'white',
          zIndex: 5  }}>
      {days.map(day => (
        <div
          key={day}
          style={{
            width: 'calc(100vh / 7)',
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc'
          }}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default MonthHeader;