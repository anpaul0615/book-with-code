# 7장 딕셔너리와 해시

## ADT

```typescript
class Dictionary {
	private items: { [key:string] : any };
	private size: number;
	set(key:string, data:any);
	remove(key:string);
	has(key:string);
	get(key:string);
	getValues();
	getKeys();
	getSize();
	clear();
}
```

