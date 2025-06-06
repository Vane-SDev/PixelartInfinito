// src/components/Pixel.jsx
import React from 'react';
import styles from './Pixel.module.css';

const Pixel = ({ color, onClick, onKeyDown }) => {
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
            className={styles.pixel}
            onClick={handleClick}
            onKeyDown={handleKeyDown} // Manejador para teclado
            role="button" // Semántica para accesibilidad
            style={{ backgroundColor: color }}
            aria-label={`Pixel de color ${color}`}
            tabIndex={0} // Hace que el div sea enfocable
        />
    );
};

export default Pixel;