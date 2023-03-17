module.exports = function (io) {
  io.on("connection", socket => {
    socket.on("play", (message) => {
      console.log("play: ", message);
      socket.broadcast.emit("play", message);
    });
  });
}
