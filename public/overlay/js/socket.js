const socket = io();

const boxes = [
  { top: 60, left: 0, title: '↘️', id: '0' },
  { top: 60, left: 640, title: '↙️', id: '1' },
  { top: 480, left: 0, title: '↗️', id: '2' },
  { top: 480, left: 640, title: '↖️', id: '3' }
]

window.onload = () => {
  draggable(document.getElementById('orb'));

  const target = document.getElementById("droptarget");
  target.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
  });

  // create the initial boxes
  boxes.forEach((box) => {
    newBox(box.left, box.top, box.title);
  });

};

const playAlarm = () => {
  const audio = document.getElementById("alarm");
  audio.play();

  // send play event to server
  socket.emit('play', { sound: 'alarm.mp3' });
};

const playBell = () => {
  const audio = document.getElementById("bell");
  audio.play();
};

socket.on('play', (data) => {
  console.log(data);
  // play sound from local file
  var audio = new Audio('media/' + data.sound);
  audio.play();
});

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  const interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      display.textContent = 'done!'
      playBell();
      clearInterval(interval);
    }
  }, 1000);
}

const newBox = (x, y, title, duration) => {
  const box = document.createElement('div');
  box.classList.add('orb');


  const para = document.createElement("p");
  para.classList.add('orb-label');
  const node = document.createTextNode(title);
  para.appendChild(node);
  box.appendChild(para);

  // set the timer if it exists
  if (duration) {
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    box.appendChild(timerDisplay);
    startTimer(duration, timerDisplay);
  }

  box.style.left = `${x || 0}px`;
  box.style.top = `${y || 0}px`
  document.body.appendChild(box);
  draggable(box, x || 0, y || 0);
};

const newBoxHandler = () => {
  // get text from input or default to a random emoji
  const text = document.getElementById('label').value || randomEmoji();
  // clear the input
  document.getElementById('label').value = '';
  
  
  // get the value from the timer input
  const timer = document.getElementById('timer').value || null;
  // clear the input
  document.getElementById('timer').value = '';

  newBox(0, 0, text, timer);
};

function draggable(element, initialX, initialY) {
  var isMouseDown = false;

  // initial mouse X and Y for `mousedown`
  var mouseX;
  var mouseY;

  // element X and Y before and after move
  var elementX = initialX || 0;
  var elementY = initialY || 0;

  // mouse button down over the element
  element.addEventListener('mousedown', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMouseDown = true;
  });

  // mouse button released
  element.addEventListener('mouseup', (event) => {
    isMouseDown = false;
    elementX = parseInt(element.style.left) || 0;
    elementY = parseInt(element.style.top) || 0;

    const { x, y, width, height } = document.getElementById('droptarget').getBoundingClientRect();
    if (event.clientX > x && event.clientX < x + width && event.clientY > y && event.clientY < y + height) {
      // delete the box
      element.remove();
    }
  });

  // need to attach to the entire document
  // in order to take full width and height
  // this ensures the element keeps up with the mouse
  document.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return;
    
    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;
    element.style.left = Math.max(elementX + deltaX, 0) + 'px';
    element.style.top = Math.max(elementY + deltaY, 0) + 'px';
  });
}
