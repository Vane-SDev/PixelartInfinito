// src/Components/GalleryItem.jsx
import React from 'react';
// Asegúrate de que exportaste COLOR_VALUES desde PixelGrid.jsx
import { COLOR_VALUES } from '../constants';
import styles from './Gallery.module.css';

const GalleryItem = ({ emoji }) => {
    if (!emoji || !emoji.grid) {
        return null; // No renderizar nada si el emoji o su grid no existen
    }

    return (
        <div className={styles.galleryItem}>
            <div className={styles.galleryGrid}>
                {emoji.grid.map((row, rIndex) =>
                    row.map((colorCode, cIndex) => (
                        <div
                            key={`${emoji.id}-${rIndex}-${cIndex}`}
                            className={styles.galleryPixel}
                            style={{ backgroundColor: COLOR_VALUES[colorCode]?.hex || '#FFFFFF' }}
                        />
                    ))
                )}
            </div>
            <p className={styles.galleryUsername}>{emoji.username}</p>
        </div>
    );
};

export default GalleryItem;