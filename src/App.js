import React, {useState} from 'react';
import Login from './Login';
import Home from './Home';
import PeopleManager from './PeopleManager';
import MeetingScheduler from './MeetingScheduler';
import Header from './Header';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('login');

  const renderActiveView = () => {
    switch (activeView){
      case 'home':
        return <Home setActiveView={setActiveView} />;
      case 'people-manager':
        return <PeopleManager setActiveView={setActiveView} />;
      case 'meeting-scheduler':
        return <MeetingScheduler setActiveView={setActiveView} />;
      default:
        return <Login setActiveView={setActiveView} />;
    }
  };

  return (
    <div>
      {activeView !== 'login' && <Header setActiveView={setActiveView} />}
      {renderActiveView()}
    </div>
  );

  // return (
  //   <Router>
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/home" element={<Home />} />
  //       <Route path="/people-manager" element={<PeopleManager />}/>
  //       <Route path="/meeting-scheduler" element={<MeetingScheduler />} />
  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
