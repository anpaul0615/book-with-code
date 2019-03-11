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

	search(key:any):boolean {
		return this.searchNode(this.root, key);
	}
	private searchNode(node:Node, key:any):boolean {
		if (node === null) return false;  // not found
		if (key < node.key) return this.searchNode(node.left, key);  // traverse left-tree
		else if (key > node.key) return this.searchNode(node.right, key);  // traverse right-tree
		else return true;  // found
	}

	min():any {
		return this.minNode(this.root);
	}
	private minNode(node:Node):any {
		if (node === null) return null;
		while (node && node.left !== null) {  // find furthest left-side-node
			node = node.left;
		}
		return node.key;
	}

	max():any {
		return this.maxNode(this.root);
	}
	private maxNode(node:Node):any {
		if (node === null) return null;
		while (node && node.right !== null) {  // find furthest right-side-node
			node = node.right;
		}
		return node.key;
	}

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
