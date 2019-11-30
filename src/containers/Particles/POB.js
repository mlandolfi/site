


export default class POB {

	constructor(boardWidth, boardHeight, maxR, minR, velocityMultiplier, boardPadding) {
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;

		this.maxR = maxR;
		this.minR = minR;

		this.velocityMultiplier = velocityMultiplier;

		this.boardPadding = boardPadding;

		this.generate();

	}

	generate(smooth=false) {

		this.radius = Math.floor(Math.random() * (this.maxR - this.minR + 1)) + this.minR;

		// this.vx = Math.random() * (this.x%2 ? 1 : -1) * (this.maxR+1-this.radius) * this.velocityMultiplier
		// this.vy = Math.random() * (this.y%2 ? 1 : -1) * (this.maxR+1-this.radius) * this.velocityMultiplier

		this.vx = Math.random() * (Math.random() < 0.5 ? 1 : -1) * this.velocityMultiplier;
		this.vy = Math.random() * (Math.random() < 0.5 ? 1 : -1) * this.velocityMultiplier;

		this.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
		this.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

		if (!smooth)	return;

		if (Math.random() < 0.5)
			this.x = this.vx > 0 ? 0 : this.boardWidth;
		else
			this.y = this.vy > 0 ? 0 : this.boardHeight;
	}

	moveAndGetX() {
		this.x += this.vx;
		if (this.x > this.boardWidth + this.boardPadding || this.x < 0-this.boardPadding) {
			this.generate(true);
		}
		return this.x;
	}

	moveAndGetY() {
		this.y += this.vy;
		if (this.y > this.boardHeight + this.boardPadding || this.y < 0-this.boardPadding) {
			this.generate(true);
		}
		return this.y;
	}

}