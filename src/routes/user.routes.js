import express from "express";
import { UsersController } from "../controllers/user.controller";
import VerifyJwtToken from "../middlewares/auth.middleware";
import { userLoginValidators, userRegisterValidators } from "../validators/user.validators";

class UserRoute {
    userRouter;
    constructor() {
        this.userRouter = express.Router();
        this.userController = new UsersController();
        this.initRoutes();
    }

    initRoutes() {
        this.userRouter.post("/login", userLoginValidators, (req, res) => {
            this.userController.login(req, res);
        });
        this.userRouter.post("/register", userRegisterValidators, (req, res) => {
            this.userController.register(req, res);
        })
        this.userRouter.post("/upload", VerifyJwtToken, (req, res) => {
            this.userController.uploadFile(req, res);
        })
        this.userRouter.get("/getMyAllUploads", VerifyJwtToken, (req, res) => {
            this.userController.getSelfUserAllUploadFile(req, res);
        })
    }
}

export { UserRoute };