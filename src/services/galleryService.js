// src/services/galleryService.js
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { sendUserNotification } from "./emailService";

export const getGalleryEmojis = async () => {
  try {
    const emojisCollection = collection(db, "emojis");
    const q = query(emojisCollection, orderBy("timestamp", "desc"), limit(50));

    const querySnapshot = await getDocs(q);

    const emojis = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // --- CAMBIO CLAVE AL LEER ---
      // Reconvertimos el string guardado de vuelta a un array anidado.
      // Se añade un try-catch por si algún dato antiguo no es un string JSON válido.
      let gridData = [];
      try {
        gridData = JSON.parse(data.grid);
      } catch (e) {
        console.error("Error al parsear el grid para el emoji:", doc.id, e);
        // Si falla, dejamos un grid vacío para no romper la app.
      }

      return {
        id: doc.id,
        username: data.username,
        timestamp: data.timestamp,
        grid: gridData, // Usamos el grid ya parseado
      };
    });

    return emojis;
  } catch (error) {
    console.error("Error al obtener emojis de Firestore:", error);
    return [];
  }
};

export const saveEmojiToGallery = async (username, gridData) => {
  if (!gridData) {
    console.error("No se pueden guardar datos de grid vacíos.");
    return;
  }

  try {
    const newEmoji = {
      username: username.trim() || "Anónimo",
      timestamp: new Date(),
      // --- CAMBIO CLAVE AL GUARDAR ---
      // Convertimos el array anidado a un simple string de texto
      grid: JSON.stringify(gridData),
    };

    const docRef = await addDoc(collection(db, "emojis"), newEmoji);
    console.log("Emoji guardado con ID: ", docRef.id);
    await sendUserNotification(newEmoji.username);

    // Devolvemos el objeto original para la UI, no el string
    return { id: docRef.id, ...newEmoji, grid: gridData };
  } catch (error) {
    console.error(
      "Error al guardar en Firestore o enviar notificación:",
      error
    );
  }
};
