const socket = io();

socket.on('play', (data) => {
  console.log(data);
  // play sound from local file
  var audio = new Audio('media/' + data.sound);
  audio.play();
});

socket.on('addBox', (boxData) => {
  console.log('addBox', boxData);
  newBox(boxData);
});

socket.on('deleteBox', (boxData) => {
  console.log('deleteBox', boxData);
  const box = document.getElementById(boxData.id);
  if (box) {
    box.remove();
  }
});

socket.on('moveBox', ({left, top, id}) => {
  console.log('moveBox', { left, top, id });
  const box = document.getElementById(id);
  if (box) {
    box.style.left = left + 'px';
    box.style.top = top + 'px';
  }
});
