import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Question.css";
import { redirect, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert } from 'react-bootstrap'

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor((Math.random() * (i + 1)) % 4);
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

function Question() {
  const navigate = useNavigate();

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");

  const [value, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [taskSucces, setTaskSuccess] = useState(false);
  const [taskError, settaskError] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityName = searchParams.get("cityName");
  const cityId = searchParams.get("cityId");
  console.log(cityName);
  console.log(cityId);

  const token = localStorage.getItem("token");
  const handleClick = (event) => {
    event.preventDefault();
    const answer = event.target.value;
    setAnswer(answer);
    console.log(answer);

    const requestBody = {
      "city-id": cityId,
      answer: answer,
    };

    fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ requestBody }),
    }).then((res) => {
      if (res.status !== 200) {
      } else {
        res.json().then((data) => {
          console.log("Response data:", data.info);
          localStorage.setItem("quizToken", data.info);
          setPopupMsg(data.info);
          if(data.info === "Wrong answer! Please try again."){
            settaskError(true);
          }else{
            setTaskSuccess(true);
            setTimeout(() => {
              navigate("/home");
            }, 4000);
          }
        });
      }
    });
  };

  useEffect(() => {
    fetch(`/api/user/cities/question?cityName=${cityName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (res.status !== 200) {
      } else {
        res.json().then((data) => {
          const answers = data.question.offered_answers.split(";");
          console.log(answers);
          setQuestion(data.question.text);
          setQuestion1(answers[0]);
          setQuestion2(answers[1]);
          setQuestion3(answers[2]);
          setQuestion4(answers[3]);
        });
      }
    });
  });

  const questionForm = (
    <div className="container">
      <h1 className="title">Question</h1>
      <div className="question-text">{question}</div>
      <div className="inputs">
        <div className="button-container">
          <button
            className="answer-button"
            name="answer-button"
            onClick={handleClick}
            value={question1}>
            {question1}
          </button>
        </div>
        <div className="button-container">
          <button
            className="answer-button"
            name="answer-button"
            onClick={handleClick}
            value={question2}>
            {question2}
          </button>
        </div>
        <div className="button-container">
          <button
            className="answer-button"
            name="answer-button"
            onClick={handleClick}
            value={question3}>
            {question3}
          </button>
        </div>
        <div className="button-container">
          <button
            className="answer-button"
            name="answer-button"
            onClick={handleClick}
            value={question4}>
            {question4}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">{questionForm}</div>
      {taskSucces && 
        <div style={{ zIndex: 1 }}><Alert className="alert-dismissible fade show" variant={'success'}>{popupMsg}</Alert></div>}
      {taskError &&
        <div style={{ zIndex: 1 }}><Alert className="alert-dismissible fade show" variant={'danger'}>{popupMsg}</Alert></div>}
    </div>
  );
}

export default Question;
