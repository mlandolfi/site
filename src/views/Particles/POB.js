export default class POB {
  constructor(
    boardWidth,
    boardHeight,
    maxR,
    minR,
    velocityMultiplier,
    boardPadding
  ) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    this.maxR = maxR;
    this.minR = minR;

    this.velocityMultiplier = velocityMultiplier;

    this.boardPadding = boardPadding;

    this.generate();
  }

  _getRandomV = () => {
    return 0.5 + Math.random() * (0.8 - 0.5);
  };

  generate(smooth = false) {
    this.radius =
      Math.floor(Math.random() * (this.maxR - this.minR + 1)) + this.minR;

    this.vx =
      this._getRandomV() *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    this.vy =
      this._getRandomV() *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    // this.vx = Math.random() < 0.5 ? 1 : -1;
    // this.vy = Math.random() < 0.5 ? 1 : -1;

    this.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
    this.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

    if (!smooth) return;

    if (Math.random() < 0.5)
      this.x =
        this.vx > 0
          ? -1 * this.boardPadding
          : this.boardWidth + this.boardPadding;
    else
      this.y =
        this.vy > 0
          ? -1 * this.boardPadding
          : this.boardHeight + this.boardPadding;
  }

  moveAndGet() {
    this.x += this.vx;
    this.y += this.vy;
    if (
      this.x > this.boardWidth + this.boardPadding ||
      this.x < -1 * this.boardPadding
    ) {
      this.generate(true);
    } else if (
      this.y > this.boardHeight + this.boardPadding ||
      this.y < -1 * this.boardPadding
    ) {
      this.generate(true);
    }
    return [Math.ceil(this.x), Math.ceil(this.y)];
  }
}
