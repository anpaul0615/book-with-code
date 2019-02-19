# 배열


## 왜 배열을 사용하는가?

## 배열의 생성과 초기화

## 원소 추가와 삭제

```javascript
const numbers = [ 0, 1, 2, 3 ];

numbers[numbers.length] = 4;  // [ 0, 1, 2, 3, 4 ]
numbers.push(5);  // [ 0, 1, 2, 3, 4, 5 ]
numbers.push(6, 7);  // [ 0, 1, 2, 3, 4, 5, 6, 7 ]

for (let i = numbers.length; i >= 0; i--) {
	numbers[i] = numbers[i-1];
}
numbers[0] = -1;  // [ -1, 0, 1, 2, 3, 4, 5, 6, 7 ]

numbers.unshift(-2);  // [ -2, -1, 0, 1, 2, 3, 4, 5, 6, 7 ]
numbers.unshift(-4, -3);  // [ -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7 ]

numbers.pop();  // [ -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6 ]

numbers.shift();  // [ -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7 ]

const sub = numbers.splice(3,5);  // numbers: [ -3, -2, -1, 5, 6, 7 ] // sub: [0, 1, 2, 3, 4 ]
numbers.splice(3,0, 1,1,1);  // numbers: [ -3, -2, -1, 1, 1, 1, 5, 6, 7 ]
```


## 2차원과 다차원 배열

## 자바스크립트 배열 메소드 정리

```javascript
Array.prototype.concat();
Array.prototype.every();
Array.prototype.filter();
Array.prototype.forEach();
Array.prototype.join();
Array.prototype.indexOf();
Array.prototype.lastIndexOf();
Array.prototype.map();
Array.prototype.reverse();
Array.prototype.slice();  // 지정된 인덱스로부터 원소를 잘라 새로운 배열을 반환
Array.prototype.some();
Array.prototype.sort();
Array.prototype.toString();
Array.prototype.valueOf();  // toString 과 동일한 기능. 배열을 문자열로 반환
```


## 여러 배열 합치기

## 반복자 함수

```javascript
const numbers = [ 0, 1, 2, 3 ];

const isEven = function(x) {
	return x % 2 == 0 ? true : false;
};

numbers.every(isEven);  // 지정된 함수의 결과가 false 일 때까지 반복

numbers.some(isEven);  // 지정된 함수의 결과가 true 일 때까지 반복

numbers.forEach(isEven);  // 전체 원소에 대해 반복

numbers.map(isEven);  // 전체 원소에 대해 반복 + 함수 결과를 새 배열 객체로 반환

numbers.filter(isEven);  // 전체 원소에 대해 반복 + 함수 결과가 true 인 원소들로만 구성된 새 배열 객체 반환

numbers.reduce(function(prev, cur, index) {  // 전체 원소에 대해 누산기 실행
	return previous + current;
});
```


## 검색과 정렬

```javascript
const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

numbers.reverse();  // [ 12, 11, ... 3, 2, 1 ]

numbers.sort();  // [ 1, 10, 11, 12, 2, 3, 4, ...]

numbers.sort(function(a,b) {  // [ 1, 2, 3, ... 10, 11, 12 ];
	return a-b;
});

const compare = function() {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};
numbers.sort(compare);  // [ 1, 2, 3, ... 10, 11, 12 ];
```
```javascript
const friends = [
	{ name: 'John', age: 34 },
	{ name: 'Camila', age: 21 },
	{ name: 'Jack', age: 30 }
];

const comparePersonByAge = function(a,b) {
	if (a.age < b.age) return -1;
	if (a.age > b.age) return 1;
	return 0;
};
friends.sort(comparePersonByAge);
```
```javascript
const names = [ 'Ana', 'ana', 'jonh', 'John' ];

names.sort();  // [ 'Ana', 'John', 'ana', 'jonh' ]  (아스키 값을 기준으로 비교)

names.sort(function(a,b) {  // [ 'Ana', 'ana', 'John', 'jonh' ]  (소문자 기준 알파벳 비교)
	if (a.toLowerCase() < b..toLowerCase()) return -1;
	if (a..toLowerCase() > b..toLowerCase()) return 1;
	return 0;
});

const names2 = [ 'Maéve', 'Maeve' ];
names2.sort(function(a,b) {  // 유니코드 값으로 지역별 문자열 비교
	return a.localeCompare(b);
});
```


## 배열을 문자열로 변환

```javascript
const numbers = [ 1, 2, 3 ];

const numbersString = numbers.toString();  // '1,2,3'
const numbersString2 = numbers.join('-');  // '1-2-3'
```

