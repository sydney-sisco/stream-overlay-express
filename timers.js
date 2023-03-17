

// assign a random color to each socket
let colorIndex = 0;
const colors = [
  '#9400d3',
  '#4b0082',
  '#0000ff',
  '#00ff00',
  '#ffff00',
  '#ff7f00',
  '#ff0000',
];
const getNextColor = () => {
  // const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return colorIndex;
};
module.exports = function (io) {

  io.on("connection", socket => {
  
    // assign a color to each socket for cursor
    socket.color = getNextColor();
  
    // drag and drop
    socket.on("moveBox", (message) => {
      console.log("moveBox", message);
      socket.broadcast.emit("moveBox", message);
    });
  
    socket.on("addBox", (message) => {
      console.log("addBox: ", message);
      socket.broadcast.emit("addBox", message);
    });
  
    socket.on("deleteBox", (message) => {
      console.log("deleteBox: ", message);
      socket.broadcast.emit("deleteBox", message);
    });
  
  
    // cursor share
    socket.on("cursor", (message) => {
      console.log("cursor: ", message);
  
      // socket.broadcast.emit("cursor", {...message, id: socket.id, color: socket.color});
      io.emit("cursor", { ...message, id: socket.id, color: socket.color });
    });
  });
};
