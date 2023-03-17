function StaticBox(x, y, w, h, angle) {
  this.w = w;
  this.h = h;
  this.body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
    angle
  });
  Matter.World.add(world, this.body);

  this.show = function () {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
