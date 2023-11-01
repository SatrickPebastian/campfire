const Joi = require("joi");
const mongoose = require("mongoose");

const ipv4Pattern =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 255 },
  ssh_data: { type: Object, required: true },
});

const Robot = new mongoose.model("Robot", robotSchema);

function validateRobot(robot) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    host: Joi.string().min(2).max(255).required(),
    ip: Joi.string().ip({ version: "ipv4" }).required() ,
    username: Joi.string().min(2).required(),
    port: Joi.number().integer().required(),
  });
  return schema.validate(robot);
}

exports.Robot = Robot;
exports.validate = validateRobot;
