import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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