import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to our API using mongo and express");
});

app.use("/", authRouter, userRouter, postRouter);

app.listen(port, () => console.log("Server is running on port" + " " + port));
