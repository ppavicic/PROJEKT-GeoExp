import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.css";
import user from "../Assets/person.png";
import passwordimg from "../Assets/password.png";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, password };
    console.log(user);
    fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    }).then((res) => {
      if (res.status !== 201) {
        console.log(res);
      } else {
        console.log("New Igrac added");
        navigate("/");
      }
    });
  };

  const registration_page = (
    <div className="container">
      <h1 className="title">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Type your username</div>
          <div className="input-container">
            <img className="login-icons" src={user}></img>
            <input
              type="text"
              placeholder="Type your username"
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
            />
          </div>
          <div className="input-text">Type your password</div>
          <div className="input-container">
            <img className="login-icons" src={passwordimg}></img>
            <input
              id="pass"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Type your password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <h className="show-pass-text">Show password</h>
          </div>
        </div>
        <div className="button-container">
          <button className="button">Sign in</button>
        </div>
      </form>
      <div className="signup-link-container">
        <div className="show-pass-text">Already have account?</div>
        <a href="/">Login</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">{registration_page}</div>
    </div>
  );
}

export default Registration;
