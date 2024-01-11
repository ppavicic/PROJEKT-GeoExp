import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../styles/Home.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodePopup } from "./QRCodePopup";
import { URL } from "./Constants";
import { StamenTileLayer } from "leaflet";
import pandaImg from "../Assets/panda7.png";
import titleImg from "../Assets/title2.png";
import suitcaseImg from "../Assets/suitcase.png";
import ticketImg from "../Assets/ticket.png";
import profileImg from "../Assets/profilePic.png";
import signImg from "../Assets/sign.png";
import starImg from "../Assets/star.png";
import sadFaceImg from "../Assets/sadFace.png";
import { Link } from "react-router-dom";
import redIcon from "../Assets/redIcon.png";

export const Home = () => {
  document.body.style.backgroundColor = "#f0f0f0";
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [userName, setUsername] = useState("");

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const initialCenter = [45.8, 15.97]; //inicijalna pozicija karte
  const worldBounds = [
    [-90, -180], // Southwest coordinates (latitude, longitude)
    [90, 180], // Northeast coordinates (latitude, longitude)
  ];

  const greenIcon = new LeafIcon({
    iconUrl: require("../Assets/greenIcon.png"),
    iconSize: [25, 35],
    iconAnchor: [12.5, 30],
  });

  const redIcon = new LeafIcon({
    iconUrl: require("../Assets/redIcon.png"),
    iconSize: [25, 35],
    iconAnchor: [12.5, 30],
  });

  const [activeIcon, setActiveIcon] = useState(greenIcon);
  const [inactiveIcon, setInactiveIcon] = useState(redIcon);

  const token = localStorage.getItem("token");
  useEffect(() => {
    //request za dohvat gradova od usera
    const userName = localStorage.getItem("user");
    setUsername(userName);

    fetch("/api/user/cities", {
      method: "GET",
      headers: {
        Authorization: `${token}`, // Include the token in the Authorization header
      },
    }).then((res) => {
      if (res.status !== 200) {
      } else {
        res.json().then((data) => {
          setCities(data);
        });
      }
    });

    const quizToken = localStorage.getItem("quizToken"); //ovo mozda bude trebalo izbrisat
    if (quizToken) {
      setTimeout(() => {
        window.alert(quizToken);
      }, 300);
      localStorage.removeItem("quizToken");
    }
  }, []);


  const calculateStars = (points) => {
    const stars = [];
    console.log(points);
    if (points == 0) {
      return (
        <div className="sadFace">
          <div>Nema točnih odgovora </div>
          <img src={sadFaceImg} alt="sad" />
        </div>
      );
    }
    for (let i = 0; i < points; i++) {
      stars.push(<img key={i} src={starImg} alt="Star" />);
    }

    return stars;
  };

  if (cities.data !== undefined) {
    return (
      <div>
        <div className="title-container">
          <img src={titleImg} alt="Title Image" className="title-image"></img>
        </div>

        <div className="bigContainer">
          <div className="map-container">
            <MapContainer
              center={initialCenter}
              zoom={9}
              scrollWheelZoom={true}
              minZoom={3}
              maxBounds={worldBounds}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {cities.data.map((cityData) => (
                <Marker
                  key={cityData.city.id}
                  position={[cityData.city.latitude, cityData.city.longitude]}
                  icon={
                    cityData.status === "active" ? activeIcon : inactiveIcon
                  }>
                  <Popup>
                    <div>
                      {cityData.status === "active" && (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/cityInfo/${cityData.city.name}`}
                          state={{ cityData: cityData.city }} // Pass cityData to CityInfo
                        >
                          <div>
                            <h2 style={{ color: 'black', textAlign: 'center' }}>Informacije o gradu</h2>
                            <h4 style={{ color: 'gray', textAlign: 'center' }}>Klikom na gumb možete saznati zanimljivosti o gradu {cityData.city.name},
                              a nakon toga odigrati kviz!</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <button style={{ textAlign: 'center' }} className="button-87">Kliknite za dalje</button>
                            </div>
                          </div>

                        </Link>
                      )}
                    </div>
                    <div>
                      {cityData.status === "inactive" && (
                        <div className="stars-container">
                          {calculateStars(cityData.score)}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="image-container-Panda">
            <img src={pandaImg} alt="Panda pic" className="PandaPic" />
          </div>
          <div className="image-container-Suitcase">
            <img src={suitcaseImg} alt="Suitcase pic" className="suitcasePic" />
          </div>

          <div className="image-container-Ticket">
            <img src={ticketImg} alt="Ticket pic" className="ticketPic" />
          </div>

          <div className="image-container-ProfilePic">
            <Link to="/profile">
              <img src={profileImg} alt="Profile pic" className="profilePic" />
            </Link>
          </div>
          <div className="image-container-Sign">
            <img src={signImg} alt="Sign pic" className="signPic" />
          </div>
        </div>
      </div>
    );
  }
};
