import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Home.css";

const Home: React.FC = () => {
  const { loggedInUser: user, error } = useSelector((state: RootState) => state.user);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-container">
      <main>
        <h1>
          Welcome, {user.firstName} {user.lastName}!
        </h1>
        <p>Date of Birth: {new Date(user.birthDate!).toLocaleDateString()}</p>
        <p>Position: {user.position}</p>
        <p>Roles: {user.roleNames!.join(", ")}</p>
      </main>
    </div>
  );
};

export default Home;
