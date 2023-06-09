import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker, Faker, es } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "tokenSecretKey";

export default __dirname;

// BCRYPT
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};
export const isValidPassword = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password);
};


// JWT
export const generateToken = (user) => {
    const token = jwt.sign(user, SECRET_KEY, {
        expiresIn: "60s"
    });
    return token;
}
export const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, SECRET_KEY, (e, info) => {
        if(e) return res.sendStatus(401);
        req.user = info;
        next();
    })
}


// FAKER
export const customFaker = new Faker({
    locale: [es],
})
const { commerce, image, database, string } = customFaker;
export const generateProduct = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        description: commerce.productName(),
        price: parseFloat(commerce.price()),
        code: string.numeric(10),
        stock: parseInt(string.numeric(2)),
        category: commerce.productMaterial(),
        thumbnails: [image.url(), image.url()],
        stat: true
    }
}


// WINSTON
import winston from "winston";
import { config } from './config/config.js';

const logLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

const logColors = {
    fatal: "red bold blackBG",
    error: "yellow bold blackBG",
    warning: "magenta bold blackBG",
    info: "blue bold blackBG",
    http: "cyan bold blackBG",
    debug: "grey bold blackBG"
}

// Logger en desarrollo
const devLogger = winston.createLogger({ 
    levels: logLevels,
    transports:[
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: logColors }),
                winston.format.simple()
            )
        })
    ]
})

// Logger en producción
const prodLogger = winston.createLogger({ 
    levels: logLevels,
    transports:[
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: logColors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ 
            filename: path.join(__dirname, "/logs/errors.log"),
            level: "error"
        })
    ]
})

const currentEnv = config.env || "development";

export const addLogger = (req, res, next) => {
    if(currentEnv === "development"){
        req.logger = devLogger;
    } else {
        req.logger = prodLogger;
    }

    req.logger.info(`${req.url} - method: ${req.method}`);
    next()
}





