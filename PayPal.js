const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/paypal-webhook', async (req, res) => {
    const { payer, amount } = req.body;

    // Definir el rango según el monto
    let rank;
    if (amount === 1) rank = "Hayato";
    else if (amount === 2) rank = "Kaede";
    else if (amount === 3) rank = "Suzu";
    else rank = "Desconocido";

    // Enviar mensaje al webhook de Discord
    try {
        await axios.post("https://discord.com/api/webhooks/1348339948629135390/4YUGwMd6JVKtlXjHvmoELpw8Ycf5FlXZtV6XHR2IIADOv7w73G74dWnMf1zuha7OLsf5", {
            content: `🛒 **Nueva compra**  
            **Usuario:** ${payer}  
            **Rango comprado:** ${rank}  
            **Monto:** $${amount} USD`
        });

        res.status(200).send("Notificación enviada a Discord.");
    } catch (error) {
        console.error("Error al enviar webhook:", error);
        res.status(500).send("Error enviando el webhook.");
    }
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
