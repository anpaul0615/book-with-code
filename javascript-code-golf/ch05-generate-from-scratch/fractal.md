# 5.1. 자기유사성의 세계 프랙탈 도형을 그리자 (코드골프 문제 4)

## 만델브로트 집합 점화식

- 만델브로트 집합 점화식
  ```
  Z_n+1 = Z_n^2 + C
  Z_0 = 0
  ```

- 즉, 복소수평면상의 점 C(a + bi) 에서 `Z_n+1 = Z_n^2 + C` 를 만족시키는 a 와 b 의 집합  
  (a 와 b 를 좌표평면에 표현하면 만델브로트 집합의 도형이 그려지게 됨)



## 복소수를 쓰지않는 만델브로트 집합 점화식

- 만델브로트 집합 복소수 점화식
  ```
  Z_n+1 = Z_n^2 + C
  ```

- 위의 식에서 Z 와 C 를 복소수형태로 표현하면,
  ```
  x_n+1 + y_n+1*i = (x_n + y_n*i)^2 + (a + b*i)
  ```

- 위의 식에서 제곱 부분을 전개하면,
```
x_n+1 + y_n+1*i = x_n^2 + 2(x_n * y_n*i) + (y_n*i)^2 + (a + b*i)
```

- 실수부와 허수부로 나누어서 식을 정리하면,
  ```
  x_n+1 + y_n+1*i
  = x_n^2 + 2*x_n*y_n*i - y_n^2 + (a + b*i)
  = x_n^2 - y_n^2 + a + 2*x_n*y_n*i + b*i
  ```

- 복소수에서는 `a + b*i = c + d*i 이면, a=c 이고 b=d 이다` 가 성립하므로,
  ```
  x_n+1 = x_n^2 - y_n^2 + a
  y_n+1 = 2*x_n * y_n + b
  ```



## 구현

### 교재 실습코드

```javascript
function originalCode() {
  // 변수 초기화
  var res = '';
  var viewW = 96, viewH = 64;
  var viewBase = Math.min(viewW, viewH);
  var viewX = 0, viewY = -1.35;
  var viewRate = 0.3;
  var loop = 64;
  var cellSz = viewW * viewH;
  var cellArray = new Array(viewH);
  for (var y=0; v<viewH; y++) {
    cellArray[y] = new Array(viewW);
  }
  // 개별 화소 순회
  for (var z=0; z<cellSz; z++) {
    var x = z % viewW;
    var y = Math.floor(z / viewW);
    var a = viewY + viewRate * ((y-viewH / 2) / viewBase);
    var b = viewX + viewRate * ((x-viewW / 2) / viewBase);
    var i = 0, j = 0;
    // 만델브로트 집합 점화식 처리
    for (var k=0; k<loop; k++) {
      if (i*i + j*j > 4) {
        var i2 = i*i - j*j + a;  // 만델브로트집합인 y화소만 원본화소에서 교체
        var j2 = 2*i*j +b;  // 만델브로트집합인 x화소만 원본화소에서 교체
        i = i2;
        j = j2;
      }
    }
    cellArray[y][x] = k;
  }
  // 결과 계산
  for (var y=0; y<viewH; y++) {
    cellArray[y] = cellArray[y].join(',');
  }
  var res = cellArray.join('n');
  // 결과 반환
  return res;
}
```
