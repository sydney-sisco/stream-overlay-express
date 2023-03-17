// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
let engine;
let world;
const boxes = [];
const plinkos = [];
cols = 16;
rows = 8;


let ground = [];

function setup() {
  createCanvas(1280, 720);

  engine = Engine.create();
  // engine.timing.timeScale = 0.5;
  world = engine.world;
  Engine.run(engine)


  // angled ground
  ground.push(new StaticBox(15, height - 100, 500, 20, 0.2));
  // ground.push(new StaticBox(width / 5 * 5, height - 10, width/ 2, 20, -0.1));

  // angled piece for orbs to bounce off
  ground.push(new StaticBox(250, 25, 50, 100, 1.2));


  // left side walls
  ground.push(new StaticBox(0, height / 2, 20, height, 0));
  ground.push(new StaticBox(200, height / 4, 20, height/5*4.5, 0));
  ground.push(new StaticBox(300, 400, 20, 600, 0));

  // bottom
  ground.push(new StaticBox(width / 2, height, width, 20, 0));
  
  // ground.push(new StaticBox(270, 570, 80, 250));
  // sensor to shrink the orbs
  var collider = Bodies.rectangle(270, 570, 80, 250, {
    isSensor: true,
    isStatic: true,
  });
  Matter.World.add(world, collider);

  // SHOOT THE ORB INTO THE SKY
  Matter.Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;

    let orb = null;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA === collider) {
        console.log('collided with', pair.bodyB.label);
        orb = pair.bodyB;

      } else if (pair.bodyB === collider) {
        console.log('collided with', pair.bodyA.label);
        orb = pair.bodyA;
      }
    }
    //find the orb
    if (orb) {
      boxes.forEach(box => {
        if (box.body === orb) {
          box.shrink();
        }
      });
    }
  });

  // plinkos
  const offset = 350;
  var spacing = (width - offset) / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(offset + x, 100 + y, 16);
      plinkos.push(p);
    }
  }

  // bottom boundaries
  for (let i = 0; i < cols + 2; i=i+2) {
    var x = offset + i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    // var b = new Boundary(x, y, w, h);
    // bounds.push(b);
    ground.push(new StaticBox(x, y, w, h, 0));

  }
}

function newBox(x, y, w, h, label) {
  boxes.push(new Box(x, y, w, h, label));
}

function mousePressed() {
  // boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
  // newBox(mouseX, mouseY - 200, 8, 50, 'futureSydney: ffffffff');
  // create box at random location
  // newBox(random(0, width), -50, 8, 50, 'futureSydney: ffffffff');

  // randomly above the screen
  // boxes.push(new Circle(random(0, width), -50, 50, 'futureSydney: ffffffff'));

  // plinko drop
  boxes.push(new Circle(100, -50, 50, 'futureSydney:\nffffffff'));
}

function draw() {
  background(51);

  boxes.forEach(box => {
    box.show();
  });

  ground.forEach(box => {
    box.show();
  });

  plinkos.forEach(p => {
    p.show();
  });
}

var shakeScene = function () {
  // loop through boxes and apply force
  boxes.forEach(box => {
    Matter.Body.applyForce(box.body, box.body.position, {
      x: random(-0.5, 0.5),
      y: random(-0.5, 0.5),
    });
  });
};