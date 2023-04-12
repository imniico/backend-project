import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    rol: String
});

const userModel = mongoose.model("users", usersSchema);
export default userModel;