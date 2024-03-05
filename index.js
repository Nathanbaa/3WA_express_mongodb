import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3002;

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

const mongoDB =
  "mongodb+srv://nathanbdu50:gEG9Mo14jxTqai7Z@intro-express-mongo.mzcrcsz.mongodb.net/?retryWrites=true&w=majority&appName=Intro-express-mongo";

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to our API using mongo and express");
});

app.listen(port, () => console.log("Server is running on port" + " " + port));
