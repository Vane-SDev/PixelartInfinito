// src/components/PixelGrid.jsx
import React, { useState, useEffect } from 'react';
import Pixel from './Pixel';
import styles from './PixelGrid.module.css';
import { COLORS, COLOR_VALUES } from '../constants'; // <-- NUEVA LÍNEA DE IMPORTACIÓN

// Las constantes que solo usa este componente se pueden quedar aquí
const GRID_SIZE = 16;

const WHATSAPP_NUMBER = '+5492645211880'; // Reemplaza con tu número real

const PixelGrid = ({ grid, setGrid, gridId, onPixelsColoredChange }) => {
    const [currentColor, setCurrentColor] = useState(COLORS.BLACK);
    const [binaryRows, setBinaryRows] = useState(Array(GRID_SIZE).fill("0".repeat(GRID_SIZE * 3)));
    const [decimalValue, setDecimalValue] = useState("0");

    const hasPixelsColored = grid.some(row => row.some(pixel => pixel !== COLORS.WHITE));

    const handlePixelClick = (rowIndex, colIndex) => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] === currentColor ? COLORS.WHITE : currentColor;
            return newGrid;
        });
    };

    const handleClearGrid = () => {
        const initialGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(COLORS.WHITE));
        setGrid(initialGrid);
    };

    const handleColorSelect = (color) => {
        setCurrentColor(color);
    };

    const calculateBinaryAndDecimal = (rows) => {
        const binaryString = rows.join('');
        try {
            const decimal = BigInt(`0b${binaryString}`).toString();
            return { binaryString, decimal };
        } catch (error) {
            console.error('Error al calcular el valor decimal:', error);
            return { binaryString, decimal: '0' };
        }
    };

    const formatDecimalValue = (value) => {
        if (value.length > 20) {
            return `${value.slice(0, 10)}...${value.slice(-10)}`;
        }
        return value;
    };

    useEffect(() => {
        const newBinaryRows = grid.map(row => row.join(''));
        setBinaryRows(newBinaryRows);

        const { decimal } = calculateBinaryAndDecimal(newBinaryRows);
        setDecimalValue(decimal);
    }, [grid]);

    useEffect(() => {
        if (onPixelsColoredChange) {
            onPixelsColoredChange(hasPixelsColored);
        }
    }, [hasPixelsColored, onPixelsColoredChange]);

    const HelpButton = ({ topic }) => (
        <button
            className={styles.helpButton}
            onClick={() => handleHelpClick(topic)}
            title="¿Necesitas ayuda? ¡Preguntame!"
            type="button"
        >
            <span className={styles.helpIcon}>?</span>
        </button>
    );

    const BinarySection = ({ title, topic, children }) => (
        <div className={styles.binarySection}>
            <div className={styles.sectionHeader}>
                <h4>{title}</h4>
                <HelpButton topic={topic} />
            </div>
            {children}
        </div>
    );

    const BinaryRows = ({ binaryRows }) => (
        <div className={styles.binaryRowsScroll}>
            {binaryRows.map((binaryRow, index) => {
                const colorGroups = binaryRow.match(/.{3}/g) || [];
                return (
                    <div key={index} className={styles.binaryRowContainer}>
                        <span className={styles.binaryRowNumber}>{index + 1}:</span>
                        <div className={styles.binaryRowContent}>
                            {colorGroups.map((bits, bitIndex) => (
                                <span
                                    key={bitIndex}
                                    className={styles.binaryGroup}
                                    style={{
                                        backgroundColor: bits === COLORS.WHITE ? 'white' : 'rgba(90, 24, 118, 0.05)',
                                        borderColor: bits === COLORS.WHITE ? '#eee' : 'rgba(90, 24, 118, 0.2)'
                                    }}
                                    title={`${COLOR_VALUES[bits]?.name} (${bits})`}
                                >
                                    {bits}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const ColorExplanation = () => (
        <div className={styles.binaryExplanation}>
            <p>Cada color está representado por 3 dígitos binarios (bits):</p>
            <ul className={styles.colorExplanation}>
                {Object.entries(COLORS).map(([, value]) => (
                    <li key={value}>
                        <div className={styles.colorInfo}>
                            <span
                                className={styles.colorSample}
                                style={{ backgroundColor: COLOR_VALUES[value].hex }}
                            />
                            <div className={styles.colorDetails}>
                                <code>{value}</code>
                                <span className={styles.colorName}>{COLOR_VALUES[value].name}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleHelpClick = (topic) => {
        const message = encodeURIComponent(`¡Hola! Me gustaría que me expliques más sobre ${topic} en el PixelArt Emoji 🎨`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <div className={styles.gridWrapper}>
            <div className={styles.controls}>
                <button
                    onClick={handleClearGrid}
                    className={styles.clearButton}
                    aria-label="Limpiar grid"
                    type="button"
                >
                    Limpiar Grid
                </button>
            </div>

            <div className={styles.colorPalette}>
                {Object.entries(COLORS).map(([, colorValue]) => (
                    <button
                        key={colorValue}
                        onClick={() => handleColorSelect(colorValue)}
                        className={`${styles.colorButton} ${currentColor === colorValue ? styles.selected : ''}`}
                        style={{ backgroundColor: COLOR_VALUES[colorValue].hex }}
                        aria-label={`Seleccionar color ${COLOR_VALUES[colorValue].name}`}
                        title={COLOR_VALUES[colorValue].name}
                        type="button"
                    />
                ))}
            </div>

            <div id={gridId} className={styles.gridContainer}>
                <div
                    className={styles.grid}
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, auto)` }}
                    role="grid"
                    aria-label={`Grilla para dibujar emoji ${GRID_SIZE}x${GRID_SIZE}`}
                >
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <Pixel
                                key={`${rowIndex}-${colIndex}`}
                                color={COLOR_VALUES[cell].hex}
                                onClick={() => handlePixelClick(rowIndex, colIndex)}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className={styles.binaryCodeDisplay}>
                <BinarySection title="Representación Binaria del Emoji" topic="la representación binaria">
                    <ColorExplanation />
                </BinarySection>

                <BinarySection title="Código por filas" topic="el código por filas">
                    <BinaryRows binaryRows={binaryRows} />
                </BinarySection>

                <BinarySection title="Resumen" topic="el resumen y los cálculos">
                    <div className={styles.bitSummary}>
                        <p className={styles.summaryItem}>
                            <span>Total de bits:</span>
                            <span>{GRID_SIZE * GRID_SIZE * 3} bits</span>
                        </p>
                        <p className={styles.summaryItem}>
                            <span>Píxeles coloreados:</span>
                            <span>{grid.flat().filter(bit => bit !== COLORS.WHITE).length} de {GRID_SIZE * GRID_SIZE}</span>
                        </p>
                        <p className={styles.summaryItem}>
                            <span>Bits por píxel:</span>
                            <span>3 bits</span>
                        </p>
                        <p className={styles.summaryItem}>
                            <span>Valor decimal:</span>
                            <span>{formatDecimalValue(decimalValue)}</span>
                        </p>
                    </div>
                </BinarySection>
            </div>
        </div>
    );
};

export default PixelGrid;