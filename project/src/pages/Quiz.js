import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

function Quiz() {
    const questions = [
        { id: 1, text: "What is the capital of France?", options: ["Paris", "Berlin", "London", "Madrid"], correctAnswer: "Paris" },
        { id: 2, text: "Who wrote Romeo and Juliet?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"], correctAnswer: "Shakespeare" },
        { id: 3, text: "What is the capital of Croatia?", options: ["Zagreb", "Split", "Rijeka", "Osijek"], correctAnswer: "Zagreb" },
    ];

    const [questions1, setQuestions] = useState([]);    //change questions1 to questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        /*fetch("/", {     //change path
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
        }).then((res) => {
            if (res.status !== 200) {
            } else {
                res.json().then((data) => {
                    setQuestions(data);
                });
            }
        });*/

        const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        setSelectedAnswers(storedAnswers);
    }, []);

    const handleAnswer = (option) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [currentQuestionIndex + 1]: option,
        }));

        localStorage.setItem("answers", JSON.stringify({ ...selectedAnswers, [currentQuestionIndex + 1]: option }));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            //ovdje napravit post metodu da se posalju odgovori i onda sacekat response i tek onda navigate na home
            const requestBody = JSON.parse(localStorage.getItem("answers"));
            console.log(requestBody)
            /*fetch("/api/question", {
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
              });*/
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

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

export default Quiz;
