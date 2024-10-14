import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./NotAuthorizedPage.css";

const NotAuthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const handleNavigation = () => {
    if (loggedInUser) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="not-authorized-container">
      <h1 className="not-authorized-title">401</h1>
      <p className="not-authorized-message">Not Authorized</p>
      <Button 
        appearance="primary" 
        onClick={handleNavigation}
        className="not-authorized-button"
      >
        {loggedInUser ? "Go to Home" : "Go to Login"}
      </Button>
    </div>
  );
};

export default NotAuthorizedPage;
