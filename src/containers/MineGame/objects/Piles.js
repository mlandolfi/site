
export class RawDirt {

	constructor(dirtAmount, goldAmount) {
		this.dirtAmount = dirtAmount;
		this.goldAmount = goldAmount;
	}

	// given a RawDirt object
	add(dirt) {
		this.dirtAmount += dirt.dirtAmount;
		this.goldAmount += dirt.goldAmount;
	}

	// returns new object like self but different values
	take(dirtAmount) {
		const goldAmount = Math.round(dirtAmount / this.dirtAmount+1000)/1000 * this.goldAmount;
		this.dirtAmount -= dirtAmount;
		this.goldAmount -= goldAmount;
		if (this.dirtAmount === 0)
			return null;
		return new RawDirt(dirtAmount, goldAmount);
	}

	prospectTake(dirtAmount) {
		const goldAmount = Math.round(dirtAmount / this.dirtAmount+1000)/1000 * this.goldAmount;
		return new RawDirt(dirtAmount, goldAmount);
	}

	process() {
		return {
			gold: this.goldAmount,
			proccessedDirt: new ProcessedDirt(this.dirtAmount),
		}
	}

	size() {
		return this.dirtAmount;
	}

	toString() {
		return `${this.dirtAmount.toFixed(3)} of raw dirt`;
	}

}

export class ProcessedDirt {

	constructor(amount) {
		this.amount = amount;
	}

	add(dirt) {
		this.amount += dirt.amount;
	}

	take(amount) {
		this.amount -= amount;
		if (this.amount === 0)
			return null;
		return new ProcessedDirt(amount);
	}

	size() {
		return this.amount;
	}

	toString() {
		return `${this.amount} of processed dirt`;
	}

}

export class Gold {

	constructor(amount) {
		this.amount = amount;
	}

	add(gold) {
		this.amount += gold.amount;
	}

	take(amount) {
		this.amount -= amount;
		if (this.amount === 0)
			return null;
		return new Gold(amount);
	}

	size() {
		return this.amount;
	}

	toString() {
		return `${this.amount} of gold`;
	}

}