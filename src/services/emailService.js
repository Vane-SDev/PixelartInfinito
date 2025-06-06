import emailjs from "@emailjs/browser";

// Verificar que las variables de entorno estén disponibles
const requiredEnvVars = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID
};

// Verificar que todas las variables necesarias estén presentes
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`Error: Variable de entorno VITE_EMAILJS_${key} no está configurada`);
  }
});

// Inicializar EmailJS con la Public Key desde variables de entorno
try {
  emailjs.init(requiredEnvVars.PUBLIC_KEY);
} catch (error) {
  console.error("Error al inicializar EmailJS:", error);
}

const sendUserNotification = async (username) => {
  try {
    // Verificar que tenemos todas las variables necesarias
    if (!requiredEnvVars.SERVICE_ID || !requiredEnvVars.TEMPLATE_ID) {
      throw new Error("Faltan variables de entorno necesarias para enviar el email");
    }

    const templateParams = {
      to_email: "infinitamentematematico@gmail.com",
      username: username,
      date: new Date().toLocaleString(),
      to_name: "Infinitamente Matemático",
      app_name: import.meta.env.VITE_APP_NAME || "PixelArt Infinito"
    };

    console.log("Intentando enviar email con parámetros:", {
      serviceId: requiredEnvVars.SERVICE_ID,
      templateId: requiredEnvVars.TEMPLATE_ID,
      username: username
    });

    const response = await emailjs.send(
      requiredEnvVars.SERVICE_ID,
      requiredEnvVars.TEMPLATE_ID,
      templateParams
    );

    console.log("Email enviado exitosamente:", response);
    return response;
  } catch (error) {
    console.error("Error detallado al enviar el correo:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
};

export { sendUserNotification };
