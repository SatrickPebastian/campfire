#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

let channel = {};

async function start(host) {
  try {
    const connection = await startConnection(host);
    channel = await createChannel(connection);
      
  } catch (error) {
    console.log(error)    
  }
}

function startConnection(host) {
  console.log("Initializing Connection with %s", host);
  return new Promise((resolve, reject) => {
    amqp.connect(host, (error, connection) => {
      resolve(connection);
      reject(error);
    });
  });
}

function createChannel(connection) {
  return new Promise((resolve, reject) => {
    connection.createChannel((error, channel) => {
      resolve(channel);
      reject(error);
    });
  });
}

async function addQueue(queue_name)
{
  await channel.assertQueue(queue_name, {
    durable: false,
  })
}

function sendMessage(message) {
  channel.assertQueue(message.queue, {
    durable: true,
  });
  const actual_message = Buffer.from(JSON.stringify(message.msg));
  channel.sendToQueue(message.queue, actual_message);

  console.log(" [x] Sent %s", actual_message);
}

function receiveMessage(queue, callback) {
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(
    queue,
    callback,
    {
      noAck: true,
    }
  );
}

function closeConnection(connection) {
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}




exports.start = start;
exports.receiveMessage = receiveMessage;
exports.addQueue = addQueue;
exports.sendMessage = sendMessage;
exports.close = closeConnection;
