import __dirname from "../utils.js";
import swaggerJsdoc from "swagger-jsdoc";

const PORT = 8080;

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación API e-commerce",
            description: "API REST para e-commerce",
            version: "1.0.0"
        },
        servers: [{ url: `http://localhost:${PORT}` }] //servidores
    },
    apis: [`${__dirname}/docs/**/*.yaml`] //archivos
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);
