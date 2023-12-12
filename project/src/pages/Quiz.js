import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
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

  const [questions, setQuestions] = useState([]); //change questions1 to questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cityId = localStorage.getItem("city-id");

  useEffect(() => {
    const requestBody = {
      city_id: cityId,
    };
    fetch(`/api/city/questions?city_id=${cityId}`, {
      //change path
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

    const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    setSelectedAnswers(storedAnswers);
  }, []);

  const handleAnswer = (option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [currentQuestionIndex + 1]: {
        id: currentQuestion.id,
        answer: option,
      },
    }));

    console.log(selectedAnswers);

    localStorage.setItem(
      "answers",
      JSON.stringify({ ...selectedAnswers, [currentQuestion.id]: option })
    );

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const requestBody = {
        city_id: cityId,
        questions: selectedAnswers,
      };
      console.log(requestBody);
      localStorage.removeItem("city-id");
      console.log(requestBody);
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
            console.log("Response data:", data.info);
            navigate("/home");
          });
        }
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion !== undefined) {
    return (
      <div className="">
        <Question
          id={currentQuestion.id}
          text={currentQuestion.text}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }
};
