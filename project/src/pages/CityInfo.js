import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/CityInfo.css';
import {URL} from './Constants';


export const CityInfo = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const cityName = searchParams.get('cityName');
    const cityDescription = searchParams.get('cityDescription');
    const encodedPin = searchParams.get('pin');
    const pin = atob(decodeURIComponent(encodedPin));

    const [pinGenerated, setPinGenerated] = useState(false);

    const generateRandomPin = () => {        
        setPinGenerated(true);
    };
    console.log(pin, encodedPin)

    return (
        <div className="city-info">
            <h1>{cityName}</h1>
            {!pinGenerated && 
                <div>
                    <p className='opis'> {cityDescription}</p>
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