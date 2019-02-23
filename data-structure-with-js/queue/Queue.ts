export default class Queue {
	private items: Array<any>;
	private capacity: number;
	private size: number;

	constructor(capacity: number = 8) {
		this.items = new Array(capacity);
		this.capacity = capacity;
		this.size = 0;
		for (let i = 0; i < capacity; i++) {
			this.items[i] = null;
		}
	}

	enqueue(item: any): void {
		if (this.getSize() === this.getCapacity()) {
			this.setCapacity(this.capacity * 2);
		}
		this.items[this.size++] = item;
	}

	dequeue(): any {
		if (this.isEmpty()) {
			return null;
		}
		const item = this.front();
		for (let i = 0; i < this.size - 1; i++) {
			this.items[i] = this.items[i + 1];
		}
		delete this.items[this.size - 1];
		this.items[this.size - 1] = null;
		this.size--;
		return item;
	}

	front(): any {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[0];
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
