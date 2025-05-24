// src/components/UserInput.jsx
import React, { useState, useEffect } from 'react';
import styles from './UserInput.module.css';

// No se usan estilos de módulo aquí, usa los globales de index.css o crea uno si necesitas más
const UserInput = ({ value, onChange, placeholder }) => {
    const [showThankYou, setShowThankYou] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        
        // Reiniciar el temporizador de typing
        setIsTyping(true);
        if (typingTimeout) clearTimeout(typingTimeout);
        
        const timeout = setTimeout(() => {
            setIsTyping(false);
            if (newValue.trim() !== '') {
                setShowThankYou(true);
            } else {
                setShowThankYou(false);
            }
        }, 1000);
        
        setTypingTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [typingTimeout]);

    return (
        <div className={styles.userInputContainer}>
            <div className={styles.inputGroup}>
                <label htmlFor="userInputInsta" className={styles.label}>
                    Tu @Instagram (opcional):
                </label>
                <input
                    type="text"
                    id="userInputInsta"
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder || "@tuUsuario"}
                    className={styles.input}
                />
            </div>
            {showThankYou && !isTyping && (
                <div className={`${styles.thankYouMessage} ${styles.fadeIn}`}>
                    <p>¡Gracias por participar! 🎉</p>
                    <p>Seguinos en <a href="https://instagram.com/infinitamente_matematico" target="_blank" rel="noopener noreferrer">@infinitamente_matematico</a> para más curiosidades matemáticas.</p>
                </div>
            )}
        </div>
    );
};

export default UserInput;