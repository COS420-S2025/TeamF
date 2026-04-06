import './styles/App.css';
//import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalenderPage from './views/CalendarPage';
import TaskPage from './views/TaskPage';
import FAQPage from './views/FAQPage';
import Header from './components/calendarParts/header';
import MenuModal from './components/menuModal';
import { useState } from 'react';
import React from "react";
import Calendar from './views/Calendar';

function App(): React.JSX.Element {

  
  return (
    <div className="App">
      {/* <Page current={current}/> */}
      <Calendar/>
    </div>


  );
}
/*
function Page({current}:{current:string}): React.JSX.Element {
  if(current==="Calendar") {
    return (<CalenderPage />);
  }
  if(current==="To Do" || current==="Tasks") {
    return (<TaskPage />);
  }
  if(current==="FAQ") {
    return (<FAQPage />);
  }
  console.log("Invalid page")
  return (<CalenderPage />)

}
*/
export default App;