const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const robots = require("./routes/robots");
const applications = require("./routes/applications");
var http = require("http");

const cors = require("cors");
const messagingHandler = require("./messaging/messagingHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/robots", robots);
app.use("/api/applications", applications);

messagingHandler
  .start(config.amqp_host)
  .then(() => console.log(`Started AMQP Host: ${config.amqp_host}`))
  .catch((err) => console.log(err));

mongoose
  .connect(config.mongodb_host)
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.log(err));

// const options = {
//   key: fs.readFileSync('path/to/private/key.pem'),
//   cert: fs.readFileSync('path/to/certificate.pem')
// };

http.createServer(app).listen(5000, () => {
  console.log("Server listening on port 443");
  console.log("Test. Please delete later. Even more tests.");
});

app.listen(config.port, () => {
  console.log(`Server Running on Port ${config.port}`);
});
