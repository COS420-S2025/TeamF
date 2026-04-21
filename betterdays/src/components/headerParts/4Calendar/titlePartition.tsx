import React from 'react';

interface TitleProps {
  date: Date
}

export const TitlePartition: React.FC<TitleProps> = ( {date} ) => {
  const currentMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div style={{ backgroundColor: '#CCCCCC', paddingTop: '3.25px', paddingBottom: '3.25px', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center' }}>
      <h2 style={{ margin: 0, padding: 0, lineHeight: '1.25rem', fontSize: '1.25rem', color: '#000' }}>{currentMonth}</h2>
    </div>
  );
};
