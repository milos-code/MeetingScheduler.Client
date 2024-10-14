import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Home from "./Shared/Home";
import PeopleManager from "./PeopleManager/PeopleManager";
import MeetingCalendar from "./Calendar/MeetingCalendar";
import MeetingRoomAdministration from "./Admin/MeetingRoomAdministration";
import UserAdministration from "./Admin/UserAdministration";
import Header from "./Shared/Header";
import NotFoundPage from "./Shared/NotFoundPage";
import NotAuthorizedPage from "./Shared/NotAuthorizedPage";
import Register from "./Shared/Register";
import Login from "./Shared/Login";

const App: React.FC = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.user);
  const userRole = loggedInUser?.roleNames?.[0] || "";

  const ProtectedRoute = ({ element, allowedRoles }: { element: React.ReactNode, allowedRoles: string[] }) => {
    if (!loggedInUser) {
      return <Navigate to="/" replace />;
    }
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/not-authorized" replace />;
    }
    return <>{element}</>;
  };

  return (
    <Router>
      {loggedInUser && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} allowedRoles={["Admin", "PeopleManager", "Employee"]} />} />
        <Route path="/meetingRoomAdministration" element={<ProtectedRoute element={<MeetingRoomAdministration />} allowedRoles={["Admin"]} />} />
        <Route path="/userAdministration" element={<ProtectedRoute element={<UserAdministration />} allowedRoles={["Admin"]} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<PeopleManager />} allowedRoles={["PeopleManager"]} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<MeetingCalendar />} allowedRoles={["PeopleManager", "Employee"]} />} />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
