import React from 'react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick?: (title: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onMenuItemClick }) => {
  const menuItems = [
    { title: 'Calendar', emoji: '📅' },
    { title: 'Habit Tracker', emoji: '✅' },
    { title: 'To Do', emoji: '📝' },
    { title: 'Add', emoji: '➕' },
    { title: 'Filter', emoji: '🔍' },
    { title: 'FAQ', emoji: '❓' },
    { title: 'Setting', emoji: '⚙️' },
  ];

  const handleMenuClick = (title: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(title);
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
          ✕
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
            <span className="text-2xl mr-3">{item.emoji}</span>
            <span className="text-lg font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuModal;
