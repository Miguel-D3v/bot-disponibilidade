import dotenv from "dotenv";

dotenv.config();

export const env = {
    grupoEdge: process.env.GRUPO_EDGE,
    matheusId: process.env.MATHEUS_ID,
    fotoPath: process.env.FOTO_PATH
};