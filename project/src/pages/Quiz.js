import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  document.body.style.backgroundColor = "#f0f0f0";
  //   const questions = [
  //     {
  //       id: 1,
  //       text: "What is the capital of France?",
  //       options: ["Paris", "Berlin", "London", "Madrid"],
  //       correctAnswer: "Paris",
  //     },
  //     {
  //       id: 2,
  //       text: "Who wrote Romeo and Juliet?",
  //       options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
  //       correctAnswer: "Shakespeare",
  //     },
  //     {
  //       id: 3,
  //       text: "What is the capital of Croatia?",
  //       options: ["Zagreb", "Split", "Rijeka", "Osijek"],
  //       correctAnswer: "Zagreb",
  //     },
  //   ];

  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cityId = localStorage.getItem("city-id");
  const [initial, setInitial] = useState([true]);

  useEffect(() => {
    fetch(`/api/city/questions?city_id=${cityId}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (res.status !== 200) {
      } else {
        res.json().then((data) => {
          console.log(data);
          setQuestions(data);
        });
      }
    });
  }, []);

  const handleAnswer = (option) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = {
        ...prevSelectedAnswers,
        [currentQuestionIndex + 1]: {
          id: currentQuestion.id,
          answer: option,
        },
      };

      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const submitAnswers = () => {
    const savedAnswers = localStorage.getItem("answers");
    const requestBody = {
      city_id: cityId,
      questions: Object.values(JSON.parse(savedAnswers)),
    };
    console.log(requestBody);
    localStorage.removeItem("city-id");
    localStorage.removeItem("answers");

    fetch("/api/submit", {
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
          console.log("Response data:", data);
          navigate("/home");
        });
      }
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const shuffle = (array) => { 
    return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}; 
  if (currentQuestion !== undefined) {
    return (
      <div className="">
        <Question
          id={currentQuestion.id}
          text={currentQuestion.text}
          options={shuffle(currentQuestion.options)}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }
};
