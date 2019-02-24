# 큐

## ADT

```typescript
class Queue {
	private items;
	private capacity;
	private size;
	enqueue(); // 큐 뒤쪽에 원소 추가
	dequeue();  // 큐의 첫번째 원소 반환 반환 + 해당 원소 제거
	front();  // 큐의 첫번째 원소 반환
	isEmpty();  // 큐가 비어있으면 true, 크기가 0 보다 크면 false 반환
	clear();  // 큐의 모든 원소를 제거
	getSize();  // 큐의 원소 개수 반환
}
```


## 완성된 Queue 클래스

- [Queue 클래스](./Queue.ts)
- [Queue 클래스 테스트코드](./Queue.test.ts)


## Queue 응용 예제

- [우선순위 큐](./PriorityQueue.test.ts)
- [원형 큐](./CircularQueue.ts)
- [뜨거운감자 게임](./Queue.application.test.ts)

