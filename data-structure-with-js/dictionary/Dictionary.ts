export default class Dictionary {
	private items: { [key:string] : any };
	private size: number;

	constructor() {
		this.items = new Object();
		this.size = 0;
	}

	set(key:string, data:any):void {
		if (this.has(key) === false) {
			this.size++;
		}
		this.items[key] = data;
	}

	remove(key:string):boolean {
		if (this.has(key) === true) {
			delete this.items[key];
			this.size--;
			return true
		}
		return false;
	}

	has(key:string):boolean {
		return this.items.hasOwnProperty(key);
	}

	get(key:string):any {
		if (this.has(key) === false) {
			return null;
		}
		return this.items[key];
	}

	getValues():Array<any> {
		if (this.getSize() === 0) {
			return null;
		}
		const keys = this.getKeys();
		// let values = [];
		// for (let k of keys) {
		// 	values.push(this.items[k]);
		// }
		// return values;
		return keys.map(k => this.items[k]);
	}

	getKeys():Array<string> {
		if (this.getSize() === 0) {
			return null;
		}
		return Object.keys(this.items);
	}

	getSize():number {
		return this.size;
	}
}
