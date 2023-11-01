const router = require("express").Router();
const { Robot, validate } = require("../models/robot");
const messagingWrapper = require("../messaging/messagingWrapper");
const messagingHandler = require("../messaging/messagingHandler");


router.post("/update", (req, res) => {
  req.body.robotIds.forEach(async (robotId) => {
    const robot = await Robot.findById(robotId);
    if (!robot) return res.status(400).send("Robot not found");

    //todo: get all robots from msg body and add them to the message to be sent to the queue
    const message = {
      queue: "campfire",
      msg: {
        function: req.body.msg.function,
        package: req.body.msg.package,
        robot_name: robot.name,
      },
    };
    messagingWrapper.sendMessage(message);
  });
  res.send("sent"); // todo: implement RPC to let the UI knows if the robots are actually updated
});

router.get("/availablerobots", async (req, res) => {
  const available_robots = messagingHandler.getAvailabelRobots();
  res.send(available_robots);
});

router.get("/", async (req, res) => {
  try {
    const robots = await Robot.find().sort();
    res.send(robots);
  } catch (ex) {
    res.status(400).send(ex.errors.message);
  }
});


module.exports = router;