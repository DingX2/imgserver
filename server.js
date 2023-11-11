import dotenv from "dotenv";

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import imageRoute from "./routes/image-route.js";

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Image Route
app.use("/api/v1/image", imageRoute);

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server Listening From PORT ${process.env.PORT}`);
});
