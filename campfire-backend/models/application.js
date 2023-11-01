const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 255 },
  url: { type: String, required: true, minlength: 4, maxlength: 255 }
});

const Application = new mongoose.model("Application", applicationSchema);

exports.Application = Application;

