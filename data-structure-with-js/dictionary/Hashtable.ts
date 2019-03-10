export class KeyDataPair {
	public key:any;
	public data:any;
	constructor(key:any, data:any) {
		this.key = key;
		this.data = data;
	}
}

export default class Hashtable {
	protected table: Array<any>;

	constructor() {
		this.initStore();
	}

	protected  initStore() {
		this.table = new Array<KeyDataPair>();
	}

	protected loseloseHashCode(key: string): number {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	}

	put(key:string, data:any):void {
		const position = this.loseloseHashCode(key);
		this.table[position] = new KeyDataPair(key, data);
	}

	get(key:string):any {
		const position = this.loseloseHashCode(key);
		return this.table[position] ? this.table[position].data : undefined;
	}

	remove(key:string):void {
		const position = this.loseloseHashCode(key);
		this.table[position] = undefined;
	}

	getItems():Array<any> {
		return this.table.map( (val,idx) => {
			if (val !== undefined) {
				return { hash:idx, key:val.key, data:val.data };
			}
		}).filter(e => e !== undefined);
	}

	getSize():number {
		return this.getItems().length;
	}
}
