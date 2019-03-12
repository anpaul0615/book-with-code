export class Node<T> {
	key:T;
	left:Node<T>;
	right:Node<T>;
	constructor(key:T) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

export default class BinarySearchTree<T> {
	private root:Node<T>;

	constructor() {
		this.root = null;
	}
	
	insert(key:T):void {
		let newNode = new Node<T>(key);
		if (this.root === null) this.root = newNode;
		else this.insertNode(this.root, newNode);
	}
	private insertNode(targetNode:Node<T>, newNode:Node<T>) {
		if (newNode.key < targetNode.key) {
			if (targetNode.left === null) targetNode.left = newNode;
			else this.insertNode(targetNode.left, newNode);
		}
		else {
			if (targetNode.right === null) targetNode.right = newNode;
			else this.insertNode(targetNode.right, newNode);
		}
	}

	search(key:T):boolean {
		return this.searchNode(this.root, key);
	}
	private searchNode(node:Node<T>, key:T):boolean {
		if (node === null) return false;  // not found
		if (key < node.key) return this.searchNode(node.left, key);  // traverse left-tree
		else if (key > node.key) return this.searchNode(node.right, key);  // traverse right-tree
		else return true;  // found
	}

	min():T {
		return this.minNode(this.root);
	}
	private minNode(node:Node<T>):T {
		if (node === null) return null;
		while (node && node.left !== null) {  // find furthest left-side-node
			node = node.left;
		}
		return node.key;
	}

	max():T {
		return this.maxNode(this.root);
	}
	private maxNode(node:Node<T>):T {
		if (node === null) return null;
		while (node && node.right !== null) {  // find furthest right-side-node
			node = node.right;
		}
		return node.key;
	}

	remove(key:T):void {
		this.removeNode(this.root, key);
	}
	private removeNode(node:Node<T>, key:T):Node<T> {
		if (node === null) {  // not found
			return null;
		}
		if (key < node.key) {  // traverse left-tree
			node.left = this.removeNode(node.left, key);
			return node;
		}
		else if (key > node.key) {  // traverse right-tree
			node.right = this.removeNode(node.right, key);
			return node;
		}
		else {  // found
			if (node.left === null && node.right === null) return node = null;  // remove leaf-node
			if (node.left === null) return node = node.right;  // remove right-only-node
			else if (node.right === null) return node = node.left;  // remove left-only-node
			const aux:Node<T> = this.findMinNode(node.right);  // remove full-node (remove + replace)
			node.key = aux.key;
			node.right = this.removeNode(node.right, aux.key);
			return node;
		}
	}
	private findMinNode(node:Node<T>):Node<T> {
		while (node && node.left !== null) {
			node = node.left;
		}
		return node;
	}

	inOrderTraverse(callback:Function):void {
		this.inOrderTraverseNode(this.root, callback);
	}
	private inOrderTraverseNode(node:Node<T>, callback:Function):void {
		if (node !== null) {
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
		}
	}

	preOrderTraverse(callback:Function):void {
		this.preOrderTraverseNode(this.root, callback);
	}
	private preOrderTraverseNode(node:Node<T>, callback:Function):void {
		if (node !== null) {
			callback(node.key);
			this.preOrderTraverseNode(node.left, callback);
			this.preOrderTraverseNode(node.right, callback);
		}
	}
	
	postOrderTraverse(callback:Function):void {
		this.postOrderTraverseNode(this.root, callback);
	}
	private postOrderTraverseNode(node:Node<T>, callback:Function):void {
		if (node !== null) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
}
