import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/userSlice";
import { Button } from "@fluentui/react-components";
import { AppDispatch } from "../../redux/store";
import "./AdminCreateUser.css";

interface AdminCreateUserProps {
  closePopup: () => void;
}

const AdminCreateUser: React.FC<AdminCreateUserProps> = ({ closePopup }) => {
  const dispatch: AppDispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");

  const handleCreateUser = () => {
    dispatch(createUser({ firstName, lastName, email, role, position }))
      .unwrap()
      .then(() => {
        console.log(`User created successfully`);
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
      })
      .catch((error) => {
        console.error(`Failed to create user:`, error);
      });
  };

  return (
    <div className="admin-create-user">
      <h2>Create User</h2>
      <div className="create-user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Position</label>
          <input
            id="position"
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={closePopup} className="exit-popup-button">
            Exit
          </button>
          <button
            onClick={handleCreateUser}
            className="create-user-button"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;
