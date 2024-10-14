import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
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
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <Button 
        appearance="primary" 
        onClick={handleNavigation}
        className="not-found-button"
      >
        {loggedInUser ? "Go to Home" : "Go to Login"}
      </Button>
    </div>
  );
};

export default NotFoundPage;
