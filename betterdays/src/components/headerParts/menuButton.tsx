import React from 'react';

const MenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, ...props }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CCCCCC',
    }}
  >
    <button
      type="button"
      {...props}
      style={{
        ...style,
        width: '80%',
        maxWidth: '280px',
        minHeight: '44px',
        padding: '10px',
        border: 'none',
        background: '#CCCCCC',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '6px',
          backgroundColor: "#CCCCCC"
        }}
      >
        <span
          style={{
            width: '100%',
            height: '3px',
            borderRadius: '2px',
            background: '#000',
          }}
        />
        <span
          style={{
            width: '100%',
            height: '3px',
            borderRadius: '2px',
            background: '#000',
          }}
        />
        <span
          style={{
            width: '100%',
            height: '3px',
            borderRadius: '2px',
            background: '#000',
          }}
        />
      </div>
    </button>
  </div>
);

export default MenuButton;
