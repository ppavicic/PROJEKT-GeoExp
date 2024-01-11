import React, { useState } from "react";
import "../styles/Question.css";
import pandaImg from "../Assets/panda-quiz.png";

function Question({ id, text, options, onAnswer }) {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        setTimeout(() => {
            onAnswer(option);
        }, 1000);
    };

    const questionForm = (
        <div>
            <div className="containerQuestion">
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

        </div>
    )

    return (
        <div className="app-question">
            <div>
                <div className="image-container-Panda-quiz">
                    <img src={pandaImg} alt="Panda pic" className="PandaPic-quiz" />
                </div>
            </div>
            <div className="login-form-Question">{questionForm}</div>
        </div>
    );
}

export default Question;
