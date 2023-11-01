const messagingWrapper = require("./messagingWrapper");
const { Robot, validate } = require("../models/robot");

let available_robots = [];

function getAvailabelRobots() {
  return available_robots;
}

async function start(host) {
  await messagingWrapper.start(host);

  messagingWrapper.receiveMessage("available_robots", (msg) => {
    available_robots = JSON.parse(msg.content.toString());
    console.log(available_robots);
  });
  await messagingWrapper.addQueue("added_robot");
  messagingWrapper.receiveMessage("added_robot", async (msg) => {
    const robot = new Robot({
      name: JSON.parse(msg.content.toString()),
    });
    await robot.save();
  });
}

exports.start = start;
exports.getAvailabelRobots = getAvailabelRobots;
