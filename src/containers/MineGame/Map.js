import Bucket from './objects/Bucket';
import { RawDirt } from './objects/Piles';

const CHANCES = [
	{ lowChance: 0.5, mediumChance: 0.25,  highChance: 0.2, superChance: 5, healthLow: 40, healthHigh: 60 },
	{ lowChance: 0.4, mediumChance: 0.3,  highChance: 0.2, superChance: 0.1, healthLow: 60, healthHigh: 100 },
	{ lowChance: 0.3, mediumChance: 0.35,  highChance: 0.2, superChance: 0.15, healthLow: 100, healthHigh: 150 },
	{ lowChance: 0.2, mediumChance: 0.2,  highChance: 0.4, superChance: 0.2, healthLow: 150, healthHigh: 200 },
]

const VOLUMES = [
	{ low: 15, high: 20 },
	{ low: 20, high: 25 },
	{ low: 25, high: 30 },
	{ low: 30, high: 35 },
]

const CONCENTRATONS = [
	{ low: 0, high: 0.5 },
	{ low: 0.5, high: 1 },
	{ low: 1, high: 2 },
	{ low: 3, high: 5 },
]

const COLORS = {
	water: 'skyblue',
	dirt: '#9b7653',
	tree: 'green',
}

function getChance(level) {
	if (level > 75)
		return CHANCES[0];
	else if (level > 50)
		return CHANCES[1];
	else if (level > 25)
		return CHANCES[2];
	else
		return CHANCES[3];
}

function getVolume(level) {
	if (level > 75)
		return VOLUMES[0];
	else if (level > 50)
		return VOLUMES[1];
	else if (level > 25)
		return VOLUMES[2];
	else
		return VOLUMES[3];
}

function getConcentration(chances) {
	const selection = Math.random();
	if (selection < chances.lowChance)
		return CONCENTRATONS[0]
	else if (selection < (chances.lowChance + chances.mediumChance))
		return CONCENTRATONS[1]
	else if (selection < (chances.lowChance + chances.mediumChance + chances.highChance))
		return CONCENTRATONS[2]
	else
		return CONCENTRATONS[3]
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Block {

	constructor(level) {
		// if (level instanceof Block) {
		// 	this.chances = level.chances;
		// 	this.health = level.health;
		// 	this.volume = level.volume;
		// 	this.concentrations = level.concentrations;
		// 	this.goldTotal = level.goldTotal;
		// 	this.goldPerHit = level.goldPerHit;
		// 	this.dirtPerHit = level.dirtPerHit;
		// 	return;
		// }
		this.chances = getChance(level)
		// setting the health of the block, rounded to an int
		this.health = Math.round(getRandomNumber(this.chances.healthLow, this.chances.healthHigh));
		// getting the amount of gold in the block
		this.concentrations = getConcentration(this.chances);
		// setting the pile to be used by the block for dirt/gold management
		const dirtAmount = Math.round(getRandomNumber(getVolume(level).low, getVolume(level).high))
		const goldAmount = Math.round(getRandomNumber(this.concentrations.low, this.concentrations.high) * 1000) / 1000;
		this.pile = new RawDirt(dirtAmount, goldAmount);
		// getting amount of gold from each hit, rounded to 3 decimal places
		this.goldPerHit = Math.round(this.goldTotal / this.health * 1000) / 1000
		// getting amounr of dirt from each hit, rounded to 3 decimal places
		this.dirtPerHit = Math.round(dirtAmount / this.health * 1000) / 1000

	}

	hit() {
		this.health -= 1;
		return this.pile.take(this.dirtPerHit);
	}

	prospectHit() {
		return this.pile.prospectTake(this.dirtPerHit);
	}

}

class Square {

	// rawInfo is the objects in rawMap
	constructor(rawInfo) {
		// if (rawInfo instanceof Square) {	// copy constructor essentially
		// 	this.height = rawInfo.height;
		// 	this.treeHeight = rawInfo.treeHeight;
		// 	this.waterHeight = rawInfo.waterHeight;
		// 	this.worker = rawInfo.worker;
		// 	this.onGround = rawInfo.onGround
		// 	this.items = rawInfo.items;
		// 	this.blocks = rawInfo.blocks;
		// 	return;
		// }
		this.height = 10 + rawInfo.height;
		this.treeHeight = rawInfo.treeHeight;
		this.waterHeight = rawInfo.waterHeight;
		this.onGround = null;
		this.worker = null;
		this.items = [];

		this.buildBlocks();
	}

	buildBlocks() {
		this.blocks = [];
		for (let i=0; i<this.height; i++) {
			this.blocks.push(new Block(i));
		}
	}

	getTopBlock() {
		return this.blocks[this.blocks.length-1];
	}

	removeTopBlock() {
		this.blocks.pop();
		this.height -= 1;
	}

	dropItem(item) {
		this.onGround = item;
	}

	pickUpItem() {
		const temp = this.onGround;
		this.onGround = null;
	}

	hasWorker() {
		return this.worker !== null;
	}

	workerLeft() {
		this.worker = null;
	}

	workerArrived(worker) {
		this.worker = worker;
	}

	prospectHit() {
		return this.getTopBlock().prospectHit();
	}

	hit() {
		const topBlock = this.getTopBlock();
		const pileFromHit = topBlock.hit();
		if (topBlock.health === 0)
			this.blocks.pop();
		return pileFromHit;
	}

	getColor() {
		if (this.waterHeight > 0)
			return COLORS.water;
		else if (this.treeHeight > 0)
			return COLORS.tree;
		else
			return COLORS.dirt;
	}

	getText() {
		let retVal = `H: ${this.height}\n`;
		if (this.worker !== null)
			retVal += `${this.worker.name}\n`;
		if (this.waterHeight > 0)
			retVal += `W: ${this.waterHeight}\n`;
		if (this.treeHeight > 0)
			retVal += `T: ${this.treeHeight}`;

		return retVal;
	}

}


export const MAP_WIDTH = 6;
export const MAP_LENGTH = 6;

// height = above/below 100, below is negaitve
// treeHeight = height of tree
// waterHeight = amount above 'height', can't be more than heights around it
const rawMap = [
	{ height: 0, treeHeight: 4, waterHeight: 0 }, { height: 1, treeHeight: 4, waterHeight: 0 }, { height: 0, treeHeight: 5, waterHeight: 0 }, { height: -1, treeHeight: 0, waterHeight: 1 }, { height: -2, treeHeight: 0, waterHeight: 2 }, { height: 1, treeHeight: 0, waterHeight: 0 },
	{ height: 0, treeHeight: 4, waterHeight: 0 }, { height: 1, treeHeight: 5, waterHeight: 0 }, { height: 0, treeHeight: 4, waterHeight: 0 }, { height: -1, treeHeight: 0, waterHeight: 1 }, { height: -2, treeHeight: 0, waterHeight: 2 }, { height: 1, treeHeight: 0, waterHeight: 0 },
	{ height: 0, treeHeight: 0, waterHeight: 0, sw: 1 }, { height: 1, treeHeight: 0, waterHeight: 0 }, { height: 1, treeHeight: 0, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 }, { height: -1, treeHeight: 0, waterHeight: 1 }, { height: -2, treeHeight: 0, waterHeight: 2 },
	{ height: 0, treeHeight: 0, waterHeight: 0 }, { height: 1, treeHeight: 0, waterHeight: 0 }, { height: 1, treeHeight: 0, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 },
	{ height: 1, treeHeight: 3, waterHeight: 0 }, { height: 1, treeHeight: 3, waterHeight: 0 }, { height: 1, treeHeight: 4, waterHeight: 0 }, { height: 1, treeHeight: 3, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 },
	{ height: 2, treeHeight: 3, waterHeight: 0 }, { height: 2, treeHeight: 4, waterHeight: 0 }, { height: 2, treeHeight: 5, waterHeight: 0 }, { height: 1, treeHeight: 4, waterHeight: 0 }, { height: 1, treeHeight: 2, waterHeight: 0 }, { height: 0, treeHeight: 0, waterHeight: 0 },
]

const builtMap = [];
for (let i=0; i<rawMap.length; i++) {
	builtMap.push(new Square(rawMap[i]));
}
export default builtMap;

