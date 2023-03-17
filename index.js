const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server);
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// serve static files from public directory
app.use(express.static('public'))

// features
// require('./twitch.js')(io);
require('./twitch.js')((message) => {
  io.emit("twitch", message);
  // io.emit("addBox", {
  //   key: id,
  //   timerDuration: '',
  //   title: message
  // });
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
