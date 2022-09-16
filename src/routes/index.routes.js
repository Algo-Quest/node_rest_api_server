import express from "express";
const router = express.Router();
import { UserRoute } from "./user.routes";

const routesMapper = [
    new UserRoute().userRouter
];


router.use("/api/", routesMapper);

export { router };