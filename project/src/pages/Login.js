import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Login.css";
import user from "../Assets/person.png";
import passwordimg from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
function Login() {
  // React States
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const session = { name, password };
    console.log(session);
    fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session }),
    }).then((res) => {
      if (res.status !== 201) {
      } else {
        res.json().then((data) => {
          console.log("Response data:", data.session.token, data);
          localStorage.setItem("token", data.session.token);
          localStorage.setItem("user", data.session.user.name);
          navigate("/home");
        });
      }
    });
  };

  // JSX code for login form
  const renderForm = (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Username</div>
          <div className="input-container">
            <img className="login-icons" src={user}></img>
            <input
              type="text"
              placeholder="Type your username"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-text">Password</div>
          <div className="input-container">
            <img className="login-icons" src={passwordimg}></img>
            <input
              type="password"
              placeholder="Type your password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="button-container">
          <button className="button">Login</button>
        </div>
      </form>
      <div className="signup-link-container">
        <div className="show-pass-text">Doesn't have account?</div>
        <a href="/registration">Create account</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">{renderForm}</div>
    </div>
  );
}

export default Login;
