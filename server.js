import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import "./src/database/mongodb";
import { router } from "./src/routes/index.routes";
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
})