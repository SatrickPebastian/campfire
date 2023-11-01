#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

let channel = {};

async function start(host) {
  const connection = await startConnection(host);
  channel = await createChannel(connection);
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
  await channel.assertQueue(queue_name)
}

function sendMessage(message) {
  channel.assertQueue(message.queue, {
    durable: false,
  });
  const actual_message = Buffer.from(JSON.stringify(message.msg));
  channel.sendToQueue(message.queue, actual_message);

  console.log(" [Messaging System] Sent %s in Queue: %s", actual_message, message.queue);
}

function receiveMessage(queue, callback) {
  console.log(" [Messaging System] Waiting for messages in %s. To exit press CTRL+C", queue);
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
exports.sendMessage = sendMessage;
exports.close = closeConnection;
