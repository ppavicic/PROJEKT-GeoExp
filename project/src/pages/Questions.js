import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Question.css";

import { useNavigate } from "react-router-dom";
function Question() {
  const navigate = useNavigate();
  const [value, setAnswer] = useState("");
 
  
  const  handleClick = (event) => {
    setAnswer(event.target.value);
    event.preventDefault();
    const answer = {value};
    console.log(answer);
    console.log(value);
    fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }).then((res) => {
      if (res.status !== 201) {
      } else {
        res.json().then((data) => {
          console.log("Response data:", data.session.token, data);
          localStorage.setItem("token", data.session.token);
          navigate("/home");
        });
      }
    });
  };

  const questionForm = (
    <div className="container">
      <h1 className="title">Question</h1>
        <div className="question-text">Glavni grad divrvatskeiuhshv adkjjashdjkashdkaj</div>
        <div className="inputs">
          <div className="button-container">
            <button className="answer-button" name="answer-button" onClick={handleClick} value={"question 1"}>Question 1</button>
          </div>
          <div className="button-container">
            <button className="answer-button" name="answer-button" onClick={handleClick} value={"question 2"}>Question 2</button>
          </div>
          <div className="button-container">
            <button className="answer-button" name="answer-button" onClick={handleClick} value={"question 3"}>Question 3</button>
          </div>
          <div className="button-container">
            <button className="answer-button" name="answer-button" onClick={handleClick} value={"question 4"}>Question 4</button>
          </div>
        </div>
    
      
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">{questionForm}</div>
    </div>
  );
}

export default Question;
