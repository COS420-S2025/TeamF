import React from 'react';
import WeekBody from '../components/calendarParts/Collections/weekBody';
import Header from '../components/header';
import MenuModal from '../components/menuModal';
import { useState } from 'react';

//Display the header.tsx at the top of the page and the weekBody.tsx below it


const CalenderPage: React.FC = () => {
      const [menuOpen, setMenuOpen] = useState(false);
  function setCurrent(title: string) {
    throw new Error('Function not implemented.');
}
  const handleMenuItemClick = (title: string) => {
    setCurrent(title);
  };
  return (
    <div>
      <Header onMenuOpen={() => setMenuOpen(true)} />
            <MenuModal 
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              onMenuItemClick={handleMenuItemClick}
            />
      <WeekBody />
    </div>
  );
};

export default CalenderPage;
