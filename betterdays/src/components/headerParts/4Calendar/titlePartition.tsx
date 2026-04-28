import React from 'react';
import { ViewType } from '../../../utils/props/Objects';

interface TitleProps {
  date: Date
  setDate: (date:Date)=>void;
  activePage: ViewType
}

export const TitlePartition: React.FC<TitleProps> = ( {date, setDate, activePage} ) => {
  let displayDate = '';
  if(activePage==='month') {
    displayDate = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  else if(activePage==='day') {
    displayDate = dayToString(date);
  }
  else if(activePage==='week') {
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate()-weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate()+6);
    displayDate = `${dayToString(weekStart)} - ${dayToString(weekEnd)}`
  }
  else {
    return (<div style={{height: '1.75rem'}}> </div>)
  }

  return (
    <div style={{display: "inherit"}}>
      <button onClick={() => {
        const newDate = new Date(date);
        if(activePage==='day') {
          newDate.setDate(newDate.getDate()-1);
        }
        if(activePage==='week') {
          newDate.setDate(newDate.getDate()-7);
        }
        if(activePage==='month') {
          newDate.setMonth(newDate.getMonth()-1);
        }
        setDate(newDate);
      }} style={{lineHeight: '1.25rem', fontSize: '1.75rem'}}>
        &lt;
      </button>
      <div style={{ backgroundColor: '#DEECFF',
                    paddingTop: '3.25px', 
                    paddingBottom: '3.25px', 
                    paddingLeft: '16px', 
                    paddingRight: '16px', 
                    textAlign: 'center',
                    width: '450px' }}>
        <h2 style={{ margin: 0, 
                     padding: 0, 
                     lineHeight: '1.25rem', 
                     fontSize: '1.25rem', 
                     color: '#000' }}>
          {displayDate}
        </h2>
      </div>
      <button onClick={() => {
        const newDate = new Date(date);
        if(activePage==='day') {
          newDate.setDate(newDate.getDate()+1);
        }
        if(activePage==='week') {
          newDate.setDate(newDate.getDate()+7);
        }
        if(activePage==='month') {
          newDate.setMonth(newDate.getMonth()+1);
        }
        setDate(newDate);
      }} style={{lineHeight: '1.25rem', fontSize: '1.75rem'}}>
        &gt;
      </button>
    </div>
  );
};

function dayToString(date: Date) : string {
  return date.toLocaleString('default', {month: 'long', year: 'numeric', day: 'numeric'});
}
