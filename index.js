import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fs from "fs";

const dadosPessoais = JSON.parse(fs.readFileSync("./config/dados-pessoais.json", "utf-8"));
const disponibilidade = JSON.parse(fs.readFileSync("./config/disponibilidade.json", "utf-8"));
    
const { Client, LocalAuth } = pkg;

const GRUPO_ID = "120363249794579931@g.us";

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './sessions'
    })
});

client.on('qr', (qr) => {
    console.log('   Escaneie o QR Code abaixo : ');
    qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
    console.log("Bot conectado!");

});
function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}
 disponibilidade.datasDisponiveis = disponibilidade.datasDisponiveis.map(formatarData);

function gerarLegenda() {
    return `
NOME: ${dadosPessoais.Nome}
CPF: ${dadosPessoais.CPF}
ALTURA: ${dadosPessoais.Altura}
GRANDES EVENTOS: ${dadosPessoais["Grandes Eventos"]}
VENCIMENTO ATA: ${dadosPessoais["Vencimento Ata"]}
BAIRRO: ${dadosPessoais.Bairro}
TEL: ${dadosPessoais.Telefone}
PIX: ${dadosPessoais.Pix}

DISPONÍVEL: ${disponibilidade.datasDisponiveis.join(", ")}
`;
}


 client.on("message_create", async (message) => {
    try {
        const chat = await message.getChat();

        // 🔒 só o grupo alvo
        if (message.from !== GRUPO_ID) return;

        console.log("\n==============================");
        console.log("📌 GRUPO:", chat.name);
        console.log("📩 MENSAGEM:", message.body);
        console.log("👤 AUTHOR:", message.author);
        console.log("==============================\n");

    } catch (err) {
        console.log("Erro:", err);
    }
});

client.initialize();