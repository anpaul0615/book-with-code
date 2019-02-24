# 연결리스트

## ADT

```typescript
class LinkedList {
	private size:number;
	private head:LinkedListNode;
	append(data:any);  // 리스트의 맨 끝에 원소 추가
	remove(data:any);  // 해당 원소 삭제
	indexOf(data:any);  // 해당 원소의 인덱스 반환, 존재하지 않으면 -1 반환
	insertAt(index:number, data:any);  // 해당 위치에 원소 삽입
	removeAt(index:number);  // 해당 위치에 있는 원소 삭제
	isEmpty();
	getSize();
}
class LinkedListNode {
	data:any;
	next:this;
}
```

