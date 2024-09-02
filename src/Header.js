import React from 'react';
import './Header.css';

function Header({setActiveView}) {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setActiveView('login');
  };

   return (
    <header className="header">
      <nav className="header-nav">
        <ul className="nav-items">
          <li><button onClick={() => setActiveView('home')} className="nav-link">Home</button></li>
          <li><button onClick={() => setActiveView('people-manager')} className="nav-link">People Manager</button></li>
          <li><button onClick={() => setActiveView('meeting-scheduler')} className="nav-link">Meeting Scheduler</button></li>
        </ul>
        <div className="header-logout">
          <button onClick={handleLogout} className="nav-link">Logout</button>
        </div>
      </nav>
    </header>
  );

  // return (
  //   <header className="header">
  //     <nav className="header-nav">
  //       <ul className="nav-items">
  //         <li><Link to="/home">Home</Link></li>
  //         <li><Link to="/people-manager">People Manager</Link></li>
  //         <li><Link to="/meeting-scheduler">Meeting Scheduler</Link></li>
  //       </ul>
  //       <div className="header-logout">
  //         <Link to="/" onClick={() => sessionStorage.removeItem('token')}>Logout</Link>
  //       </div>
  //     </nav>
  //   </header>
  // );
}

export default Header;