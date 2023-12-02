import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../styles/ProfilePage.css";
import pandaImg from "../Assets/pandaProfilePage.png";
import goldImg from "../Assets/Gold.png";
import silverImg from "../Assets/silver.png";
import bronzeImg from "../Assets/bronze.png";
import { useNavigate } from "react-router-dom";



export const ProfilePage = () => {
   document.body.style.backgroundColor = '#white';
   var points = 11;
   var username = localStorage.getItem("user");
   const navigate = useNavigate();

   const goToHomePage = () => {
      navigate('/home');
   };

   let trophy = null;

   if (points >= 100) {
      trophy = <img src={goldImg} alt="Gold Trophy" />;
   } else if (points >= 50 && points < 100) {
      trophy = <img src={silverImg} alt="Silver Trophy" />;
   } else if (points > 10 && points < 50) {
      trophy = <img src={bronzeImg} alt="Bronze Trophy" />;
   }

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
                  <span className="idd">@eleanorpena</span>

                  <div className="rankAndPoints">
                     <div className="d-flex flex-row justify-content-center align-items-center">
                        <span className="follow">Rang: </span>
                        <span className="number">1/100</span>
                     </div>
                     <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="follow">Bodovi: </span>
                        <span className="number">{points}</span>
                     </div>
                  </div>
                  <div>
                     {trophy && <div className="trophyImg">{trophy}</div>}
                  </div>

               </div>
            </div>
         </div>
         <button className="btn2 btn-dark" onClick={goToHomePage}>Glavna stranica</button>
      </div >
   );
};
