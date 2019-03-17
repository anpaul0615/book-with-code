import Hashtable, { KeyDataPair } from './Hashtable';

export class ChainingKeyDataPair extends KeyDataPair{
	public next: ChainingKeyDataPair;

	constructor(key: any, data: any) {
		super(key, data);
		this.next = null;
	}

	append(key: string, data: any): void {
		if (this.key === key) {
			this.data = data;
			return;
		}
		let current: ChainingKeyDataPair = this;
		while (current.next != null) {
			current = current.next;
		}
		current.next = new ChainingKeyDataPair(key, data);
	}
}

export default class ChaningHashtable extends Hashtable {
	constructor() {
		super();
		this.initStore();
	}

	protected initStore() {
		this.table = new Array<ChainingKeyDataPair>();
	}

	put(key: string, data: any): void {
		const position = this.createHash(key);
		if (this.table[position] === undefined)
			this.table[position] = new ChainingKeyDataPair(key, data);
		else
			this.table[position].append(key, data);
	}

	get(key: string): any {
		const position = this.createHash(key);
		if (this.table[position] !== undefined) {
			let current: ChainingKeyDataPair = this.table[position];
			while (current.next !== null) {
				if (current.key === key) {
					return current.data;
				}
				current = current.next;
			}
			if (current.key === key) {
				return current.data;
			}
		}
		return undefined;
	}

	remove(key:string):boolean {
		const position = this.createHash(key);
		if (this.table[position] === undefined) {
			return false;
		}
		let previous: ChainingKeyDataPair = null;
		let found: ChainingKeyDataPair = this.table[position];
		while (found.next) {
			if (found.key === key) {
				if (previous) previous.next = found.next;  // middle-node found
				else this.table[position] = found.next;  // first-node found
				return true;
			}
			previous = found;
			found = found.next;
		}
		if (found.key === key) {  // last-node found
			if (previous !== null) previous.next = null;
			else this.table[position] = undefined;
			return true;
		}
		return false;  // not found
	}

	getItems(): Array<any> {
		const reducer = (items: Array<any>, item: ChainingKeyDataPair, idx: number) => {
			if (item !== undefined) {
				let current: ChainingKeyDataPair = item;
				while (current.next != null) {
					items.push({ hash: idx, key: current.key, data: current.data });
					current = current.next;
				}
				items.push({ hash: idx, key: current.key, data: current.data });
			}
			return items;
		};
		return this.table.reduce(reducer, []);
	}
}
