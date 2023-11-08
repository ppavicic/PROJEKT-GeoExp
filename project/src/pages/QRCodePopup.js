import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import '../styles/Popup.css';

function generateRandomPIN(length) {
  const digits = '0123456789';
  let pin = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    pin += digits.charAt(randomIndex);
  }

  return pin;

}

export const QRCodePopup = ({ cityInfo }) => {
  const [enteredPIN, setEnteredPin] = useState('');
  const [pin, setPIN] = useState('');

  useEffect(() => {
    const pin = generateRandomPIN(4);
    setPIN(pin);
  }, []);

  const encodedPin = encodeURIComponent(btoa(pin));
  console.log(pin, encodedPin)

  const queryParams = new URLSearchParams();
  queryParams.append('cityName', cityInfo.name);
  // queryParams.append('cityDescription', cityInfo.description);
  queryParams.append('pin', encodedPin);

  const cityInfoUrl = 'http://localhost:3000/cityinfo';   //promijenit URL 

  const qrCodeData = `${cityInfoUrl}?${queryParams.toString()}`;

  const handlePinChange = (event) => {
    setEnteredPin(event.target.value);
  };

  const handleSubmit = () => {    //ovdje treba navigirat na pitanje ako je pin tocan
    if (enteredPIN === pin) {
      console.log('Correct PIN: true');
    } else {
      console.log('Correct PIN: false');
    }
  };

  return (
    <div>
      <QRCode value={qrCodeData} size={160} />
      <p>Scan the QR code for info about the city</p>
      <input type="text" value={enteredPIN} onChange={handlePinChange} placeholder="Enter PIN" />
      <button onClick={handleSubmit}>Otvori pitanje</button>
    </div>
  );
};