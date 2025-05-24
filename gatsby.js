class Gatsby {
  constructor() {
    this.r = 150;
    this.s = 97;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 3;
  }

  jump() {
    if (this.y == height -this.r) {
      this.vy = -35;
    }
  }

  hits(Girl) {
    return collideRectRect(this.x, this.y, this.s, this.r, Girl.x, Girl.y, Girl.s, Girl.r);
    
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y,0,height-this.r);
  }
  
  show() {
    image(gimg, this.x,this.y,this.s,this.r);
  }
}