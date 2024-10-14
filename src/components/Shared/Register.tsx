import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { Input, Label } from "@fluentui/react-components";
import { registerUser } from "../../redux/userSlice";
import { SerializedError } from '@reduxjs/toolkit';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirmation Password:", confirmationPassword);
    console.log("Token:", token);

    try {
      const result = await dispatch(
        registerUser({ email, password, confirmPassword: confirmationPassword, token })
      ).unwrap();
      console.log("Registration result:", result);
      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === 'string') return <p className="error">{error}</p>;
    if (typeof error === 'object' && error !== null) {
      const serializedError = error as SerializedError;
      return (
        <div className="error">
          <p>{serializedError.message || 'An error occurred'}</p>
          {serializedError.stack && <p>{serializedError.stack}</p>}
        </div>
      );
    }
    return <p className="error">An unknown error occurred</p>;
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid black",
            }}
          />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid black",
            }}
          />
        </div>
        <div>
          <Label htmlFor="confirmationPassword">Confirmation Password:</Label>
          <Input
            id="confirmationPassword"
            type="password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid black",
            }}
          />
        </div>
        {renderError()}
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
