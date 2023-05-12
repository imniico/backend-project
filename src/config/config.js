import dotenv from "dotenv";
import __dirname from "../utils.js";

dotenv.config();

// para acceder una única vez al process.env
const processenv = process.env; 

const PORT = processenv.PORT;
const MONGO_URL = processenv.MONGO_URL;
const MONGO_SESSION_SECRET = processenv.MONGO_SESSION_SECRET;
const ADMIN_EMAIL = processenv.ADMIN_EMAIL;
const ADMIN_PASSWORD = processenv.ADMIN_PASSWORD;

export const config = {
    server:{
        port: PORT
    },
    mongo:{
        url: MONGO_URL,
        secret: MONGO_SESSION_SECRET
    },
    auth:{
        acc: ADMIN_EMAIL,
        pwd: ADMIN_PASSWORD
    }
}

