import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Login.css";
import user from '../Assets/person.png'
import passwordimg from '../Assets/password.png'
function Registration() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

 

  const renderForm1 = (
    
    <div className="container">
      <h className="title">Sign up</h>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Type your username</div>
          <div className="input-container">
            <img className="login-icons" src={user}></img>
            <input type="text" placeholder="Type your username" name="uname" required />
            {renderErrorMessage("uname")}
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
                    placeholder="Type your password" name="pass" required />
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
          <a  href="/">Login</a>
      </div>
            
    </div>
    
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm1}
      </div>
    </div>
  );
}

export default Registration;