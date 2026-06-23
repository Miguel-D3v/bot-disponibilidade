import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { env } from "./src/config/env.js";
import { processarMensagem } from "./src/services/whatsapp.service.js";
import gerarLegenda from "./src/services/disponibilidade.service.js";

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

    console.log(
        "Escaneie o QR Code abaixo:"
    );

    qrcode.generate(qr, {
        small: true
    });

});

client.on("ready", async () => {

    console.log("Bot conectado!");

});

client.on(
    "message",
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