import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Login.css";
import user from '../Assets/person.png'
import passwordimg from '../Assets/password.png'
import { Navigate } from "react-router-dom";
function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const session = { name, password }
    fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session)
    }).then((res) => {
      if (res.status !== 200) {
      } else {
        Navigate('/home');

      }
    })
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (

    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Username</div>
          <div className="input-container">
            <img className="login-icons" src={user}></img>
            <input type="text" placeholder="Type your username" name="name" required onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-text">Password</div>
          <div className="input-container">
            <img className="login-icons" src={passwordimg}></img>
            <input type="password" placeholder="Type your password" name="pass" required />
            {renderErrorMessage("pass")}
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
      <div className="login-form">
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;