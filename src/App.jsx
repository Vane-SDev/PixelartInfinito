// src/App.jsx
import React, { useState } from 'react';
import PixelGrid from './Components/PixelGrid';
import UserInput from './Components/UserInput';
import ExportButton from './Components/ExportButton';
import logo from './assets/Recurso 5@4x.png';
import './App.css';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [hasPixelsColored, setHasPixelsColored] = useState(false);
  const GRID_ELEMENT_ID = "pixelArtGridToCapture";

  const handlePixelsColoredChange = (hasColored) => {
    setHasPixelsColored(hasColored);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="Logo Infinitamente Matemático" className="app-logo" />
          </div>
          <div className="title-container">
            <h1>PixelArt Emoji Infinito</h1>
            <p>¡Diseñá tu propio emoji de 16x16 píxeles y compartilo!</p>
            <p>Hacé clic en los cuadraditos de colores para encenderlos o apagarlos 😉.</p>
          </div>
        </div>
      </header>

      <main>
        <PixelGrid 
          gridId={GRID_ELEMENT_ID} 
          onPixelsColoredChange={handlePixelsColoredChange}
        />
        <UserInput
          value={username}
          onChange={setUsername}
          placeholder="@TuInstagram"
        />
        <ExportButton 
          elementIdToCapture={GRID_ELEMENT_ID} 
          username={username}
          hasPixelsColored={hasPixelsColored}
        />
      </main>

      <footer>
        <p>
          Una creación de <a href="https://vswebdesign.online/"> Vs Web Design </a> para <a href="https://whatsapp.com/channel/0029Vb5TAwM1t90VXCepFp2D" target="_blank" rel="noopener noreferrer">Infinitamente Matemático</a>
        </p>
      </footer>
    </div>
  );
}

export default App;