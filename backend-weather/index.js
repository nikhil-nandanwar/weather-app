import express from "express";
import connectToMongoDB from "./config/mongodb.config.js";
import dotenv from "dotenv";
import { getWeatherData } from "./controller/getWeatherData.controller.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

connectToMongoDB(process.env.MONGODB_URI);

app.get("/getweatherdata", getWeatherData);

app.listen(PORT, () => {
  console.log("app is running at http://localhost:3000");
});
