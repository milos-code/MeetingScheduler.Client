import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { persistor, RootState } from "../../redux/store";
import { authService } from "../../services/authService";
import "./Header.css";

const Header: React.FC = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.user);
  const userRole = loggedInUser?.roleNames?.[0] || "";

  const handleLogout = () => {
    authService.clearTokens();
    persistor.purge();
  };

  const renderNavLinks = () => {
    switch (userRole) {
      case "Admin":
        return (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/meetingRoomAdministration">Meeting rooms</Link>
            </li>
            <li>
              <Link to="/userAdministration">Users</Link>
            </li>
          </>
        );
      case "PeopleManager":
        return (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
          </>
        );
      case "Employee":
        return (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="nav-items">{renderNavLinks()}</ul>
        <div className="header-logout">
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
