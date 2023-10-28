import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CityInfo.css';
import {URL} from './Constants';


export const CityInfo = () => {
    const [cityData, setCityData] = useState(null);
    const [pin, setPin] = useState('');
    const [pinGenerated, setPinGenerated] = useState(false);
    
    /*useEffect(() => {     //slanje zahtjeva na backend da dohvati podatke o gradu
        axios.get(URL)
            .then((response) => {
                setCityData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [cityId]);*/
  
    /*if (!cityData) {
      return <div>Loading...</div>;
    }*/

    const generateRandomPin = () => {       //ova funkcija ce mi trebat da posaljem zahtjev na backend i dobijem PIN i da sakrijem 
                                            //opis teksta kad ga dobijem
        /*axios.get(URL)
            .then((response) => {
                setData(response.data);
                setPinGenerated(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        });*/
        setPinGenerated(true);
    };

    return (
        <div className="city-info">
            <h1>ZAGREB</h1>
            {!pinGenerated && 
                <div>
                    <p className='opis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button onClick={generateRandomPin}>Generiraj PIN</button>
                </div>
            }
            {pinGenerated && 
                <div>
                    <p>Generirani PIN: {pin}</p>
                </div>
            }
        </div>
    );
};