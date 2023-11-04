import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../styles/Home.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useEffect } from "react";

import { QRCodePopup } from "./QRCodePopup";
import { URL } from "./Constants";

export const Home = () => {
  const [cities, setCities] = useState([]);

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const initialCenter = [45.8, 15.97]; //inicijalna pozicija karte
  const worldBounds = [
    [-90, -180], // Southwest coordinates (latitude, longitude)
    [90, 180], // Northeast coordinates (latitude, longitude)
  ];

  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7Cabcdef&chf=a,s,ee00FFFF",
    iconSize: [25, 30],
    iconAnchor: [12.5, 30],
  });

  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C2ecc71&chf=a,s,ee00FFFF",
    iconSize: [25, 30],
    iconAnchor: [12.5, 30],
  });

  const [activeIcon, setActiveIcon] = useState(blueIcon);
  const [inactiveIcon, setInactiveIcon] = useState(greenIcon);

  useEffect(() => {
    //request za dohvat gradova od usera
    const token = localStorage.getItem("token");
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
  }, []);

  console.log("Cities --> ");
  console.log(cities.data);
  if (cities.data !== undefined) {
    return (
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
              key={cityData.id}
              position={[cityData.city.latitude, cityData.city.longitude]}
              icon={cityData.status === "active" ? activeIcon : inactiveIcon}
              interactive={cityData.status === "active"}>
              <Popup>
                <QRCodePopup cityInfo={cityData.city} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
};
