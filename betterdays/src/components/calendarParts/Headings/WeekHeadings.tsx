import React from 'react';

interface WeekProps {
  date: Date
}

const WeekHeadings: React.FC<WeekProps> = ( {date} ) => {
  const today = new Date();
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const cells = [];
  const dayOfMonth = date.getDate()-date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth();
  for (let i = 0; i < 7; i++) {
    const dayNumber = dayOfMonth+i;
    const abbr = dayNames[i];
    cells.push(
      <div key={i} style={{
            width: 'calc(100vh / 7)',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: dayNumber===today.getDate() ? '#ffd1d1' : 'white',
            border: '1px solid #ccc'}}>
        <div>({abbr})</div>
        <br/>
        <div>{new Date(year, month, dayNumber).getDate()}</div>
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
      <div className='time-cell' style={{height: 'auto'}}></div>
      {cells}
    </div>
  );
};

export default WeekHeadings;