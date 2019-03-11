# 8장 트리

## BinarySearchTree 클래스 ADT

```typescript
class BinarySearchTree {
	private root:Node;
	insert(key:any):void;
	search(key:any):boolean;
	inOrderTraverse(callback:Function):void;
	preOrderTraverse(callback:Function):void;
	postOrderTraverse(callback:Function):void;
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

