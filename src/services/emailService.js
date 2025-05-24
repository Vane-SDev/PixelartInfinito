import emailjs from "@emailjs/browser";

// Inicializar EmailJS con la Public Key desde variables de entorno
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const sendUserNotification = async (username) => {
  try {
    const templateParams = {
      to_email: "infinitamentematematico@gmail.com",
      username: username,
      date: new Date().toLocaleString(),
      to_name: "Infinitamente Matemático",
      app_name: import.meta.env.VITE_APP_NAME || "PixelArt Infinito"
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

export { sendUserNotification };
