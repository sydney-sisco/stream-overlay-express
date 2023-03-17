const socket = io();

window.onload = () => {};

const playAlarm = () => {
  // const audio = new Audio('media/alarm.mp3');
  const audio = document.getElementById("alarm");
  audio.play();

  // send play event to server
  socket.emit('play', { sound: 'alarm.mp3' });
};

socket.on('play', (data) => {
  console.log(data);
  // play sound from local file
  var audio = new Audio('media/' + data.sound);
  audio.play();
});
