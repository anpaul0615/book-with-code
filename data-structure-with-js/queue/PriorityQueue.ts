import Queue from './Queue'

export interface PriorityQueueItem {
	value: any;
	priority: number;
}

export default class PriorityQueue extends Queue {
	constructor(capacity: number = 8) {
		super(capacity);
	}
	
	enqueue(value: any, priority = 0): void {
		if (this.getSize() === this.getCapacity()) {
			this.setCapacity(this.capacity * 2);
		}
		const pqItem = { value, priority } as PriorityQueueItem;
		if (this.isEmpty()) {
			this.items[this.size++] = pqItem;
		}
		else {
			let added = false;
			for (let i = 0; i < this.size; i++) {
				if (pqItem.priority < this.items[i].priority) {  // min-priority first
					this.insert(i, pqItem);
					added = true;
					break;
				}
			}
			if (!added) {
				this.items[this.size++] = pqItem;
			}
		}
	}

	private insert(index:number, item: PriorityQueueItem) {
		for (let i = this.size; i > index; i--) {
			this.items[i] = this.items[i - 1];
		}
		this.items[index] = item;  // older-item first
		this.size++;
	}
}
