import React from "react";
import "./PeopleManager.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ManagedEmployees from "./ManagedEmployees";
import FreeEmployees from "./FreeEmployees";

const PeopleManager: React.FC = () => {
  const { employees, managedEmployees, loading, error } = useSelector(
    (state: RootState) => state.employees
  );

  const token = sessionStorage.getItem("token") || "";

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="people-manager-container">
      <div className="free-employees-wrapper">
        <FreeEmployees
          employees={employees}
          token={token}
        />
      </div>
      <div className="managed-employees-wrapper">
        <ManagedEmployees managedEmployees={managedEmployees} token={token} />
      </div>
    </div>
  );
};

export default PeopleManager;
