import React from 'react';

interface DayProps {
  date: Date;
}

const DayHeading: React.FC<DayProps> = ( {date} ) => {
  const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div style={{ 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: '75px calc(100vw - 75px)',
          background: 'white',
          top: '5rem', 
          borderBottom: '1px solid #ccc',
          zIndex: 5}}>
      <div></div>
      <div>
        <h1 style={{textAlign: 'center'}}>{dateString}</h1>
      </div>
    </div>
  );
};

export default DayHeading;