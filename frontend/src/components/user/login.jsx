import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import login from "../services/loginService";
import "./login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const {
        token,
        userId,
        username: returnedUsername,
      } = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", returnedUsername);
      onLogin();
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/scribbleBackground.png"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>U</span>
              <span style={{ transitionDelay: "50ms" }}>s</span>
              <span style={{ transitionDelay: "100ms" }}>e</span>
              <span style={{ transitionDelay: "150ms" }}>r</span>
              <span style={{ transitionDelay: "200ms" }}>n</span>
              <span style={{ transitionDelay: "250ms" }}>a</span>
              <span style={{ transitionDelay: "300ms" }}>m</span>
              <span style={{ transitionDelay: "350ms" }}>e</span>
            </label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>P</span>
              <span style={{ transitionDelay: "50ms" }}>a</span>
              <span style={{ transitionDelay: "100ms" }}>s</span>
              <span style={{ transitionDelay: "150ms" }}>s</span>
              <span style={{ transitionDelay: "200ms" }}>w</span>
              <span style={{ transitionDelay: "250ms" }}>o</span>
              <span style={{ transitionDelay: "300ms" }}>r</span>
              <span style={{ transitionDelay: "350ms" }}>d</span>
            </label>
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;