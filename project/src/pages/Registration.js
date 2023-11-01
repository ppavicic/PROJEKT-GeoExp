import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Login.css";
import user from '../Assets/person.png'
import passwordimg from '../Assets/password.png'
import { Navigate } from "react-router-dom";

function Registration() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, password }
    console.log(name);
    fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then((res) => {
      if (res.status !== 200) {
        console.log(res);
      } else {
        console.log("New Igrac added")
        Navigate('/');

      }
    })
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );



  const renderForm1 = (

    <div className="container">
      <h1 className="title">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Type your username</div>
          <div className="input-container">
            <img className="login-icons" src={user}></img>
            <input type="text" placeholder="Type your username" onChange={(e) => setName(e.target.value)} name="name" required />

          </div>
          <div className="input-text">Type your password</div>
          <div className="input-container">
            <img className="login-icons" src={passwordimg}></img>
            <input id="pass" type={
              showPassword ? "text" : "password"
            }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Type your password" name="password" required />
            {renderErrorMessage("pass")}

          </div>
          <div>
            <input id="check"
              type="checkbox"
              value={showPassword}
              onChange={() =>
                setShowPassword((prev) => !prev)
              } />
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
      <div className="login-form">
        {renderForm1}
      </div>
    </div>
  );
}

export default Registration;