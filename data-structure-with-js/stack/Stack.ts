export default class Stack {
	private items: Array<any> = [];

	push(item: any) {
		this.items.push(item);
	}

	pop(): any {
		if (this.isEmpty()) {
			return null;
		}
		return this.items.pop();
	}

	peek(): any {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[this.size() - 1];
	}

	isEmpty(): boolean {
		return this.size() === 0;
	}

	clear(): void {
		if (this.isEmpty()) {
			return;
		}
		delete this.items;
		this.items = [];	
	}

	size(): number {
		return this.items.length;
	}
}
