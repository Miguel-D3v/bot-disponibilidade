import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { env } from "./src/config/env.js";
import { processarMensagem } from "./src/services/whatsapp.service.js";

const {
    Client,
    LocalAuth,
    MessageMedia
} = pkg;

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "./sessions"
    })
});

client.on("qr", (qr) => {

    console.log("Escaneie o QR Code abaixo:");

    qrcode.generate(qr, {
        small: true
    });

});

client.on("ready", () => {
    
    console.log("Bot conectado!");
    console.log("Grupo:", env.grupoEdge);
    console.log("Matheus:", env.matheusId);

});

client.on(
    "message_create",
    async (message) => {

        try {

            await processarMensagem(
                client,
                message,
                MessageMedia,
                env
            );

        } catch (error) {

            console.error(error);

        }

    }
);

client.initialize();