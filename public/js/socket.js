const socket = io();


socket.on('twitch', function (data) {
  console.log(data);
  boxes.push(new Circle(100, -50, 50, `${data.user}:\n${data.message}`));
});
