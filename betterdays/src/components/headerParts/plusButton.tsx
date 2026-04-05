import React from 'react';

const PlusButton: React.FC = () => {
  return (
    <button
      style={{
        borderRadius: '12.5px',
        border: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        backgroundColor: '#CCCCCC',
        cursor: 'pointer',
        fontSize: '24px',
      }}
    >
      +
    </button>
  );
};

export default PlusButton;
