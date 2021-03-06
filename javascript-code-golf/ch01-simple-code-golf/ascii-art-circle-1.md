# 1.1장 아스키아트로 원을 그리자 (1)

## 원본코드

```javascript
function orignalCode() {
	// 변수의 초기화
	 var res = "";
	 var w = 80;
	 var h = 40;
	 var sz = 30;

	 // 처리부
	 for (var y=0; y<h; y++) {
		 for (var x=0; x<w; x++) {
			 var dstnc = Math.sqrt(Math.pow(w/2 - x, 2) + Math.pow((h/2 - y) * 2, 2));
			 if (dstnc < sz) {
				 res += "*";
			 } else {
				 res += "-";
			 }
		 }
		 res += "\n";
	 }

	 // 결과를 리턴하고 종료
	 return res;
}
```


## 힌트 : 사용하는 언어의 문법적 특성을 이용하여 문자수를 줄이자


## 줄일 수 있는 부분

- 탭문자는 모두 삭제 가능
- 스페이스문자는 대부분 삭제 가능
- 코드골프임을 고려해서 삭제 가능
- 행끝에 `;` 가 없어도 됨
- `if` 는 조건연산자 `(? :)` 로 바꿀수있음
- `if` 나 `for` 의 중괄호를 생략할수있음
- 주석 삭제


## 문자수가 많았던 부분

```javascript
var dstnc = Math.sqrt(Math.pow(w/2 - 2, 2) + Math.pow((h/2 - y) * 2, 2));
```


## 문제풀이

### 0) 원본코드 : 375자 / 100%

### 1) 주석 삭제 : 324자 / 86%

```javascript
function yourCode() {
	 var res = "";
	 var w = 80;
	 var h = 40;
	 var sz = 30;
	 for (var y=0; y<h; y++) {
		 for (var x=0; x<w; x++) {
			 var dstnc = Math.sqrt(Math.pow(w/2 - x, 2) + Math.pow((h/2 - y) * 2, 2));
			 if (dstnc < sz) {
				 res += "*";
			 } else {
				 res += "-";
			 }
		 }
		 res += "\n";
	 }
	 return res;
}
```

### 2) 스페이스와 탭문자를 지우고 변수명을 짧게 변경 : 173자 / 46%

```javascript
function yourCode() {
var r="",w=80,h=40,s=30
for(var y=0;y<h;y++){
for(var x=0;x<w;x++){
var d=Math.sqrt(Math.pow(w/2-x,2)+Math.pow((h/2-y)*2,2))
if(d<s){r+="*"}else{r+="-"}
}
r+="\n"
}
return r
}
```

### 3) 변수를 상수로 치환 + var 삭제 : 143자 / 38%

```javascript
function yourCode() {
r=""
for(y=0;y<40;y++){
for(x=0;x<80;x++){
d=Math.sqrt(Math.pow(40-x,2)+Math.pow((20-y)*2,2))
if(d<30){r+="*"}else{r+="-"}
}
r+="\n"
}
return r
}
```

### 4) 조건연산자 : 126자 / 34%

- `if` 구문을 `(?:)` 삼항연산자로 변경

```javascript
function yourCode() {
r=""
for(y=0;y<40;y++){
for(x=0;x<80;x++){
r+=Math.sqrt(Math.pow(40-x,2)+Math.pow((20-y)*2,2))<30?"*":"-"
}
r+="\n"
}
return r
}
```

### 5) Math 제거 : 124자 / 33%

```javascript
function yourCode() {
r="",m=Math
for(y=0;y<40;y++){
for(x=0;x<80;x++){
r+=m.sqrt(m.pow(40-x,2)+m.pow((20-y)*2,2))<30?"*":"-"
}
r+="\n"
}
return r
}
```

### 6) Math.sqrt 제거 : 116자 / 31%

- `Math.sqrt` 를 제거하고 비교연산 상수를 제곱값으로 변경 (`<30` → `<900`)  
  제곱근 결과를 비교하는 방식에서 원본값을 비교상수제곱과 비교하는 방식으로 변경
 
```javascript
function yourCode() {
r=""
for(y=0;y<40;y++){
for(x=0;x<80;x++){
r+=Math.pow(40-x,2)+Math.pow((20-y)*2,2)<900?"*":"-"
}
r+="\n"
}
return r
}
```

### 7) 모든 Math 지우기 : 102자 / 27%

- `Math.pow` 를 `x * x` 으로 변경 (직접 제곱식)

```javascript
function yourCode() {
r=""
for(y=0;y<40;y++){
for(x=0;x<80;x++){
a=40-x;b=(20-y)*2;r+=a*a+b*b<900?"*":"-"
}
r+="\n"
}
return r
}
```

- `b=(20-y)*2;` 에서의 `*2` 를 `b*b*4` 에서 처리하도록 수정

```javascript
function yourCode() {
r=""
for(y=0;y<40;y++){
for(x=0;x<80;x++){
a=40-x;b=20-y;r+=a*a+b*b*4<900?"*":"-"
}
r+="\n"
}
return r
}
```

### 8) 원중심을 (0,0) 으로 변경 : 92자 / 24%

```javascript
function yourCode() {
r=""
for(y=-20;y<20;y++){
for(x=-40;x<40;x++){
r+=x*x+y*y*4<900?"*":"-"
}
r+="\n"
}
return r
}
```

### 9) 자바스크립트 문법특성 활용 : 81자 / 22%

- `for` 구문 괄호 삭제
- `for` 증감식의 증감연산을 조건식에서 수행하도록 변경 
- `for` 구문 내부의 개행처리를 `for` 증감식에서 처리하도록 변경

```javascript
function yourCode() {
r=""
for(y=-21;++y<20;r+="\n")for(x=-41;++x<40;)r+=x*x+y*y*4<900?"*":"-"
return r
}
```

### 10) 이중 for문 통합 : 79자 / 21%

- 기존 코드

```javascript
for(y=-21;++y<20;r+="\n")for(x=-41;++x<40;)r+=x*x+y*y*4<900?"*":"-"
```

- `y` 와 `x` 를 합치기 위해 각각의 초기값을 `-20`, `-40` 으로 변경

```javascript
for(y=-20;y<20;y++,r+="\n")for(x=-40;x<40;x++)r+=x*x+y*y*4<900?"*":"-"
```

- `y` 를 `-40` 으로 초기화하여 `2` 씩 증가하도록 변경
- `y` 값이 두배가 되었기 때문에 원의방정식에서 `*4` 부분을 제거
- `x++` 의 처리를 원의방정식 안에 포함

```javascript
for(y=-40;y<40;y+=2,r+="\n")for(x=-40;x<40;)r+=x*x+++y*y<900?"*":"-"
```

- `-40` 대신에 변수 `a` 를 만들어 기준값 공유
- `for` 조건식을 `y+a`, `x+a` 로 변경 (자바스크립트에서는 `0` 이 falsy value 인것을 활용)

```javascript
for(y=a=-40;y+a;y+=2,r+="\n")for(x=a;x+a;)r+=x*x+++y*y<900?"*":"-"
```

- `for` 통합
- `||` 연산을 사용하여 `false` 일때만 우변을 실행하도록 변경
- `for` 증감식에서 `(식,식,식, ...)` 형태의 콤마연산자로 복수 수식 처리

```javascript
for(y=x=a=-40;y+a;x+a||(x=a,y+=2,r+="\n"))r+=x*x+++y*y<900?"*":"-"
```

- 부호를 반대로 변경

```javascript
for(y=x=a=40;y+a;x+a||(x=a,y-=2,r+="\n"))r+=x*x--+y*y<900?"*":"-"
```

- 최종 코드

```javascript
function yourCode(){
r=""
for(y=x=a=40;y+a;x+a||(x=a,y-=2,r+="\n"))r+=x*x--+y*y<900?"*":"-"
return r
}
```

### 11) 자바스크립트 문자열 특성 활용 : 75자 / 20%

- 기존 코드

```javascript
for(y=x=a=40;y+a;x+a||(x=a,y-=2,r+="\n"))r+=x*x--+y*y<900?"*":"-"
```

- 문자열 `"-"`, `"*"` 통합
- 자바스크립트에서 `true|0 === 1`, `false|0 === 0` 이라는 특징 활용

```javascript
for(y=x=a=40;y+a;x+a||(x=a,y-=2,r+="\n"))r+="-*"[x*x--+y*y<900|0]
```

- 문자열 `"\n"` 통합
- 통합 문자열에 대한 `(?:)` 의 평가식에서, `x+a === truthy` 일때는 `boolean|0` 결과값을 반환하고  
  `x+a === falsy` 일때는 `(식,식,식)` 의 콤마연산자 결과값을 반환하도록 변경

```javascript
for(y=x=a=40;y+a;)r+="-*\n"[x+a?x*x--+y*y<900|0:(x=a,y-=2,2)]
```

- 최종 코드

```javascript
function yourCode(){
r=""
for(y=x=a=40;y+a;)r+="-*\n"[x+a?x*x--+y*y<900|0:(x=a,y-=2,2)]
return r
}
```
