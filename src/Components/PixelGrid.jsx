// src/components/PixelGrid.jsx
import React, { useState, useEffect } from 'react'; // Eliminé useRef si no se usa para navegación de teclado avanzada
import Pixel from './Pixel';
import styles from './PixelGrid.module.css';

const GRID_SIZE = 16; // 

const PixelGrid = ({ gridId }) => {
    // 1. VERIFICA ESTA INICIALIZACIÓN
    const initialGrid = () => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    const [grid, setGrid] = useState(initialGrid);

    // 2. VERIFICA QUE EL ESTADO INICIAL DE BINARYROWS TAMBIÉN USE GRID_SIZE = 16
    const [binaryRows, setBinaryRows] = useState(Array(GRID_SIZE).fill("0".repeat(GRID_SIZE)));
    const [totalBinary, setTotalBinary] = useState("");
    const [decimalValue, setDecimalValue] = useState("0");

    const handlePixelClick = (rowIndex, colIndex) => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] === 0 ? 1 : 0;
            return newGrid;
        });
    };

    const handleClearGrid = () => {
        setGrid(initialGrid());
    };

    const calculateBinaryAndDecimal = (rows) => {
        const binaryString = rows.join('');
        const decimal = BigInt(`0b${binaryString}`).toString();
        return { binaryString, decimal };
    };

    const formatDecimalValue = (value) => {
        if (value.length > 20) {
            return `${value.slice(0, 10)}...${value.slice(-10)}`;
        }
        return value;
    };

    useEffect(() => {
        // Esta parte debería funcionar bien si 'grid' es 16x16
        const newBinaryRows = grid.map(row => row.join(''));
        setBinaryRows(newBinaryRows);
        
        const { binaryString, decimal } = calculateBinaryAndDecimal(newBinaryRows);
        setTotalBinary(binaryString);
        setDecimalValue(decimal);
    }, [grid]);

    const formatBinaryWithSpaces = (binary) => {
        return binary.match(/.{1,8}/g)?.join(' ') || binary;
    };

    // ... el resto del código (handlePixelClick, etc.) ...

    return (
        <div className={styles.gridWrapper}>
            <div className={styles.controls}>
                <button 
                    onClick={handleClearGrid}
                    className={styles.clearButton}
                    aria-label="Limpiar grid"
                >
                    Limpiar Grid
                </button>
            </div>

            <div id={gridId} className={styles.gridContainer}>
                <div
                    className={styles.grid}
                    // 3. ESTO DEBERÍA CREAR 16 COLUMNAS
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, auto)` }}
                    role="grid"
                    aria-label={`Grilla para dibujar emoji ${GRID_SIZE}x${GRID_SIZE}`}
                >
                    {/* 4. SI 'grid' ES 16x16, ESTO DEBERÍA RENDERIZAR 256 PÍXELES */}
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <Pixel
                                key={`${rowIndex}-${colIndex}`}
                                isFilled={cell === 1}
                                onClick={() => handlePixelClick(rowIndex, colIndex)}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className={styles.binaryCodeDisplay}>
                <h3>Código Binario de tu Emoji (por fila):</h3>
                <div className={styles.binaryRows}>
                    {/* 5. SI 'binaryRows' TIENE 16 FILAS DE 16 BITS, ESTO SE MOSTRARÁ CORRECTAMENTE */}
                    {binaryRows.map((binaryRow, index) => (
                        <p key={index}>Fila {index + 1}: {binaryRow}</p>
                    ))}
                </div>
                <div className={styles.totalBinary}>
                    <h4>Número Binario Total:</h4>
                    <p className={styles.binaryValue}>{formatBinaryWithSpaces(totalBinary)}</p>
                    <h4>Valor Decimal:</h4>
                    <p className={styles.decimalValue}>{formatDecimalValue(decimalValue)}</p>
                </div>
                <p className={styles.bitCount}>
                    Total Bits: {GRID_SIZE * GRID_SIZE} ({grid.flat().filter(bit => bit === 1).length} encendidos)
                </p>
            </div>
        </div>
    );
};

export default PixelGrid;