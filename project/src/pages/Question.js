import React, { useState } from "react";
import "../styles/question.css";

function Question({ id, text, options, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        setTimeout(() => {
            onAnswer(option);
        }, 1000);
    };

    const questionForm = (
        <div className="container">
            <div className="question-text">{id}. {text}</div>
            <div className="inputs">
                {options.map((option, index) => (
                    <div key={index} className={`button-container ${selectedOption === option ? 'selected' : ''}`}>
                        <button className="answer-button"
                            style={{ backgroundColor: selectedOption === option ? '#286090' : '' }}
                            onClick={() => handleOptionSelect(option)}>
                            {option}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="app">
            <div className="login-form">{questionForm}</div>
        </div>
    );
}

export default Question;
