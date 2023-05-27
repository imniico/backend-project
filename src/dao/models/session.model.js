import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    expires: Date,
    session: String
});

const sessionModel = mongoose.model("sessions", sessionSchema)
export default sessionModel;