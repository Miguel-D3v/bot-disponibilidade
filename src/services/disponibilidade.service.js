import fs from "fs";
import { formatarData } from "../utils/formatarData.js";

function carregarDadosPessoais() {
    return JSON.parse(
        fs.readFileSync("./config/dados-pessoais.json", "utf8")
    );
}

function carregarDisponibilidade() {
    return JSON.parse(
        fs.readFileSync("./config/disponibilidade.json", "utf8")
    );
}

export default function gerarLegenda() {

    const dadosPessoais = carregarDadosPessoais();

    const disponibilidade =
        carregarDisponibilidade();

    const datasFormatadas =
        disponibilidade.datasDisponiveis.map(
            formatarData
        );

    return `
NOME: ${dadosPessoais.Nome}
CPF: ${dadosPessoais.CPF}
ALTURA: ${dadosPessoais.Altura}
GRANDES EVENTOS: ${dadosPessoais["Grandes Eventos"]}
VENCIMENTO ATA: ${dadosPessoais["Vencimento Ata"]}
BAIRRO: ${dadosPessoais.Bairro}
TEL: ${dadosPessoais.Telefone}
PIX: ${dadosPessoais.Pix}

DISPONÍVEL: ${datasFormatadas.join(", ")}
`;
}