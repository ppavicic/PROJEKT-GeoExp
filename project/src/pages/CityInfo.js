import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CityInfo.css";
import pandaznanja from "../Assets/panda_znanja.png";

function CityInfo() {
  /*const location = useLocation();

  const { cityData } = location.state || {};
  console.log(cityData);
  localStorage.setItem('city-id', JSON.stringify(cityData.city.id));
  */
  

  const navigate = useNavigate();
  function change_screen() {

    const first = document.getElementById("container1");
    const second = document.getElementById("container2");
    if (first !== null) {
      first.className = "nevidis";
      second.className = "container-desc";
    }
    const panda = document.getElementById("panda");
    panda.onclick = quiz_start;
  }

  const quiz_start = (event) => {
    /*localStorage.setItem('city-id', JSON.stringify(cityData.city.id));*/
    navigate("/quiz");
  };

  const description = (
    <div className="full-page">
      <div class="information">
        <div id="container1" class="container-desc">
          <div id="description">
            <h2>
              Dobro došli dragi učenici danas ćete naučiti nesšto novo o Zagrebu
            </h2>
            <p>
              Poškakljajte našu prekrasnu pandu klikom miša kako bi vam ona
              rekla nešto više o zagrebu
            </p>
          </div>
        </div>
        <div id="container2" class="nevidis">
          <div id="description">
            <p>
              Upute! U ovom prozoru vam se nalaze svi podatci o zagrebu uz
              pomoću kotačića na mišu možete ići dolje za dodatan tekst kada ste
              završili s čitanjem kliknite mišem na našu prekrasnu padnu kako
              biste pokrenuli kviz provjere znanja
            </p>
            <h2>Description</h2>
            <p>
              Zagreb je glavni grad Republike Hrvatske i najveći grad u
              Hrvatskoj po broju stanovnika. Grad Zagreb je kao glavni grad
              Hrvatske posebna teritorijalna, upravna i samoupravna jedinica.
              Šire područje grada okuplja više od milijun stanovnika. Povijesno
              gledajući, grad Zagreb izrastao je iz dvaju naselja na susjednim
              brežuljcima, Gradeca i Kaptola, koji čine jezgru današnjega grada,
              njegovo povijesno središte (Gornji i dio Donjega Grada). Nalazi se
              na jugozapadnomu rubu Panonske nizine na prosječnoj nadmorskoj
              visini od 122 m, podno južnih padina Medvednice, na lijevoj i
              desnoj obali rijeke Save. Položaj grada Zagreba, koji je na mjestu
              spajanja alpskog, dinarskog, jadranskog i panonskog područja,
              omogućio je Zagrebu postati most između srednjoeuropskoga i
              jadranskoga područja. Jedini je glavni grad u svijetu koji počinje
              na slovo Z. Uz Beč, jedini je europski glavni grad s vlastitom
              vinskom cestom (otvorena 2009.[3]) Također, jedini je europski
              glavni grad sa skijalištem. Prema popisu stanovništva iz 2021. u
              Zagrebu živi 767.131 stanovnika. Kao najveći i glavni grad, Zagreb
              je kulturno, znanstveno, gospodarsko i upravno središte Republike
              Hrvatske i Zagrebačke županije. Sjedište je Zagrebačke
              nadbiskupije. Zahvaljujući ulozi najvećega prometnoga središta u
              Hrvatskoj, razvijenoj industriji s dugom tradicijom i znanstvenim
              i istraživačkim ustanovama, Zagreb je gospodarski najrazvijeniji
              grad u Hrvatskoj.{" "}
            </p>
          </div>
          <div id="description">
            <h2>Description</h2>
            <p>
              Zagreb je glavni grad Republike Hrvatske i najveći grad u
              Hrvatskoj po broju stanovnika. Grad Zagreb je kao glavni grad
              Hrvatske posebna teritorijalna, upravna i samoupravna jedinica.
              Šire područje grada okuplja više od milijun stanovnika. Povijesno
              gledajući, grad Zagreb izrastao je iz dvaju naselja na susjednim
              brežuljcima, Gradeca i Kaptola, koji čine jezgru današnjega grada,
              njegovo povijesno središte (Gornji i dio Donjega Grada). Nalazi se
              na jugozapadnomu rubu Panonske nizine na prosječnoj nadmorskoj
              visini od 122 m, podno južnih padina Medvednice, na lijevoj i
              desnoj obali rijeke Save. Položaj grada Zagreba, koji je na mjestu
              spajanja alpskog, dinarskog, jadranskog i panonskog područja,
              omogućio je Zagrebu postati most između srednjoeuropskoga i
              jadranskoga područja. Jedini je glavni grad u svijetu koji počinje
              na slovo Z. Uz Beč, jedini je europski glavni grad s vlastitom
              vinskom cestom (otvorena 2009.[3]) Također, jedini je europski
              glavni grad sa skijalištem. Prema popisu stanovništva iz 2021. u
              Zagrebu živi 767.131 stanovnika. Kao najveći i glavni grad, Zagreb
              je kulturno, znanstveno, gospodarsko i upravno središte Republike
              Hrvatske i Zagrebačke županije. Sjedište je Zagrebačke
              nadbiskupije. Zahvaljujući ulozi najvećega prometnoga središta u
              Hrvatskoj, razvijenoj industriji s dugom tradicijom i znanstvenim
              i istraživačkim ustanovama, Zagreb je gospodarski najrazvijeniji
              grad u Hrvatskoj.{" "}
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          id="panda"
          className="panda-img"
          onClick={change_screen}
          src={pandaznanja}
        ></img>
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
