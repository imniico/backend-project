import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker, Faker, es } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "tokenSecretKey";

export default __dirname;

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password);
};

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
