# 1.2장 아스키아트로 원을 그리자 (2)

## 원본코드

```javascript
function orignalCode() {
	// 변수 초기화
	var result = "";
	var width = 96;
	var height = 48;
	var sizeA = 32;
	var sizeB = 16;

	 // 처리
	for (var y=0; y<height; y++) {
		for (var x=0; x<width; x++) {
			var dstnc = Math.sqrt(Math.pow(width/2 - x, 2) + Math.pow((height/2 - y) * 2, 2));
			if (dstnc < sizeA) {
				if (dstnc < sizeB) {
				result += "2";
				} else {
					result += "1";
				}
			} else {
				result += "0";
			}
		}
		result += "\n";
	}

	 // 결과를 리턴하고 종료
	return result;
}
```


## 문제풀이

### 0) 원본코드 : 506자 / 100%

### 1) 변수 제거 : 364자 / 72%

```javascript
function yourCode() {
	r = "";
	height = 48;
	sizeB = 16;
	for (y=0; y<height; y++) {
		for (x=0; x<height*2; x++) {
			dstnc = Math.pow(height - x, 2) + Math.pow(height - y * 2, 2);
			if (dstnc < sizeB * sizeB * 4) {
				if (dstnc < sizeB * sizeB) {
				r += "2";
				} else {
					r += "1";
				}
			} else {
				r += "0";
			}
		}
		r += "\n";
	}
	return r;
}
```

### 2) 변수명, 처리부 정리 : 159자 / 32%

```javascript
function yourCode() {
	r = ""
	h = 48
	s = 256
	for (y=0; y<h; y++) {
		for (x=0; x<h*2; x++) {
			a=h-x,b=h-y*2
			d=a*a+b*b
			r+=(d<s*4)+(d<s)
		}
		r+="\n";
	}
	return r
}
```

### 3) for문 통합 : 130자 / 26%

```javascript
function yourCode() {
	r=""
	s=256
	for(x=y=h=48;y+h;){
		d=x*x+y*y
		x--+h?(r+=(d<s*4)+(d<s)):(x=h,y-=2,r+="\n")
	}
	return r
}
```

### 4) 자바스크립트 문법 활용 : 85자 / 17%

```javascript
function yourCode() {
r=""
s=256
for(x=y=h=48;y+h;r+=x--+h?(d<s*4)+(d<s):(x=h,y-=2,"\n"))d=x*x+y*y
return r
}
```

