import userModel from "../../models/user.model.js";
import sessionModel from "../../models/session.model.js";
import { GetUserDTO } from "../../dto/user.dto.js";

export class SessionMongo{
    constructor(){
        this.uModel = userModel;
        this.sModel = sessionModel;
    }

    getCurrent = async (userId) => {
        const sessionsDB = await this.sModel.find().lean();
        const result = sessionsDB.find((s) => JSON.parse(s.session).passport.user === userId.toString())
        if (result){
            const user = await this.uModel.findOne({ _id: userId })
            const userDTO = new GetUserDTO(user);
            return userDTO;
        } else {
            return "No logueado!"
        }
    }
}