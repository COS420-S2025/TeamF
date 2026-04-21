import React from 'react';

import menuIcon from '../../assets/icons/Menu.png';
import { ViewType } from '../../utils/props/Objects';

interface MenuButtonProps {
  onClick : ()=>void;
  date: Date;
  setDate: (date:Date)=>void;
  activePage: ViewType;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, date, setDate, activePage }) => (
  <div>
    <div>
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
      }}
    >
      <img
        src={menuIcon}
        alt="Menu"
        style={{ width: '40px', height: '40px', display: 'block' }}
      />
    </button>
    </div>
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
    }}>
      &lt;
    </button>
    <button onClick={() => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth()+1);
      setDate(newDate);
    }}>
      &gt;
    </button>
  </div>
);

export default MenuButton;
