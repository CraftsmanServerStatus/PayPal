const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Endpoint del Webhook de PayPal
app.post('/paypal-webhook', async (req, res) => {
    try {
        const event = req.body;

        // Extraer información relevante
        const payer = event.resource?.payer?.email_address || "Usuario Desconocido";
        const amount = parseFloat(event.resource?.amount?.value) || 0;

        // Definir el rango según el monto
        let rank;
        if (amount === 1.00) rank = "Hayato";
        else if (amount === 2.00) rank = "Kaede";
        else if (amount === 3.00) rank = "Suzu";
        else rank = "Desconocido";

        // Enviar mensaje al webhook de Discord
        await axios.post("https://discord.com/api/webhooks/1348339948629135390/4YUGwMd6JVKtlXjHvmoELpw8Ycf5FlXZtV6XHR2IIADOv7w73G74dWnMf1zuha7OLsf5", {
            content: `🛒 **Nueva compra**  
            **Usuario:** ${payer}  
            **Rango comprado:** ${rank}  
            **Monto:** $${amount} USD`
        });

        res.status(200).send("Notificación enviada a Discord.");
    } catch (error) {
        console.error("Error al procesar webhook:", error);
        res.status(500).send("Error procesando el webhook.");
    }
});

// Iniciar servidor en un puerto dinámico para Koyeb
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
