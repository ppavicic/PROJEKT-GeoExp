import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './Home.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import React, { useState, useEffect, useRef } from "react";




export const Home = () => {

   const LeafIcon = L.Icon.extend({
      options: {}
   });
   const greenIcon = new LeafIcon({
      iconUrl:
         "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C2ecc71&chf=a,s,ee00FFFF"
   });

   const blueIcon = new LeafIcon({
      iconUrl:
         "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7Cabcdef&chf=a,s,ee00FFFF"
   });
   const [iconB, setIconB] = useState(blueIcon);
   const [iconG, setIconG] = useState(greenIcon);
   return (
      <body>
         <div className="map-container">
            <MapContainer center={[45.8, 15.97]} zoom={9} scrollWheelZoom={true} >
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={[45.8, 15.97]} icon={iconB}>
                  <Popup>
                     A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
               </Marker>
            </MapContainer>
         </div>
      </body>

   )
}
