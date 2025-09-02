// src/components/ExportButton.jsx
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { saveEmojiToGallery } from '../services/galleryService'; // CAMBIO: Importamos desde el nuevo servicio
import styles from './ExportButton.module.css';

const ExportButton = ({ elementIdToCapture, username, hasPixelsColored, gridData, onEmojiSaved }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleExport = async () => {
        if (isProcessing || !hasPixelsColored) return;
        setIsProcessing(true);

        const element = document.getElementById(elementIdToCapture);
        if (element) {
            try {
                await saveEmojiToGallery(username, gridData);

                const canvas = await html2canvas(element, {
                    backgroundColor: null,
                    scale: 2,
                    logging: true,
                    useCORS: true
                });

                const imageName = username ? `emoji_${username.replace(/[^a-zA-Z0-9]/g, '')}.png` : 'mi_emoji_pixelart.png';
                const link = document.createElement('a');
                link.download = imageName;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                alert('¡Tu emoji se ha guardado en la galería y se está descargando!');

            } catch (err) {
                console.error("Error al procesar:", err);
                alert("Hubo un error al procesar tu emoji. Por favor, intentá de nuevo.");
            } finally {
                setIsProcessing(false);
                if (onEmojiSaved) {
                    onEmojiSaved();
                }
            }
        } else {
            console.error("Elemento para capturar no encontrado:", elementIdToCapture);
            alert("Error: No se encontró el área del emoji para exportar.");
            setIsProcessing(false);
        }
    };

    return (
        <div className={styles.exportContainer}>
            <button 
                onClick={handleExport} 
                className={`${styles.exportButton} ${isProcessing ? styles.processing : ''}`}
                disabled={isProcessing || !hasPixelsColored}
            >
                {isProcessing ? 'Procesando...' : '¡Guardar y Descargar mi Emoji!'}
            </button>
        </div>
    );
};

export default ExportButton;