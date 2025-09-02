// src/App.jsx
import React, { useState } from 'react';
import PixelGrid from './Components/PixelGrid';
import UserInput from './Components/UserInput';
import ExportButton from './Components/ExportButton';
import Gallery from './Components/Gallery';
import logo from './assets/Recurso 5@4x.png';
import './App.css';
import './index.css';

const GRID_SIZE = 16;
const INITIAL_COLOR = '000'; 

function App() {
  const [username, setUsername] = useState('');
  const [hasPixelsColored, setHasPixelsColored] = useState(false);
  const [grid, setGrid] = useState(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(INITIAL_COLOR))
  );
  const [galleryUpdateTrigger, setGalleryUpdateTrigger] = useState(0);
  const GRID_ELEMENT_ID = "pixelArtGridToCapture";

  const handlePixelsColoredChange = (hasColored) => {
    setHasPixelsColored(hasColored);
  };

  const handleEmojiSaved = () => {
    setGalleryUpdateTrigger(count => count + 1); 
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
          grid={grid}
          setGrid={setGrid}
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
          gridData={grid}
          onEmojiSaved={handleEmojiSaved}
        />
        <Gallery updateTrigger={galleryUpdateTrigger} />
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