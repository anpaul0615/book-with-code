import { LinkedListNode } from './LinkedList';
import DoubleLinkedList from './DoubleLinkedList';

export default class CircularLinkedList extends DoubleLinkedList {
	constructor() {
		super();
	}

	updateCircularLink():void {
		this.tail.next = this.head;
		this.head.prev = this.tail;
	}

	append(data:any) {
		super.append(data);
		this.updateCircularLink();
	}

	insertAt(targetIndex:number, data:any):boolean {
		const isSucceed:boolean = super.insertAt(targetIndex, data);
		if (isSucceed) {
			this.updateCircularLink();
		}
		return isSucceed;
	}

	indexOf(data:any):number {
		if (this.size === 0) {
			return -1;
		}

		let current:LinkedListNode = this.head;
		let currentIndex:number = 0;
		if (data === current.data) {  // check first node
			return 0;
		}
		while (current.next !== this.head) {  // check middle nodes
			if (data === current.data) {
				return currentIndex;
			}
			currentIndex++;
			current = current.next;
		}
		if (data === current.data) {  // check last node
			return currentIndex;
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
			if (this.size === 1) {  // [ target ]  =>  [ ]
				this.tail = null;
			}
			else {  // [ target <-> next <-> next <-> ... ]  =>  [ next <-> next <-> ... ]
				this.updateCircularLink();
			}
		}
		else if (targetIndex === this.size - 1) {
			current = this.tail;
			targetData = current.data;
			this.tail = current.prev;
			this.updateCircularLink();
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

	toString() {
		// traversal
		let currentHead:LinkedListNode = this.head;
		let nodesDataString:string = '[ ';
		while (currentHead.next != this.head) {
			nodesDataString += String(currentHead.data) + ', ';
			currentHead = currentHead.next;
		}
		nodesDataString += String(currentHead.data);
		nodesDataString += ' ]';
		// traversal reverse
		let currentTail:LinkedListNode = this.tail;
		let nodesDataStringReverse:string = '[ ';
		while (currentTail.prev != this.tail) {
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
