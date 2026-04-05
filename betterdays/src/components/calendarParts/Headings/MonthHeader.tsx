import React from 'react';

const MonthHeader: React.FC = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div style={{ display: 'flex' }}>
      {days.map(day => (
        <div
          key={day}
          style={{
            height: 'calc(100vh / 7)',
            width: 'calc(100vh / 7)',
            display: 'flex',
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