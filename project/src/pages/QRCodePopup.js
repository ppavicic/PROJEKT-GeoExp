import React from 'react';
import QRCode from 'qrcode.react';
import '../styles/Popup.css';


export const QRCodePopup = ({ cityInfoUrl }) => {
  return (
    <div>
      <QRCode value={cityInfoUrl} size={160} />
      <p>Scan the QR code for info about the city</p>
    </div>
  );
};