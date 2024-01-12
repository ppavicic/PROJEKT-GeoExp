import React, { useState } from "react";
import "../styles/Login.css";
import user from "../Assets/person.png";
import passwordimg from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import titleImg from "../Assets/title2.png";
import { URL } from "./Constants";

function Registration() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, password };
    console.log(user);
    fetch(`${URL}/api/users/register`, {
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
      <h1 className="myTitle">Registriraj se</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-text">Korisničko ime</div>
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
          <div className="input-text">Lozinka</div>
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
          <div className="show-pass-div">
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <div className="show-pass-text">Prikaži lozinku</div>
          </div>
        </div>
        <div className="button-container">
          <button className="button">Registracija</button>
        </div>
      </form>
      <div className="login-signup-link-container">
        <div className="show-pass-text">Već imate račun?</div>
        <a href="/">Login</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="mytitle-container">
        <img src={titleImg} alt="Title Image" className="mytitle-image"></img>
      </div>
      <div className="login-form">{registration_page}</div>
    </div>
  );
}

export default Registration;
