import React from 'react';

interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
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