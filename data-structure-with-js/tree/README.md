# 8장 트리

## BinarySearchTree 클래스 ADT

```typescript
class BinarySearchTree<T> {
	private root:Node<T>;
	insert(key:T):void;
	search(key:T):boolean;
	inOrderTraverse(callback:Function):void;
	preOrderTraverse(callback:Function):void;
	postOrderTraverse(callback:Function):void;
	min():T;
	max():T;
	remove(key:T):void;
}
class Node<T> {
	key:T;
	left:Node<T>;
	right:Node<T>;
}
```


## 완성된 BinarySearchTree 클래스

- [BinarySearchTree 클래스](./BinarySearchTree.ts)
- [BinarySearchTree 클래스 테스트코드](./BinarySearchTree.test.ts)

