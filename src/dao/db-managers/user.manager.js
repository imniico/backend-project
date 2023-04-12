import userModel from "../models/user.model.js"

export default class UserManager {
    constructor() {
    }

    signup = async (email, password) => {
        const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;
        let rol;

        try {
            regex.test(email) ? rol = "admin" : rol = "usuario";
            const result = await userModel.create({ email, password, rol })
            return result;
        } catch (error){
            return false;
        }
        
    }

    login = async (email, password) => {
        const result = await userModel.find({ email })
        if (result.length && password === result[0].password) {
            return result[0].email;
        } else {
            return false;
        }
    }

}