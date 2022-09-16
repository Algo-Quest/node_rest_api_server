import mongoose, { mongo } from "mongoose";

const { Schema, model } = mongoose;

const UploadSchema = Schema({
    idUploaded: { type: mongoose.Types.ObjectId, required: true },
    emailUploadedBy: { type: String, required: true },
    fileDetails: Object
}, {
    timestamps: true,
});

const uploadModel = model("upload", UploadSchema, "upload");

export default uploadModel;