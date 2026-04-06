import React from 'react';
import MenuButton from '../headerParts/menuButton';
import TopNav from '../headerParts/4Calendar/topNav';
import PlusButton from '../headerParts/plusButton';
import { TitlePartition } from '../headerParts/4Calendar/titlePartition';

interface HeaderProps {
  onMenuOpen?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  return (
    <header className="header">
      {/* Title Partition */}
      <div className="title-partition" style={{ backgroundColor: '#CCCCCC', padding:0,margin:0}}>
        <TitlePartition />
      </div>

      {/* 3-Column Section */}
      <div className="header-content">
        {/* Left Column (15%) */}
        <div className="header-column left-column">
          <MenuButton onClick={onMenuOpen} />
        </div>

        {/* Middle Column (70%) */}
        <div className="header-column middle-column">
          <TopNav />
        </div>

        {/* Right Column (15%) */}
        <div className="header-column right-column">
          <PlusButton />
        </div>
      </div>

      <style>{`
        .header {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .title-partition {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #CCCCCC;
          padding: 0;
          text-align: center;
        }

        .header-content {
          display: flex;
          width: 100%;
          gap: 0;
          background-color: #CCCCCC;
          border-radius: 0;
          padding: 8px 0 0 0;
        }

        .header-column {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
        }

        .left-column {
          width: 15%;
        }

        .middle-column {
          width: 70%;
        }

        .right-column {
          width: 15%;
        }
      `}</style>
    </header>
  );
};

export default Header;
