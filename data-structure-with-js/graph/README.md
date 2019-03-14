# 9장 그래프

## Graph 클래스 ADT

```typescript
class Graph<T> {
	private vertices:Array<T>;
	private adjacencies:Dictionary;
	addVertex(vertex:T):void;
	addEdge(vertext1:T, vertext2:T):void;
	bfs();
	dfs();
}
```

