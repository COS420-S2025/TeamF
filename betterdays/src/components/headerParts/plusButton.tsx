import React from 'react';
import plusSquareIcon from '../../assets/icons/PlusSquare.png';

interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} 
    style=
    {{ 
    padding: 0, 
    border: 'none', 
    background: 'none', 
    cursor: 'pointer' 
    }}>
    <img src={plusSquareIcon} 
    alt="Add" 
    style={{ display: 'block' }} />
    </button>
  );
};

export default PlusButton;