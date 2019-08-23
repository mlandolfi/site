import Bucket from './Bucket';
import { RawDirt } from './Piles';

export default class Worker {

	constructor(name, inventory) {
		this.name = name;
		this.inventory = inventory || [];
	}

	pickUp(item) {
		this.inventory.push(item);
	}

	drop(itemIndex) {
		return this.inventory.splice(itemIndex, 1)[0];
	}

	getBucketToStorePile(pile) {
		for (let i=0; i<this.inventory.length; i++) {
			if (this.inventory[i] instanceof Bucket && this.inventory[i].canAdd(pile)) {
				return this.inventory[i];
			}
		}
		return null;
	}

	getBucketToPan() {
		for (let i=0; i<this.inventory.length; i++) {
			if (this.inventory[i] instanceof Bucket && this.inventory[i].pile instanceof RawDirt) {
				return this.inventory[i];
			}
		}
		return null;
	}

}