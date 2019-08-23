
export default class Bucket {

	constructor(capacity) {
		this.capacity = capacity;
		this.pile = null;
	}

	canAdd(pile) {
		if (this.pile === null) {
			return pile.size() <= this.capacity;
		} else {
			return this.pile.constructor === pile.constructor && this.pile.size() + pile.size() <= this.capacity
		}
	}

	canTake(amount) {
		return amount >= this.pile.size();
	}

	addPile(pile) {
		if (this.pile === null)
			this.pile = pile;
		else
			this.pile.add(pile);
	}

	takePile(amount) {
		return this.pile.take(amount);
	}

	toString() {
		let retVal = 'Bucket:\n';
		retVal += `capacity: ${this.capacity}\n`
		retVal += `holding: ${this.pile ? this.pile.toString() : 'nothing'}`
		return retVal;
	}
	
}