import React from 'react';

const DayHeading = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div style={{ 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: '75px calc(100vw - 75px)',
          background: 'white',
          position: 'sticky',
          top: '5rem', 
          zIndex: 5}}>
      <div></div>
      <div>
        <h1>{dateString}</h1>
      </div>
    </div>
  );
};

export default DayHeading;