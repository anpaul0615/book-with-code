export default class Set {
	private items: { [key:string] : any };
	private size: number;

	constructor() {
		this.items = new Object();
		this.size = 0;
	}

	add(data:any):boolean {
		if (this.has(data) === false) {
			this.items[data] = data;
			this.size++;
			return true;
		}
		return false;
	}

	remove(data:any):boolean {
		if (this.has(data) === true) {
			delete this.items[data];
			this.size--;
			return true
		}
		return false;
	}

	has(data:any):boolean {
		return this.items.hasOwnProperty(data);
	}

	getValues():Array<any> {
		const keys = Object.keys(this.items);
		// let values = [];
		// for (let k of keys) {
		// 	values.push(this.items[k]);
		// }
		// return values;
		return keys.map(k => this.items[k]);
	}

	getSize():number {
		return this.size;
	}

	clear():void {
		delete this.items;
		this.items = new Object();
		this.size = 0;
	}

	union(other:Set):Set {
		const unionSet = new Set();
		const thisValues = this.getValues();
		for (let v of thisValues) {
			unionSet.add(v);
		}
		const otherValues = other.getValues();
		for (let v of otherValues) {
			unionSet.add(v);
		}
		return unionSet;
	}

	intersection(other:Set):Set {
		const intersectionSet = new Set();
		const thisValues = this.getValues();
		for (let v of thisValues) {
			if (other.has(v)) {
				intersectionSet.add(v);
			}
		}
		return intersectionSet;
	}

	difference(other:Set):Set {
		const differenceSet = new Set();
		const thisValues = this.getValues();
		for (let v of thisValues) {
			if (other.has(v) === false) {
				differenceSet.add(v);
			}
		}
		return differenceSet;
	}

	subset(other:Set):boolean {
		if (this.getSize() > other.getSize()) {
			return false;
		}
		const thisValues = this.getValues();
		for (let v of thisValues) {
			if (other.has(v) === false) {
				return false;
			}
		}
		return true;
	}
}
