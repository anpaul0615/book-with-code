export default class CircularQueue {
	protected items: Array<any>;
	protected capacity: number;
	protected front: number;
	protected rear: number;
	protected size: number;

	constructor(capacity: number = 8) {
		this.items = new Array(capacity);
		this.capacity = capacity;
		this.front = 0;
		this.rear = 0;
		this.size = 0;

		for (let i = 0; i < capacity; i++) {
			this.items[i] = null;
		}
	}

	enqueue(item: any): void {
		if (this.isFull()) {
			throw Error('Queue is fully..!');
		}
		this.rear = (this.rear + 1) % this.capacity;
		this.items[this.rear] = item;
		this.size++;
	}

	dequeue(): any {
		if (this.isEmpty()) {
			throw Error('Queue is empty..!');
		}
		delete this.items[this.front];
		this.items[this.front] = null;
		this.front = (this.front + 1) % this.capacity;
		this.size--;
		return this.items[this.front];
	}

	isEmpty(): boolean {
		return this.front === this.rear;
	}

	isFull(): boolean {
		return this.front === (this.rear + 1) % this.capacity;
	}

	clear(): void {
		delete this.items;
		this.items = new Array(this.capacity);
		this.front = 0;
		this.rear = this.capacity - 1;
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
