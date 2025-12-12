import express from "express";
import connectToMongoDB from "./config/mongodb.config.js";
import dotenv from "dotenv";
import { getWeatherData } from "./controller/getWeatherData.controller.js";
import { getForecastData } from "./controller/getForecastData.controller.js";
import { saveSearchHistory, getSearchHistory } from "./controller/searchHistory.controller.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

connectToMongoDB(process.env.MONGODB_URI);

app.get("/getweatherdata", getWeatherData);
app.get("/getforecastdata", getForecastData);
app.post("/savesearch", saveSearchHistory);
app.get("/getsearchhistory", getSearchHistory);

app.listen(PORT, () => {
  console.log("app is running at http://localhost:3000");
});
