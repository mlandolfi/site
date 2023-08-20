import { getRandomBetween } from "../../utils";

export class Floater {
  boardWidth: number;
  boardHeight: number;
  maxR: number;
  minR: number;
  velocityMultiplier: number;
  boardPadding: number;
  radius: number = 1;
  vx: number = 1;
  vy: number = 1;
  x: number = 0;
  y: number = 0;
  id: number;

  constructor({
    boardWidth,
    boardHeight,
    maxR,
    minR,
    velocityMultiplier,
    boardPadding,
  }: {
    boardWidth: number;
    boardHeight: number;
    maxR: number;
    minR: number;
    velocityMultiplier: number;
    boardPadding: number;
    radius?: number;
  }) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    this.maxR = maxR;
    this.minR = minR;

    this.velocityMultiplier = velocityMultiplier;

    // this is how far particles outside the board can go before being destroyed
    this.boardPadding = boardPadding;

    this.id = getRandomBetween(0, 100000000, true);

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

export const createFloater = ({
  boardWidth,
  boardHeight,
  maxR,
  minR,
  velocityMultiplier,
  boardPadding,
}: {
  boardWidth: number;
  boardHeight: number;
  maxR: number;
  minR: number;
  velocityMultiplier: number;
  boardPadding: number;
  radius?: number;
}) => {
  return new Floater({
    boardWidth,
    boardHeight,
    maxR,
    minR,
    velocityMultiplier,
    boardPadding,
  });
};

const withinRangeOfMouse = (
  mousePos: { x: number; y: number },
  x: number,
  y: number,
  furthest: number,
  buffer: number = 5
) => {
  const { x: mouseX, y: mouseY } = mousePos;
  const dist = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
  return dist < furthest - buffer;
};

const lineDist = 150;
export const drawLines = ({
  particles,
  context,
  mousePos,
}: {
  particles: Floater[];
  context: CanvasRenderingContext2D;
  mousePos?: { x: number; y: number };
}): Array<number[]> => {
  const lines: Array<number[]> = [];

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length - 1; j++) {
      const outer = particles[i];
      const inner = particles[j];

      if (!context) {
        continue;
      }
      const furthest = 180;
      if (
        mousePos &&
        (!withinRangeOfMouse(mousePos, outer.x, outer.y, furthest) ||
          !withinRangeOfMouse(mousePos, inner.x, inner.y, furthest))
      ) {
        continue;
      }

      const pointDist = Math.sqrt(
        Math.pow(outer.x - inner.x, 2) + Math.pow(outer.y - inner.y, 2)
      );
      if (
        pointDist < lineDist &&
        !(outer.x === inner.x && outer.y === inner.y)
      ) {
        lines.push([outer.id, inner.id]);
        context.strokeStyle = `rgba(34, 162, 159, ${1 - pointDist / lineDist})`;
        context.beginPath();
        context.moveTo(outer.x, outer.y);
        context.lineTo(inner.x, inner.y);
        context.stroke();
        context.closePath();
      }
    }
  }

  return lines;
};

export const drawTriangles = ({
  particles,
  context,
  mousePos,
  lines,
}: {
  particles: Floater[];
  context: CanvasRenderingContext2D;
  mousePos: { x: number; y: number };
  lines: Array<number[]>;
}) => {
  const linesDict: Record<number, number[]> = {};
  lines.forEach(([id1, id2]) => {
    if (!linesDict[id1]) {
      linesDict[id1] = [id2];
    } else {
      linesDict[id1].push(id2);
    }
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length - 1; j++) {
      const outer = particles[i];
      const inner = particles[j];

      if (!context) {
        continue;
      }
      const furthest = 100;
      if (
        !withinRangeOfMouse(mousePos, outer.x, outer.y, furthest) ||
        !withinRangeOfMouse(mousePos, inner.x, inner.y, furthest)
      ) {
        continue;
      }

      context.fillStyle = `rgba(34, 162, 159, 0.4)`;
      linesDict[outer.id]?.forEach((id) => {
        if (linesDict[inner.id].includes(id)) {
          context.beginPath();
          context.moveTo(outer.x, outer.y);
          context.lineTo(inner.x, inner.y);
          context.lineTo(
            particles.find((p) => p.id === id)!.x,
            particles.find((p) => p.id === id)!.y
          );
          context.fill();
          context.closePath();
        }
      });
    }
  }
};
