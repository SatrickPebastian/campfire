const router = require("express").Router();
const { Robot, validate } = require("../models/robot");
const connection_handler = require("../messaging/messagingWrapper");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let robot = new Robot({
      name: req.body.name,
      ssh_data: {
        host: req.body.host,
        username: req.body.username,
        port: req.body.port,
        ip: req.body.ip
      },
    });

    await robot.validate();
    robot = await robot.save();
    res.send(robot);

    connection_handler.sendMessage({
      queue: "added_robot",
      msg: robot.name,
    });

  } catch (ex) {
    console.log(ex)
    res.status(400).send(ex);
  }
});
module.exports = router;
