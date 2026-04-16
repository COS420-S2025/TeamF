import React from 'react';
import calendarIcon from '../assets/icons/Calendar.png';
import habitIcon from '../assets/icons/Habit.png';
import listIcon from '../assets/icons/List.png';
import addIcon from '../assets/icons/PlusSquare.png';
import filterIcon from '../assets/icons/Filter.png';
import faqIcon from '../assets/icons/Archive.png';
import settingsIcon from '../assets/icons/Settings.png';
import xIcon from '../assets/icons/Xsquare.png';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick?: (title: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onMenuItemClick }) => {
  const menuItems = [
    { title: 'Calendar', icon: calendarIcon },
    { title: 'Habit Tracker', icon: habitIcon },
    { title: 'To Do', icon: listIcon },
    { title: 'Filter', icon: filterIcon },
    { title: 'FAQ', icon: faqIcon },
    { title: 'Settings', icon: settingsIcon },
  ];

  const handleMenuClick = (title: string) => {
    if (onMenuItemClick) {
      if (title==='Calendar') {
        onMenuItemClick('week');
      }
      else {
        onMenuItemClick(title);
      }
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen w-[325px] bg-white shadow-lg z-[9999]"
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">BetterDays</h2>
        <button
          onClick={onClose}
          className="text-2xl font-bold hover:text-gray-600"
          aria-label="Close menu"
        >
          <img
              src={xIcon}
              alt="Close"
              style={{ width: '32px', height: '32px', display: 'block' }}
            />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col p-4 space-y-2 items-start">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => handleMenuClick(item.title)}
            className="flex flex-row items-center p-3 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
          >
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            <span className="text-lg font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuModal;
