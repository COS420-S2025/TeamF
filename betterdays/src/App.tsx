import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalenderPage from './views/CalendarPage';
import TaskPage from './views/TaskPage';
import FAQPage from './views/FAQPage';
import { useState } from 'react';
import React from "react";

function App(): React.JSX.Element {
  const [current, setCurrent] = useState("Calender");
  
  function onClick(newValue : string) {
    return () => {setCurrent(newValue)};
  }
  
  return (
    <div className="App">
      <button onClick={onClick("Calender")}>Calender</button>
      <button onClick={onClick("Tasks")}>Tasks</button>
      <button onClick={onClick("FAQ")}>FAQ</button>
      <Page current={current}/>
    </div>
  );
}

function Page({current}:{current:string}): React.JSX.Element {
  if(current==="Calender") {
    return (<CalenderPage />);
  }
  if(current==="Tasks") {
    return (<TaskPage />);
  }
  if(current==="FAQ") {
    return (<FAQPage />);
  }
  console.log("Invalid page")
  return (<CalenderPage />)
}

export default App;