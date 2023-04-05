import chatModel from "../models/chat.model.js";

export default class ChatManager{
    constructor(){ }

    addMessage = async (data) => {
        const result = await chatModel.create(data);
        return result;
    }
}