import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Login.css";
import user from "../Assets/person.png";
import passwordimg from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const session = { name, password };
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

  const login_page = (
    <div className="container">
      <h1 className="title">Prijavi se</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Korisničko ime</div>
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
          <div className="input-text">Lozinka</div>
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
          <button className="button">Prijava</button>
        </div>
      </form>
      <div className="signup-link-container">
        <div className="show-pass-text">Novi korisnik?</div>
        <a href="/registration">Kreiraj</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">{login_page}</div>
    </div>
  );
}

export default Login;
