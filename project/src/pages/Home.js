import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import '../styles/Home.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import React, { useState, useEffect, useRef } from "react";
import {QRCodePopup} from './QRCodePopup';
import {URL} from './Constants';


export const Home = () => {
   const cityInfoUrl = 'http://localhost/cityinfo'; // Replace with the actual URL kad bude gotov backend

   const LeafIcon = L.Icon.extend({
      options: {}
   });
   const initialCenter = [45.8, 15.97]; //inicijalna pozicija karte i plavog markera
   const worldBounds = [
      [-90, -180], // Southwest coordinates (latitude, longitude)
      [90, 180],   // Northeast coordinates (latitude, longitude)
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
      iconSize: [25, 30]
   });

   const [iconA, setIconA] = useState(blueIcon);
   const [iconB, setIconB] = useState(greenIcon);
   const [pin, setPin] = useState('');

   const handlePinChange = (event) => {
      setPin(event.target.value);
   };

   return (
      <body>
         <div className="map-container">
            <MapContainer center={initialCenter} zoom={9} scrollWheelZoom={true} minZoom={3} maxBounds={worldBounds}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={initialCenter} icon={iconA} >
                  <Popup>
                     <QRCodePopup cityInfoUrl={cityInfoUrl} />
                     <label htmlFor="pin">PIN: </label>
                     <input type="text" id="pin" name="pin" placeholder="Enter PIN" value={pin} onClick={handlePinChange} />
                  </Popup>
               </Marker>
            </MapContainer>
         </div>
      </body>
   )
}
