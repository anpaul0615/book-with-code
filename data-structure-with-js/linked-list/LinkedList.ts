export class LinkedListNode {
	data:any;
	next:this;
	constructor(data:any) {
		this.data = data;
		this.next = null;
	}
}

export default class LinkedList {
	private size:number;
	private head:LinkedListNode;
	
	constructor() {
		this.size = 0;
		this.head = null;
	}

	append(data:any) {
		const newNode:LinkedListNode = new LinkedListNode(data);
		let current:LinkedListNode = null;
		if (this.head === null) {
			this.head = newNode;
		}
		else {
			current = this.head;
			while (current.next != null) {
				current = current.next;
			}
			current.next = newNode;
		}
		this.size++;
	}

	insertAt(targetIndex:number, data:any):boolean {
		if (targetIndex < 0 || targetIndex >= this.size) {
			return false;
		}		
		const newNode:LinkedListNode = new LinkedListNode(data);
		let previous:LinkedListNode = null;
		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		if (targetIndex === 0) {
			this.head.next = newNode;
		}
		else {
			while (currentIndex++ < targetIndex) {
				previous = current;
				current = current.next;
			}
			previous.next = newNode;
			newNode.next = current;
		}
		this.size++;
		return true;
	}

	remove(data:any):any {
		if (this.head === null) {
			return null;
		}
		const foundIndex = this.indexOf(data);
		return this.removeAt(foundIndex);
	}

	indexOf(data:any):number {
		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		while (current !== null) {
			if (data === current.data) {
				return currentIndex;
			}
			currentIndex++;
			current = current.next;
		}
		return -1;
	}

	removeAt(targetIndex:number):any {
		if (targetIndex < 0 || targetIndex >= this.size) {
			return null;
		}
		let targetData:any = null;
		let targetNext:LinkedListNode = null;
		let previous:LinkedListNode = null;
		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		if (targetIndex === 0) {
			targetNext = current.next;
			targetData = current.data;
			delete this.head;  // mem-release target node
			this.head = targetNext;
		}
		else {
			while (currentIndex++ < targetIndex) {
				previous = current;
				current = current.next;
			}
			targetNext = current.next;
			targetData = current.data;
			delete previous.next;  // mem-release target node
			previous.next = targetNext;
		}
		this.size--;
		return targetData;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}
	
	toString() {
		let current:LinkedListNode = this.head;
		let nodesDataString:string = '[ ';
		while (current.next != null) {
			nodesDataString += String(current.data) + ', ';
			current = current.next;
		}
		nodesDataString += String(current.data);
		nodesDataString += ' ]';
		console.log(`head : ${this.head.data} // nodes : ${nodesDataString}`);
	}
}
