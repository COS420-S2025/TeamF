import React from 'react';

const WeekHeadings: React.FC = () => {
  const today = new Date();
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = [];
  const dayOfMonth = today.getDate()-today.getDay();
  for (let i = 0; i < 7; i++) {
    //const date = new Date(today.getTime() + (i - 1) * 24 * 60 * 60 * 1000);
    const dayNumber = dayOfMonth+i
    const abbr = dayNames[i];
    //const dayNumber = date.getDate();
    cells.push(
      <div key={i} style={{
            width: 'calc(100vh / 7)',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc' }}>
        <div>({abbr})</div>
        <br/>
        <div>{dayNumber}</div>
      </div>
    );
  }
  return (
    <div style={{ 
          display: 'flex', 
          position: 'sticky',
          top: '5rem',
          background: 'white',
          zIndex: 5}}>
      <div className='time-cell' style={{height: 'auto', 'border': 'none'}}></div>
      {cells}
    </div>
  );
};

export default WeekHeadings;