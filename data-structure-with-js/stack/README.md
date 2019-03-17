# 스택

## ADT

```typescript
class Stack {
	private items;
	private capacity;
	private size;
	push(); // 스택 꼭대기에 새 원소 추가
	pop();  // 스택 꼭대기에 있는 원소 반환 + 해당 원소 제거
	peek();  // 스택 꼭대기에 있는 원소 반환
	isEmpty();  // 스택이 비어있으면 true, 스택 크기가 0 보다 크면 false 반환
	clear();  // 스택의 모든 원소를 제거
	getSize();  // 스택의 원소 개수 반환
}
```


## 완성된 Stack 클래스

- [Stack 클래스](./Stack.ts)
- [Stack 클래스 테스트코드](./Stack.test.ts)


## Stack 응용 예제

- [진수 변환](./Stack.application.test.ts)


