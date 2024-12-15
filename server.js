// Importar librerías
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permitir solicitudes desde el cliente
app.use(bodyParser.json()); // Parsear JSON

// Ruta para manejar las solicitudes del formulario
app.post("/submit", async (req, res) => {
  const API_KEY = process.env.API_KEY; // Usar la API key desde variables de entorno
  const apiUrl = "https://api.web3forms.com/submit";

  try {
    // Realizar la solicitud a la API protegida
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: API_KEY,
        ...req.body, // Enviar los datos del formulario
      }),
    });

    const data = await response.json();
    res.status(200).json(data); // Enviar la respuesta al cliente
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al enviar el formulario." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
