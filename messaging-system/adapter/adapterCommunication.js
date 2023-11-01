#!/usr/bin/env node

/**
@file This script receives messages from a message queue and performs actions based on the received messages.
@version 0.0.1
*/

const { Robot, validate } = require("../models/robot");
const connection_handler = require("../messaging/messagingWrapper");
const config = require("config");
const ping = require("ping");
const axios = require("axios");
const fs = require("fs");
const { NodeSSH } = require("node-ssh");

const ssh = new NodeSSH();
const debians_path = "./debians/";

async function start() {
  await connection_handler.start(config.amqp_host);
  await sendAvailableRobots();
  var intervalId = setInterval(sendAvailableRobots, 5000);
  await connection_handler.addQueue('campfire')
  const queue_name = "campfire";
  connection_handler.receiveMessage(queue_name, handleMessage);
}

//todo: this doesn't have to be async (maybe)
async function sendAvailableRobots() {
  //todo: This function can cause problems if we have too many robots
  let available_robots = [];
  const robots = await Robot.find();
  for (const robot of robots) {
    const robot_name = robot.name;
    if (await isRobotReachable(robot.ssh_data.ip)) {
      available_robots.push(robot_name);
    }
  }
  connection_handler.sendMessage({
    queue: "available_robots",
    msg: available_robots,
  });
}

async function isRobotReachable(host) {
  try {
    const isAlive = await ping.promise.probe(host, { timeout: 1 });
    return isAlive.alive;
  } catch (error) {
    return false;
  }
}
async function handleMessage(msg) {
  //todo: validate msg
  const function_name = JSON.parse(msg.content.toString()).function;
  const package = JSON.parse(msg.content.toString()).package;
  const robot_name = JSON.parse(msg.content.toString()).robot_name;
  const robot = await Robot.findOne({ name: robot_name });
  switch (function_name) {
    case "update":
      return await updateApp(package, robot);
    case "remove":
      return await removeApp(package, robot);
  }
}


// todo: This function should be an abstract function. Every user can implement it differently
async function updateApp(package, robot) {
  const application_fullname = package.name +"-"+ package.version;
  console.log("Updating App... %s in robot : %s ", application_fullname, robot.name);

  await getFile(application_fullname, debians_path + application_fullname + ".deb");

  //todo: maybe verify if this file is an actual neura file?

  sendFileToRobot(
    application_fullname + ".deb",
    robot.ssh_data //todo: This can be hashed in the database
  );
}

async function removeApp(url, ip) {}

async function getFile(application_fullname, outputPath) {
  try {
    const response = await axios(
      "http://campfire-backend:3000/api/applications/"+application_fullname,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        responseType: "stream",
      }
    );
    response.data.pipe(fs.createWriteStream(outputPath));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    throw new Error(`Error downloading the Debian file: ${error}`);
  }
}

async function sendFileToRobot(application_filepath, ssh_data) {
  const destination_path = "/home/" + ssh_data.username + "/" + application_filepath;
  await ssh.connect({
    host: ssh_data.ip,
    username: ssh_data.username,
    privateKeyPath: config.privateKeyPath,
    port: ssh_data.port,
  });
  await ssh.putFile(debians_path + application_filepath, destination_path);
  // fs.unlinkSync(debians_path + application_filepath);
}

exports.start = start;
