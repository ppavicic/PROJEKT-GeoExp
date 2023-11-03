import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import '../styles/Home.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import React, { useState } from "react";
import {QRCodePopup} from './QRCodePopup';
import {URL} from './Constants';


export const Home = () => {
   const [cities, setCities] = useState([]);

   const LeafIcon = L.Icon.extend({
      options: {}
   });
   
   const initialCenter = [45.8, 15.97]; //inicijalna pozicija karte
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
      iconSize: [25, 30],
      iconAnchor: [12.5, 30]
   });

   const [activeIcon, setActiveIcon] = useState(blueIcon);
   const [inactiveIcon, setInactiveIcon] = useState(greenIcon);

   const podaci = {
      "data": [
        {
          "id": 1,
          "city": {
            "id": 1,
            "description": "Zagreb je glavni grad Hrvatske",
            "latitude": 45.8144,
            "longitude": 15.978,
            "name": "Zagreb",
          },
          "status": "active",
        }, 
        { 
         "id": 2,
        "city": {
          "id": 2,
          "description": "Split je drugi najveci grad Hrvatske",
          "latitude": 43.508133,
          "longitude": 16.440193,
          "name": "Split",
        },
        "status": "inactive",}
      ]
   };
   
   /*useEffect(() => {     //request za dohvat gradova od usera
      const fetchCities = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/cities', { // Replace user with actual user
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
               },);
            
            if (response.ok) {
               const data = await response.json();
               setCities(data);
            } else {
               console.error('Failed to fetch data from the API');
            }
         } catch (error) {
            console.error('Error while fetching data:', error);
         }
      };
  
      fetchCities();
    }, []);*/

   return (
         <div className="map-container">
            <MapContainer center={initialCenter} zoom={9} scrollWheelZoom={true} minZoom={3} maxBounds={worldBounds}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />

               {podaci.data.map(cityData => (
                     <Marker key={cityData.id} position={[cityData.city.latitude, cityData.city.longitude]} 
                        icon={cityData.status === 'active' ? activeIcon : inactiveIcon}>
                        <Popup>
                           <QRCodePopup cityInfo={cityData.city} />
                        </Popup>
                     </Marker>
               ))}
            </MapContainer>
         </div>
   )
}
