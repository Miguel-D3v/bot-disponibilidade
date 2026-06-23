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

   try {
    await client.sendMessage(
        env.grupoEdge,
        foto,
        {
            caption: gerarLegenda()
        }
    );

    console.log(
        `[${new Date().toLocaleString("pt-BR")}] 📤 DISPONIBILIDADE ENVIADA`
    );

    } catch (error) {

    console.error(
        `[${new Date().toLocaleString("pt-BR")}] ❌ ERRO AO ENVIAR`,
        error
       );

    }
}
