export default class Stack {
	private items: Array<any>;
	private capacity: number;
	private size: number;

	constructor(capacity: number) {
		this.items = new Array(capacity);
		this.capacity = capacity;
		this.size = 0;
	}

	push(item: any): boolean {
		if (this.size === this.capacity) {
			return false;
		}
		this.items[this.size++] = item;
		return true;
	}

	pop(): any {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[--this.size];
	}

	peek(): any {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[this.size - 1];
	}

	isEmpty(): boolean {
		return this.size === 0;
	}

	clear(): void {
		if (this.isEmpty()) {
			return;
		}
		delete this.items;
		this.items = new Array(this.capacity);
		this.size = 0;
	}

	getSize(): number {
		return this.size;
	}
}
