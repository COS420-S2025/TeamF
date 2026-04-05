import React from 'react';

const WeekHeadings: React.FC = () => {
  const today = new Date();
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = [];
  for (let i = 0; i < 8; i++) {
    const date = new Date(today.getTime() + (i - 1) * 24 * 60 * 60 * 1000);
    const dayIndex = date.getDay();
    const abbr = dayNames[dayIndex];
    const dayNumber = date.getDate();
    cells.push(
      <div key={i} style={{ display: 'grid', gridTemplateRows: '50px 50px', alignItems: 'center', justifyItems: 'center' }}>
        <div>({abbr})</div>
        <div>{dayNumber}</div>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 75px)', gridTemplateRows: '100px' }}>
      {cells}
    </div>
  );
};

export default WeekHeadings;