function Box(x, y, w, h, label) {
  // const options = {
  //   friction: 0.3,
  //   restitution: 0.6
  // }

  if (label) {
    this.label = label;
    this.w = w * label.length;
  } else {
    this.w = w;
    this.label = '';
  }
  this.h = h;
  
  this.body = Bodies.rectangle(x, y, this.w, this.h);
  Matter.World.add(world, this.body);

  this.show = function() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(255);
    rect(0, 0, this.w, this.h);
    pop();
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(0);
    text(label ? label : '', 0, 0);
    pop();
  }
}
