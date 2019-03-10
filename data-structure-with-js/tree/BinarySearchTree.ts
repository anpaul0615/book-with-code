export class Node {
	key:any;
	left:Node;
	right:Node;
	constructor(key:any) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

export default class BinarySearchTree {
	private root:Node;

	constructor() {
		this.root = null;
	}
	
	insert(key:any):void {
		let newNode = new Node(key);
		if (this.root === null) this.root = newNode;
		else this.insertNode(this.root, newNode);
	}
	private insertNode(targetNode:Node, newNode:Node) {
		if (newNode.key < targetNode.key) {
			if (targetNode.left === null) targetNode.left = newNode;
			else this.insertNode(targetNode.left, newNode);
		}
		else {
			if (targetNode.right === null) targetNode.right = newNode;
			else this.insertNode(targetNode.right, newNode);
		}
	}

	search(key:any):boolean { return false; }
	inOrderTraverse(node:Node, callback:Function):void {}
	preOrderTraverse(node:Node, callback:Function):void {}
	postOrderTraverse(node:Node, callback:Function):void {}
	min():any {}
	max():any {}
	remove(key:any):void {}
}
