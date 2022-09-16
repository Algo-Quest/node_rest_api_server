import mongoose from "mongoose";
import { MongoDbConfig } from "../config/database/db.mongodb";

const mongoDbConfig = new MongoDbConfig();
const { connection } = mongoose;

connection.once("open", () => console.log("mongodb connection established"));
connection.on("error", () => console.log("error while establishing mongodb database connection"));

const mongo_db_url = `${mongoDbConfig.databaseURL}:${mongoDbConfig.databasePort}/${mongoDbConfig.databaseName}`

mongoose.connect(mongo_db_url);


export default connection;
