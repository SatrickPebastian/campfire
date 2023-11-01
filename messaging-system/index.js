const express = require("express");
const mongoose = require("mongoose");
const config = require("config");


const app = express();
app.use(express.json());

const robots = require("./routes/robots");
app.use("/api/robots", robots);

const adapter = require("./adapter/adapterCommunication");

mongoose
  .connect(config.mongodb_host)
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.log(err));

adapter.start();

app.listen(config.port, () => {
  console.log(`Server Running on Port ${config.port}`);
});