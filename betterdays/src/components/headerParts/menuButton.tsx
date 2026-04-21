import React from 'react';

import menuIcon from '../../assets/icons/Menu.png';
import { ViewType } from '../../utils/props/Objects';

interface MenuButtonProps {
  onClick : ()=>void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
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
    
  </div>
);

export default MenuButton;
