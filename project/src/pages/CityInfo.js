import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/CityInfo.css";
import pandaznanja from "../Assets/panda_znanja.png";

function CityInfo() {
  const location = useLocation();
  const { cityData } = location.state || {};

  useEffect(() => {
    localStorage.setItem("city-id", JSON.stringify(cityData.id));
  }, [cityData.id]);

  const navigate = useNavigate();

  const quizStartHandler = () => {
    navigate("/quiz");
  };

  const renderDescription = () => (
    <div className="full-page">
      <div className="information">
        <div className="container-desc">
          <header>
            <h1 className="city-title">{cityData.name}</h1>
          </header>
          <div className="row">
            <div className="leftcolumn">
              <div className="details">
                <h2 className="section-title">Opis</h2>
              </div>
              <p>{cityData.description.text}</p>
            </div>
            <div className="rightcolumn1">
              <div className="details">
                <h2 className="section-title">Zanimljivosti</h2>
              </div>
              <p>{cityData.trivia.value}</p>
            </div>
            <div className="rightcolumn">
              <div className="details">
                <h2 className="section-title">Link</h2>
              </div>
              <a href={cityData.link.link} className="more-info-link">
                Više informacija
              </a>
            </div>
          </div>
          <footer>
            <button onClick={quizStartHandler} className="quiz-start">
              Pokreni kviz
            </button>
          </footer>
        </div>
      </div>
      <div>
        <img id="panda" className="panda-img" src={pandaznanja} alt="Panda"></img>
      </div>
    </div>
  );

  return <div>{renderDescription()}</div>;
}

export default CityInfo;
