import userModel from "../models/user.model";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import multer from "multer";
import upload from "../middlewares/multer.middleware";
import userCheckService from "../services/user.check.service";
import responseMsg from "../utils/http.message";
import uploadModel from "../models/upload.model";

class UsersController {
    jwtSecret = process.env.JWT_SECRET_KEY;
    constructor() { }
    // login controller
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(responseMsg("validation error", 1, errors));
            }
            const user = await userCheckService(req.body);
            if (!user) return res.status(400).json(responseMsg("user not found", 1));

            try {
                const jwtToken = jwt.sign(user, this.jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN });
                res.cookie("jwt_token", jwtToken, {
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: eval(process.env.COOKIE_EXPIRES_IN),
                    httpOnly: true,
                });
                res.status(200).json(responseMsg("user logged in successfully", 0));
            } catch (err) {
                console.log(err)
                return res.status(400).json(responseMsg("internal server error", 2))
            }
        }
        catch (e) {
            // console.log(e);
            return res.status(400).json(responseMsg("internal server error", 3));
        }
    };
    // register controller
    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        try {
            let user = await userModel.create(req.body);
            user = user.toObject();
            delete user["password"];
            res.status(201).send(responseMsg("user successfully registered", 0, user));
        }
        catch (e) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json(responseMsg("user already exists", 2));
            }
            // console.log(e);
            return res.status(400).json(responseMsg("internal server error", 3));
        }
    }


    // user upload controller
    async uploadFile(req, res) {
        upload.single("image")(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json(responseMsg("File limit is :" + eval(process.env.MAX_FILE_UPLOAD_SIZE), 1, err));
            }

            let upload = await uploadModel.create({
                idUploaded: req.userData._id,
                emailUploadedBy: req.userData.email,
                fileDetails: req.file
            });

            if (upload) {
                res.status(200).send(responseMsg("file uploaded success", 0, req.file));
                return true;
            }

            res.status(200).send(responseMsg("Internal server error occured", 2, req.file));
        })

    }

    //get all uploads of logged in user
    async getSelfUserAllUploadFile(req, res) {
        // get the logged in user all uploaded files only
        let result = await uploadModel.find({
            idUploaded: req.userData._id
        });

        if (result) {
            return res.status(400).json(responseMsg("file fetched successfully", 0, result))
        }

        return res.status(400).json(responseMsg("file not found by user", 1))
    }
};

export { UsersController };