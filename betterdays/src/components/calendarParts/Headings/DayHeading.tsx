import React from 'react';

const DayHeading = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div style={{ width: '100vw', display: 'grid', gridTemplateColumns: '75px calc(100vw - 75px)', height: '100px' }}>
      <div></div>
      <div>
        <h1>{dateString}</h1>
      </div>
    </div>
  );
};

export default DayHeading;