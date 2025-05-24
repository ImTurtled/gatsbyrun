class Girl {
  constructor() {
    this.r = 150 * 2/3;
    this.s = 97 * 2/3;
    this.x = width;
    this.y = height - this.r;
    this.baseSpeed = 16;
    this.speed = this.calculateSpeed(score);
  }

  move() {
    this.x -= this.speed;
  }

  show() {
    image(girlimg1, this.x, this.y, this.s, this.r);
  }

  // Calculate speed based on current score
  calculateSpeed(currentScore) {
    return this.baseSpeed + (Math.floor(currentScore / 10) * 3);
  }

  // Update speed based on current score
  updateSpeed(currentScore) {
    this.speed = this.calculateSpeed(currentScore);
  }
}