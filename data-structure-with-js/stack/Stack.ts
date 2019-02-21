export default class Stack {
	private items: Array<any>;
	private capacity: number;
	private size: number;

	constructor(capacity: number = 8) {
		this.items = new Array(capacity);
		this.capacity = capacity;
		this.size = 0;
	}

	push(item: any): void {
		if (this.size === this.capacity) {
			this.setCapacity(this.capacity * 2);
		}
		this.items[this.size++] = item;
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

	getCapacity(): number {
		return this.capacity;
	}

	setCapacity(capacity: number): number {
		if (capacity < this.capacity) {
			return this.capacity;
		}
		const newItems = new Array(capacity);
		const oldCapacity = this.capacity;
		for (let i = 0; i < oldCapacity; i++) {
			newItems[i] = this.items[i];
		}
		delete this.items;
		this.items = newItems;
		this.capacity = capacity;
		return this.capacity;
	}
}
