import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: String
});

const userModel = mongoose.model("users", usersSchema);
export default userModel;