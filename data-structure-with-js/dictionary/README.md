# 7장 딕셔너리와 해시

## Dictionary 클래스 ADT

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


## 완성된 Dictionary 클래스

- [Dictionary 클래스](./Dictionary.ts)
- [Dictionary 클래스 테스트코드](./Dictionary.test.ts)


## Hashtable 클래스 ADT

```typescript
class Hashtable {
	private table: Array<any>;
	put(key:string, data:any);
	remove(key:string);
	get(key:string);
}
```


## 완성된 Hashtable 클래스

- [Hashtable 클래스](./Hashtable.ts)
- [Hashtable 클래스 테스트코드](./Hashtable.test.ts)

