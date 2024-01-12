import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CityInfo.css";
import pandaznanja from "../Assets/panda_znanja.png";
import pandaznanjabezoblacica from "../Assets/panda_znanja_bez_oblacica.png";

import { useLocation } from "react-router-dom";

function CityInfo() {
  const location = useLocation();

  const { cityData } = location.state || {};
  console.log(cityData);
  localStorage.setItem("city-id", JSON.stringify(cityData.id));
  const navigate = useNavigate();

  const quiz_start = (event) => {
    navigate("/quiz");
  };

  const description = (
    <div className="full-page">
      <div class="information">
        <div id="container1" className="container-desc">
          <header>
            <h1>{cityData.name}</h1>
          </header>
          <div className="row">
            <div id="data" className="leftcolumn">
              <div className="details">
                <h2>Description</h2>
              </div>
              <p>{cityData.description.text}</p>
            </div>
            <div id="data" className="rightcolumn1">
              <div className="details">
                <h2>Trivia</h2>
              </div>
              <p>{cityData.trivia.value}</p>
            </div>
            <div id="data" className="rightcolumn">
              <div className="details">
                <h2>Link</h2>
              </div>
              <a href={cityData.link.link}>Više informacija</a>
            </div>
          </div>

          <footer>
            <button onClick={quiz_start} className="quiz-start">
              Pokreni kviz
            </button>
          </footer>
        </div>
      </div>

      <div>
        <img id="panda" className="panda-img" src={pandaznanja}></img>
      </div>
    </div>
  );

  return <div>{description}</div>;
}
export default CityInfo;
