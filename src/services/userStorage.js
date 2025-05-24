// Función para obtener usuarios del localStorage
import { sendUserNotification } from './emailService';

const getStoredUsers = () => {
    const users = localStorage.getItem('pixelArtUsers');
    return users ? JSON.parse(users) : [];
};

// Función para guardar un nuevo usuario
const saveUser = async (username, timestamp = new Date().toISOString()) => {
    const users = getStoredUsers();
    const newUser = {
        username: username.trim(),
        timestamp,
        id: `user_${Date.now()}`
    };
    
    // Evitar duplicados basados en el nombre de usuario
    if (!users.some(user => user.username === newUser.username)) {
        users.push(newUser);
        localStorage.setItem('pixelArtUsers', JSON.stringify(users));
        
        // También podemos exportar a un archivo JSON
        exportToJSON(users);

        // Enviar notificación por correo
        try {
            await sendUserNotification(newUser.username);
        } catch (error) {
            console.error("Error al enviar la notificación:", error);
            // No interrumpimos el flujo si falla el envío del correo
        }
    }
    
    return newUser;
};

// Función para exportar a JSON
const exportToJSON = (users) => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pixel_art_users.json';
    
    // Guardar automáticamente cada 10 usuarios
    if (users.length % 10 === 0) {
        link.click();
    }
    
    URL.revokeObjectURL(url);
};

// Función para obtener estadísticas
const getUserStats = () => {
    const users = getStoredUsers();
    return {
        totalUsers: users.length,
        lastUser: users[users.length - 1],
        todayUsers: users.filter(user => {
            const userDate = new Date(user.timestamp);
            const today = new Date();
            return userDate.toDateString() === today.toDateString();
        }).length
    };
};

export { getStoredUsers, saveUser, getUserStats }; 