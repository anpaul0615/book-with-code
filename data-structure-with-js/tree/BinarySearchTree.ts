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
	min():any {}
	max():any {}
	remove(key:any):void {}

	inOrderTraverse(callback:Function):void {
		this.inOrderTraverseNode(this.root, callback);
	}
	private inOrderTraverseNode(node:Node, callback:Function):void {
		if (node !== null) {
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
		}
	}

	preOrderTraverse(callback:Function):void {
		this.preOrderTraverseNode(this.root, callback);
	}
	private preOrderTraverseNode(node:Node, callback:Function):void {
		if (node !== null) {
			callback(node.key);
			this.preOrderTraverseNode(node.left, callback);
			this.preOrderTraverseNode(node.right, callback);
		}
	}
	
	postOrderTraverse(callback:Function):void {
		this.postOrderTraverseNode(this.root, callback);
	}
	private postOrderTraverseNode(node:Node, callback:Function):void {
		if (node !== null) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
}
