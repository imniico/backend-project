import chatModel from "../../models/chat.model.js";

export default class ChatMongo{
    constructor(){
        this.model = chatModel;
    }

    addMessage = async (data) => {
        const result = await this.model.create(data);
        return result;
    }
}