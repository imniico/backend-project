import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";

export default class UserManager {
    constructor() {
    }

    signup = async (email, password) => {
        const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;
        let rol;

        try {
            regex.test(email) ? rol = "admin" : rol = "usuario";
            const newUser = {
                email,
                password: createHash(password),
                rol
            }
            const result = await userModel.create(newUser)
            return result;
        } catch (error){
            return false;
        }
        
    }

    login = async (email, password) => {
        const result = await userModel.find({ email })
        if (result.length && isValidPassword(result[0], password)) {
            return result[0].email;
        } else {
            return false;
        }
    }

}