import React from 'react'

export default function dayCircle() {
  return (
    <div>
      
    </div>
  )
}

const DayCircle = ({ date, completionRatio, isCurrentMonth = true }: {
  date: number;
  completionRatio: number;
  isCurrentMonth?: boolean;
}) => {
  const lightness = Math.round(85 - completionRatio * 65);
  const bg = `hsl(0, 0%, ${lightness}%)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 11, color: isCurrentMonth ? '#333' : '#aaa' }}>{date}</span>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        backgroundColor: isCurrentMonth ? bg : '#eee',
      }} />
    </div>
  );
};
