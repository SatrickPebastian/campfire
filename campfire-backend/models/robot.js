const Joi = require("joi");
const mongoose = require("mongoose");

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 255 }
});

const Robot = new mongoose.model("Robot", robotSchema);


function validateRobot(robot) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(robot);
  }


exports.Robot = Robot;
exports.validate = validateRobot;

