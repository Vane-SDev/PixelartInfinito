// src/Components/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { getGalleryEmojis } from '../services/galleryService'; // CAMBIO: Importamos desde el nuevo servicio
import GalleryItem from './GalleryItem';
import styles from './Gallery.module.css';

const Gallery = ({ updateTrigger }) => {
    const [emojis, setEmojis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmojis = async () => {
            setIsLoading(true);
            const emojisFromDB = await getGalleryEmojis();
            setEmojis(emojisFromDB);
            setIsLoading(false);
        };

        fetchEmojis();
    }, [updateTrigger]);

    if (isLoading) {
        return (
            <section className={styles.galleryWrapper}>
                <h2>Galería de la Comunidad</h2>
                <p>Cargando emojis...</p>
            </section>
        );
    }

    if (emojis.length === 0) {
        return (
            <section className={styles.galleryWrapper}>
                <h2>Galería de la Comunidad</h2>
                <p>¡Sé el primero en crear un emoji y aparecer aquí!</p>
            </section>
        );
    }

    return (
        <section className={styles.galleryWrapper}>
            <h2>Galería de la Comunidad</h2>
            <div className={styles.galleryContainer}>
                {emojis.map(emoji => (
                    <GalleryItem key={emoji.id} emoji={emoji} />
                ))}
            </div>
        </section>
    );
};

export default Gallery;