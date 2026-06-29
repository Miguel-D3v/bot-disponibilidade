import gerarLegenda from "./disponibilidade.service.js";

let ultimaMensagem = null;

export async function processarMensagem(
    client,
    message,
    MessageMedia,
    env
) {

    console.log("==============================");
console.log("FROM:", message.from);
console.log("GRUPO ENV:", env.grupoEdge);
console.log("AUTHOR:", message.author);
console.log("==============================");

    if (message.from !== env.grupoEdge) {
        console.log("❌ Grupo diferente");
        return;
    }

    console.log("✅ Grupo correto");

    if (message.author !== env.matheusId) {
        console.log("❌ Autor diferente");
        return;
    }

    console.log("✅ Autor correto");

    if (ultimaMensagem === message.id.id) {
        console.log("❌ Mensagem duplicada");
        return;
    }

    ultimaMensagem = message.id.id;

    console.log("✅ Mensagem inédita");

    const texto = message.body.toUpperCase();

    if (!texto.includes("PEÇO A DISPONIBILIDADE")) {
        console.log("❌ Texto não identificado");
        return;
    }

    console.log("🚨 DISPONIBILIDADE DETECTADA");

    const foto = MessageMedia.fromFilePath(env.fotoPath);

    try {

        await client.sendMessage(
            env.grupoEdge,
            foto,
            {
                caption: gerarLegenda()
            }
        );

        console.log(
            `[${new Date().toLocaleString("pt-BR")}] ✅ DISPONIBILIDADE ENVIADA`
        );

    } catch (error) {

        console.error("❌ Erro ao enviar:");
        console.error(error);

    }
}
