function Circle(x, y, radius, label) {
  this.hue = random(360);
  this.label = label;
  this.radius = radius;
  this.body = Bodies.circle(x, y, radius, {
    // restitution: 0.5,
    // friction: 0,
    // density: 1
  });
  Matter.World.add(world, this.body);
  this.shrank = false;

  // Matter.Events.on(engine, 'collisionStart', function (event) {
  //   var pairs = event.pairs;
  //   for (var i = 0, j = pairs.length; i != j; ++i) {
  //     var pair = pairs[i];
  //     // if (pair.bodyA === this.body || pair.bodyB === this.body) {
  //     //   console.log('Circle collided with', pair.bodyA.label, pair.bodyB.label);
  //     //   // enlarge the circle
  //     //   this.radius *= .9;
  //     //   // this.body = Bodies.circle(x, y, this.radius);
  //     //   // Matter.World.add(world, this.body);
  //     //   Matter.Body.scale(this.body, .9, .9);

  //     // }
  //   }
  // }.bind(this));


  this.shrink = function () {
    if (this.shrank) {
      Matter.Body.applyForce(this.body, this.body.position, {
        x: 0,
        y: random(-0.04, -0.09)
      });
      return;
    }

    this.label = '';

    const scaleFactor = .25;

    this.shrank = true;
    this.radius *= scaleFactor;
    Matter.Body.scale(this.body, scaleFactor, scaleFactor);

    // 3 seconds later apply a force to the circle
    setTimeout(() => {
      Matter.Body.applyForce(this.body, this.body.position, {
        x: 0,
        y: random(-0.04, -0.09)
      });
    }
      , 1500);

  }
  

  this.show = function () {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    colorMode(HSB);
    fill(this.hue, 255, 255);
    ellipse(0, 0, this.radius * 2);
    pop();
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    // rectMode(CENTER);
    fill(255);
    textAlign(CENTER, CENTER);
    text(this.label ? this.label : '', 0, 0);
    pop();
  }
}