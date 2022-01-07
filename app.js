const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.MONGO_URL, {}).then(() => {
  console.log("DB connection successful");
});

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(6000, () => console.log("Server up"));
