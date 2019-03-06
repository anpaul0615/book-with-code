export default class Hashtable {
	private table: Array<any>;

	constructor() {
		this.table = new Array();
	}

	private loseloseHashCode(key:string):number {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	}

	put(key:string, data:any):void {
		const position = this.loseloseHashCode(key);
		this.table[position] = data;
	}

	get(key:string):any {
		return this.table[this.loseloseHashCode(key)];
	}

	remove(key:string):void {
		this.table[this.loseloseHashCode(key)] = undefined;
	}
}
