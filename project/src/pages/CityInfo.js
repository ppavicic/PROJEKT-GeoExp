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

  /* function change_screen() {
    const first = document.getElementById("container1");
    const second = document.getElementById("container2");
    if (first !== null) {
      first.className = "nevidis";
      second.className = "container-desc";
    }
    const panda = document.getElementById("panda");
    panda.onclick = quiz_start;
  }*/
  function show_background() {
    const first = document.getElementById("container1");
    const slika = document.getElementById("panda");

    if ((first !== null) & (first.className === "container-desc")) {
      first.className = "nevidis";
      slika.src = pandaznanjabezoblacica;
    } else {
      first.className = "container-desc";
      slika.src = pandaznanja;
    }
  }

  const quiz_start = (event) => {
    navigate("/quiz");
  };

  /*<div id="container1" class="container-desc">
          <div id="description">
            <h2>
              Dobro došli dragi učenici danas ćete naučiti nesšto novo o Zagrebu
            </h2>
            <p>
              Poškakljajte našu prekrasnu pandu klikom miša kako bi vam ona
              rekla nešto više o zagrebu
            </p>
          </div>
        </div>*/

  const description = (
    <div className="full-page">
      <div class="information">
        <div id="container1" class="container-desc">
          <h1>{cityData.name}</h1>
          <div id="data">
            <h2>Description</h2>
            <p>{cityData.description.text}</p>
          </div>
          <div id="data">
            <h2>Trivia</h2>
            <p>{cityData.trivia.value}</p>
          </div>
          <div id="data">
            <h2>Link</h2>
            <a href={cityData.link.link}>Više informacija</a>
          </div>
          <div>
            <button onClick={quiz_start} className="quiz-start">
              Pokreni kviz
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          id="panda"
          className="panda-img"
          onClick={show_background}
          src={pandaznanja}></img>
      </div>
    </div>
  );
  /*const searchParams = new URLSearchParams(location.search);
  const cityName = searchParams.get("cityName");
  //const cityDescription = searchParams.get('cityDescription');
  const encodedPin = searchParams.get("pin");
  const pin = atob(decodeURIComponent(encodedPin));

  const [pinGenerated, setPinGenerated] = useState(false);
  const [cityDescription, setCityDescription] = useState("");*/

  /*useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/city/description?city-name=${cityName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCityDescription(data.description);
      })
      .catch((error) => {
        console.error("Greška:", error);
      });
  }, [cityName]);

  const generateRandomPin = () => {
    setPinGenerated(true);
  };
  console.log(pin, encodedPin);*/

  return <div>{description}</div>;
}
export default CityInfo;
