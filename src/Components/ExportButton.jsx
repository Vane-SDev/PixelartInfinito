// src/components/ExportButton.jsx
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { saveUser, getUserStats } from '../services/userStorage';
import styles from './ExportButton.module.css';

// No se usan estilos de módulo aquí, usa los globales de index.css
const ExportButton = ({ elementIdToCapture, username, hasPixelsColored }) => {
    const [stats, setStats] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleExport = async () => {
        if (isProcessing || !hasPixelsColored) return;
        setIsProcessing(true);

        const element = document.getElementById(elementIdToCapture);
        if (element) {
            try {
                // Si hay un usuario, lo guardamos
                if (username && username.trim()) {
                    await saveUser(username);
                    const currentStats = getUserStats();
                    setStats(currentStats);
                }

                const canvas = await html2canvas(element, {
                    backgroundColor: null, // Para fondo transparente si los pixeles apagados son transparentes
                    scale: 2, // Aumenta la resolución de la imagen
                    logging: true, // Para debug en consola
                    useCORS: true // Si tienes imágenes externas, aunque aquí no aplica
                });

                const imageName = username ? `emoji_${username.replace('@', '')}.png` : 'mi_emoji_pixelart.png';
                const link = document.createElement('a');
                link.download = imageName;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                alert('¡Tu emoji se está descargando! Revísalo y luego envíamelo por DM o etiquétame en tus historias @infinitamente_matematico.');
            } catch (err) {
                console.error("Error al procesar:", err);
                alert("Hubo un error al procesar tu emoji. Por favor, intentá de nuevo.");
            } finally {
                setIsProcessing(false);
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
                {isProcessing ? 'Procesando...' : '¡Crear y Descargar mi Emoji!'}
            </button>
            
            {stats && (
                <div className={`${styles.statsMessage} ${styles.fadeIn}`}>
                    <p>¡Ya son {stats.totalUsers} artistas creando emojis! 🎨</p>
                    {stats.todayUsers > 1 && (
                        <p>Hoy {stats.todayUsers} personas crearon su emoji</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExportButton;