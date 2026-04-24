import React, { useState } from 'react';
import CalendarPage from './pages/Calendar';
import TaskPage from './pages/TaskPage';
import FAQPage from './pages/FAQPage';
import TagPage from './pages/TagPage';
import Settings from './pages/Settings';
import MenuModal from './components/menuModal';
import FormModal from './components/headerParts/formModal';
import MenuButton from './components/headerParts/menuButton';
import PlusButton from './components/headerParts/plusButton';
import { TitlePartition } from './components/headerParts/4Calendar/titlePartition';
import { ViewType } from './utils/props/Objects';
import { useAuth } from './hooks/useAuth';
import Login from "./Login"
import Logout from "./Logout"
// Keeps the TopNav import out of App's direct concern if you want,
// or inline it — either is fine
import TopNav from './components/headerParts/4Calendar/topNav';
import Register from './Register';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ViewType>('week');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { user, loading } = useAuth();
  const [register, setRegister] = useState(false);
  
  if (user === null) {
    return (<div style={{textAlign: 'center'}}>
        <title>BetterDays</title>
        <h2 className="text-xl font-bold" >BetterDays</h2>
        {register ? <Register setRegister={setRegister} /> : 
                    <Login setRegister={setRegister} />}
      </div>)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'To Do':
        return <TaskPage/>;
      case 'FAQ':
        return <FAQPage />;
      case 'Settings':
        return <Settings />;
      case 'Add Tags':
        return <TagPage />
      default:
        return <CalendarPage activeView={activePage} date={date} />;
    }
  };

  return (
    <div>
      <title>BetterDays</title>
      {/* ===== App-Level Header ===== */}
      <header className="w-full flex flex-col sticky top-0 z-10">
        {/* Title Partition */}
        <div className="w-full flex justify-center items-center bg-[#CCCCCC] p-0 text-center">
          <TitlePartition activePage={activePage} date={date} setDate={setDate}/>
        </div>

        {/* 3-Column Section */}
        <div className="flex w-full bg-[#CCCCCC] pt-2">
          <div className="w-[15%] flex items-center justify-center text-black">
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
          <div className="w-[70%] flex items-center justify-center text-black">
            {/* TopNav only makes sense on calendar views */}
            {['day', 'week', 'month'].includes(activePage) && (
              <TopNavWrapper activePage={activePage} setActivePage={setActivePage} />
            )}
            {'FAQ'===activePage && (<h1 className="faq-title">FAQ</h1>)}
          </div>
          <div className="w-[15%] flex items-center justify-center text-black">
            <PlusButton onClick={() => setModalOpen(true)} />
          </div>
        </div>
      </header>

      {/* ===== App-Level Modals ===== */}
      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onMenuItemClick={(title) => setActivePage(title as ViewType)}
      />
      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ===== Page Content ===== */}

      {renderPage()}
    </div>
  );
};
const TopNavWrapper: React.FC<{
  activePage: ViewType;
  setActivePage: (v: ViewType) => void;
}> = ({ activePage, setActivePage }) => (
  <TopNav activeView={activePage} onChangeView={setActivePage} />
);

export default App;
