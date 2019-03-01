import LinkedList, { LinkedListNode } from './LinkedList';

export default class DoubleLinkedList extends LinkedList {
	protected tail:LinkedListNode;
	constructor() {
		super();
		this.tail = null;
	}

	append(data:any):void {
		const newNode:LinkedListNode = new LinkedListNode(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		}
		else {
			let current:LinkedListNode = this.tail;
			current.next = newNode;
			newNode.prev = current;
			this.tail = newNode;
		}
		this.size++;
	}

	insertAt(targetIndex:number, data:any):boolean {
		if (targetIndex < 0 || targetIndex > this.size) {
			return false;
		}		
		const newNode:LinkedListNode = new LinkedListNode(data);
		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		if (targetIndex === 0) {
			if (this.head === null) {
				this.head= newNode;
				this.tail = newNode;
			}
			else {
				newNode.next = current;
				current.prev = newNode;
				this.head= newNode;
			}
		}
		else if (targetIndex === this.size) {
			current = this.tail;
			current.next = newNode;
			newNode.prev = current;
			this.tail = newNode;
		}
		else {
			while (currentIndex++ < targetIndex) {  // previous <-> current
				current = current.next;
			}
			current.prev.next = newNode;  // previous <-> [ new node ] <-> current
			newNode.next = current;
			newNode.prev = current.prev;
			current.prev = newNode;
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
		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		if (targetIndex === 0) {
			targetData = current.data;
			this.head = current.next;
			if (this.size === 1) {
				this.tail = null;  // [ target ]
			}
			else {
				this.head.prev = null;  // [ target <-> next <-> next <-> ... ]
			}
		}
		else if (targetIndex === this.size - 1) {
			current = this.tail;
			targetData = current.data;
			this.tail = current.prev;
			this.tail.next = null;
		}
		else {
			while (currentIndex++ < targetIndex) {  // [ ... <-> prev <-> target <-> next <-> ... ]
				current = current.next;
			}
			targetData = current.data;
			current.prev.next = current.next;  // [ ... <-> prev <-> next <-> ... ]
			current.next.prev = current.prev;
		}
		this.size--;
		return targetData;
	}

	isEmpty():boolean {
		return this.size === 0;
	}

	getSize():number {
		return this.size;
	}
	
	toString():void {
		// traversal
		let currentHead:LinkedListNode = this.head;
		let nodesDataString:string = '[ ';
		while (currentHead.next != null) {
			nodesDataString += String(currentHead.data) + ', ';
			currentHead = currentHead.next;
		}
		nodesDataString += String(currentHead.data);
		nodesDataString += ' ]';
		// traversal reverse
		let currentTail:LinkedListNode = this.tail;
		let nodesDataStringReverse:string = '[ ';
		while (currentTail.prev != null) {
			nodesDataStringReverse += String(currentTail.data) + ', ';
			currentTail = currentTail.prev;
		}
		nodesDataStringReverse += String(currentTail.data);
		nodesDataStringReverse += ' ]';
		// print traversal result
		console.log(`
			head : ${this.head.data} // nodes : ${nodesDataString}
			tail : ${this.tail.data} // nodes(reversed) : ${nodesDataStringReverse}
		`);
	}
}
