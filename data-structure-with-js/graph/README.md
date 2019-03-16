# 9장 그래프

## Graph 클래스 ADT

```typescript
class Graph {
	private vertices:Array<string>;
	private adjacencies:Dictionary;
	addVertex(vertex:string):void;
	addEdge(vertext1:string, vertext2:string):void;
	bfs();
	dfs();
}
```


## 완성된 Graph 클래스

- [Graph 클래스](./Graph.ts)
- [Graph 클래스 테스트코드](./Graph.test.ts)

