// src/components/Pixel.jsx
import React from 'react';
import styles from './Pixel.module.css';

const Pixel = ({ isFilled, onClick, onKeyDown }) => {
    const handleClick = () => {
        onClick();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Previene el scroll con la barra espaciadora
            onClick();
        }
        // Pasa el evento al manejador del grid para navegación con flechas
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    return (
        <div
            className={`${styles.pixel} ${isFilled ? styles.filled : ''}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown} // Manejador para teclado
            role="button" // Semántica para accesibilidad
            aria-pressed={isFilled} // Estado para lectores de pantalla
            tabIndex={0} // Hace que el div sea enfocable
        />
    );
};

export default Pixel;