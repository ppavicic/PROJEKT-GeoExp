import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../styles/ProfilePage.css";
import pandaImg from "../Assets/pandaProfilePage.png";
import goldImg from "../Assets/Gold.png";
import silverImg from "../Assets/silver.png";
import bronzeImg from "../Assets/bronze.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";



export const ProfilePage = () => {
   document.body.style.backgroundColor = '#white';
   var username = localStorage.getItem("user");
   const navigate = useNavigate();
   var [points, setPoints] = useState("");
   const token = localStorage.getItem("token");

   const goToHomePage = () => {
      navigate('/home');
   };

   let trophy = null;

   if (points.points >= 100) {
      trophy = <img src={goldImg} alt="Gold Trophy" />;
   } else if (points.points >= 50 && points.points < 100) {
      trophy = <img src={silverImg} alt="Silver Trophy" />;
   } else if (points.points >= 3 && points.points < 50) {
      trophy = <img src={bronzeImg} alt="Bronze Trophy" />;
   }

   const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
   };


   useEffect(() => {
      fetch("/api/user/points", {
         method: "GET",
         headers: {
            Authorization: `${token}`, // Include the token in the Authorization header
         },
      }).then((res) => {
         if (res.status !== 200) {
         } else {
            res.json().then((data) => {
               setPoints(data);
               console.log(points);
            });
         }
      });
   }, []);
   return (

      <div className="containerProfile mt-4 mb-4 p-3 d-flex justify-content-center">
         <div className="card p-4">
            <div className="profileContent">
               <div className=" image d-flex flex-column justify-content-center align-items-center">
                  <button className="btn btn-secondary">
                     <img src={pandaImg} height="100" width="120" />
                  </button>
                  <div>
                     <span className="name mt-3">{username}</span>
                  </div>
                  {/*<span className="idd">@eleanorpena</span>*/}

                  <div className="rankAndPoints">
                     {/*<div className="d-flex flex-row justify-content-center align-items-center">
                        <span className="follow">Rang: </span>
                        <span className="number">1/100</span>
   </div>*/}
                     <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="follow">Bodovi: </span>
                        <span className="number">{points.points}/{points.max_points}</span>
                     </div>
                  </div>
                  <div>
                     {trophy && <div className="trophyImg">{trophy}</div>}
                  </div>

               </div>
            </div>
         </div>
         <button className="btn2 btn-dark" onClick={goToHomePage}>Glavna stranica</button>
         <button className="btn2 btn-dark" onClick={handleLogout}> Odjavi se </button>
      </div >
   );
};
