import mongoose, { mongo } from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
});

const userModel = model("user", UserSchema, "user");

export default userModel;