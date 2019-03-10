# 8장 트리

## BinarySearchTree 클래스 ADT

```typescript
class BinarySearchTree {
	private root:Node;
	insert(key:any):void;
	search(key:any):boolean;
	inOrderTraverse(node:Node, callback:Function):void;
	preOrderTraverse(node:Node, callback:Function):void;
	postOrderTraverse(node:Node, callback:Function):void;
	min():any;
	max():any;
	remove(key:any):void;
}
class Node {
	key:any;
	left:Node;
	right:Node;
}
```

