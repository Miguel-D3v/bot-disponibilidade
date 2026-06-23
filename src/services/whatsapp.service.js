import gerarLegenda from "./disponibilidade.service.js";

let ultimaMensagem = null;

export async function processarMensagem(
    client,
    message,
    MessageMedia,
    env
) {

    if (message.from !== env.grupoEdge) return;

    if (message.author !== env.matheusId) return;

    if (ultimaMensagem === message.id.id) return;

    ultimaMensagem = message.id.id;

    const texto = message.body.toUpperCase();

    if (!texto.includes("PEÇO A DISPONIBILIDADE"))
        return;

    console.log(
        "🚨 DISPONIBILIDADE DETECTADA"
    );

    const foto =
        MessageMedia.fromFilePath(
            env.fotoPath
        );

    await client.sendMessage(
        env.grupoEdge,
        foto,
        {
            caption: gerarLegenda()
        }
    );
}