import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "LeGrandFocus App",
            description: "API documentation",
            version: "2.0.0",
        },
        servers: [
            { url: "http://localhost:3000/" },
        ],
    },

    apis: [
        path.join(__dirname, "../routes/*.js"),
        path.join(__dirname, "./schema/Outputs/*.js"),   // ← schémas
        path.join(__dirname, "./schema/Inputs/*.js"),
    ],};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default { swaggerDocs };
