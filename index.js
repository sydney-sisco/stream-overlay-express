const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server);
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

// serve static files from public directory
app.use(express.static('public'))


require('./twitch.js')((message) => {
  io.emit("twitch", message);

  const boxId = uuidv4();

  io.emit("addBox", {
    ...message,
    // random between 140 and 500 
    left: Math.floor(Math.random() * (500 - 40 + 1) + 40),
    // random between 30 and 500
    top: Math.floor(Math.random() * (500 - 30 + 1) + 30),
    duration: '',
    title: `${message.user}: ${message.message}`,
  });
});



require('./timers.js')(io);
require('./sounds.js')(io);

io.on('connection', (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// get port from env var
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
