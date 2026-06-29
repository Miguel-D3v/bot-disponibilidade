import dotenv from "dotenv";

dotenv.config();
if (!process.env.GRUPO_EDGE) {
    throw new Error("GRUPO_EDGE não foi configurado no .env");
}

if (!process.env.MATHEUS_ID) {
    throw new Error("MATHEUS_ID não foi configurado no .env");
}
export const env = {
    grupoEdge: process.env.GRUPO_EDGE,
    matheusId: process.env.MATHEUS_ID,
    fotoPath: process.env.FOTO_PATH
};