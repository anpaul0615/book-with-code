# 6장 집합

## ADT

```typescript
class Set {
	private items: { [key:string] : any };
	private size: number;
	add(data:any);
	remove(data:any);
	has(data:any);
	getValues();
	getSize();
	clear();
	union(other:Set);
	intersection(other:Set);
	difference(other:Set);
	subset(other:Set);
}
```

