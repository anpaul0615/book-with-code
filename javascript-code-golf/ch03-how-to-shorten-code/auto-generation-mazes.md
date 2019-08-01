# 3.2. 미노타우로스도 놀랄 미로의 자동생성

## 코드골프

### 원본코드

```javascript
function originalCode() {
  // 변수초기화
  var res = "";

  // 미로초기화
  var w = 55;
  var h = 35;
  var maze = new Array(w * h);
  for (var y=1; y<h-1; y++) {
    for (var x=1; x<w-1; x++) {
      maze[x + w * y] = 1;
    }
  }

  // 개시위치, 방향, 패턴
  var startX = w - 5;
  var startY = 4;
  var dir = [ [-1,0], [0,-1], [1,0], [0,1] ];
  var pattern = [
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 2, 1, 3],
    [0, 2, 3, 1],
    [0, 3, 1, 2],
    [0, 3, 2, 1],
    [1, 0, 2, 3],
    [1, 0, 3, 2],
    [1, 2, 0, 3],
    [1, 2, 3, 0],
    [1, 3, 0, 2],
    [1, 3, 2, 0],
    [2, 0, 1, 3],
    [2, 0, 3, 1],
    [2, 1, 0, 3],
    [2, 1, 3, 0],
    [2, 3, 0, 1],
    [2, 3, 1, 0],
    [3, 0, 1, 2],
    [3, 0, 2, 1],
    [3, 1, 0, 2],
    [3, 1, 2, 0],
    [3, 2, 0, 1],
    [3, 2, 1, 0]];

  // 구멍 뚫기
  function dig(x,y) {
    var type = (x+3) * (y+5) * 7 % pattern.length;
    for (var i=0; i<dir.length; i++) {
      var next = dir[pattern[type][i]];
      if (maze[(x + next[0] * 2) + w * (y + next[1] * 2)] == 1) {
        maze[(x + next[0] * 2) + w * (y + next[1] * 2)] = 0;
        maze[(x + next[0]) + w * (y + next[1])] = 0;
        dig(x + next[0] * 2, y + next[1] * 2);
      }
    }
  }
  dig(startX, startY);

  // 실행 결과 생성
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      if (maze[x + w * y] == 1) res += "■";
      else res += "□";
    }
    res += "\n";
  }

  // 결과를 리턴하고 종료
  return res;
}
```



## 알고리즘

### 미로 생성 알고리즘

#### 막대 쓰러뜨리기 알고리즘

- 알고리즘 : 
  1. 지도 전체를 벽으로 감싸고 1개 간격으로 기둥을 배치하여 미로의 기본틀을 만듬
  2. 첫번째 행의 각각의 기둥에서 상하좌우 중 임의의 방향으로 막대를 쓰러뜨림  
    (단 이미 막대가 쓰러져 있는 곳엔 다시 쓰러뜨릴 수 없음)  
  3. 두번째 행부터는 하좌우 중에서 임의의 방향으로 막대를 쓰러뜨림  
    (두번째 행부터는 위쪽 방향으로는 막대를 쓰러뜨릴 수 없음)  
    (또한 첫번째 행과 마찬가지로 이미 막대가 쓰러져 있는 곳엔 다시 쓰러뜨릴 수 없음)
  4. 마지막행까지 3번단계를 반복함

- 알고리즘의 문제점 :   
  - 가장 위쪽 행의 벽이 적어서 쉽게 좌우로 이동할수있음  
  - 왼쪽상단에서 시작점으로 오른쪽하단을 종료점으로 보면 쉽게 답이 보임


#### 구멍 뚫기 알고리즘

- 알고리즘 : 
  1. 지도 전체를 벽으로 채우고, 그 주변을 완전히 둘러싸는 1칸 너비의 길을 구성함  
    (가로 세로 벽의 수는 모두 홀수로 정함)
  2. 외부 벽 이외에서 한 점을 골라 그 곳을 기준점으로 지정하고, 그 기준점을 벽에서 길로 변경함  
    (기준점은 x,y 좌표가 모두 짝수인 곳으로 정함)
  3. 기준점으로부터 임의의 방향으로 2칸씩 길을 만들어나감  
    (진행방향으로 2칸 앞이 길이라면 길 생성을 종료함)
  4. 생성된 길 중에서 임의로 한 점을 기준점으로 하고, 3번단계를 반복함  
    (이때의 기준점 역시 x,y 좌표가 모두 짝수인 곳으로 정함)
  5. 기준점으로 선택하는 길이 더이상 없을 때 미로생성을 종료함

- 알고리즘의 특징 : 
  - 외곽을 길로 둘러싸는 것으로 "두 칸 앞이 길이면 종료" 라는 조건을 일괄적으로 적용할수있음

- 알고리즘의 문제점 : 
  - 시작점, 생성기준점, 도착점을 찾아가면 답을 찾기 쉬워짐 


#### 벽 늘리기 알고리즘

- 알고리즘 : 
  1. 지도 전체를 길로 채우고, 그 외곽을 1칸 너비의 벽으로 구성함  
     (내부공간의 가로세로 크기가 모두 홀수가 되도록 정함)
  2. 내부에서 벽이 아닌 임의의 한 점을 기준점으로 정해서 벽으로 변경함  
     (기준점은 x,y 좌표가 모두 짝수인 곳으로 정함)
  3. 기준점으로부터 임의으 방향으로 2칸씩   을 생성함  
     (다른 벽에 부딪치면 벽 생성을 종료함)
  4. 3번단계를 반복함  
  5. 더이상 내부에서 새로운 기준점을 선택할 수 없을때 미로생성을 종료함



### 랜덤 알고리즘 

#### 랜덤함수의 구성

- 시드설정 함수 :   
  랜덤생성함수의 시드(씨앗)이 되는 초기값을 설정함

- 랜덤 생성 함수 :   
  일정한 계싼법에 의해서 "얼핏 봐서 불규칙한 수" 를 반환함  
  1) 시드결정 => 내부 계산값 지정  
  2) 첫번째 랜덤생성 => 랜덤 출력 + 내부 계산값 갱신  
  3) 두번째 랜덤생성 => 랜덤 출력 + 내부 계산값 갱신  

- 매번 랜덤수를 생성하고나서 계산값을 바꾸기 때문에, 매번 출력값이 바뀜


#### 유사랜덤

- 교재 실습코드에서는 랜덤함수를 사용하지 않고, 코드안의 고정된 값을 사용하여 랜덤같이 보이는 수를 생성하고 있음

- 유사랜덤 코드
  ```javascript
  var type = (x + 3) * (y + 5) * 7 % pattern.length;

  // pattern.length 는 상수이기때문에 아래와같이 써도 무방함
  var type = (x + 3) * (y + 5) * 7 % 24;
  ```

- 유사랜덤의 장점 : 
  - 대상의 x,y 좌표값만으로 간단하게 출력을 계산할수 있음
  - 같은 좌표에 대해서는 같은 출력을 얻을수 있음 (코드골프에서 유용)

- 유사랜덤의 문제점 : 
  - 모든 출력은 같은 수식에서 계산된 값이므로, 사용횟수가 많아지면 반복되는 패턴이 발견됨


#### 선형합동법 (Linear Congruential Generators)

- 선형합동법의 계산식
  ```
  x = (A * x + B) / M
  A, B, M 은 상수.
  M>A, M>B, A>0, B>=0 의 조건이 성립함.
  ```

- 선형합동법의 장점 : 
  - 구현이 간단하고 연산속도가 빠름

- 선형합동법의 단점 : 
  - 주기성이 있음 (특히 하위비트에서는 그다지 랜덤이 나타나지 않음)
  - 의외로 짧은 주기로 같은 값이 반복되므로, 과학분야처럼 방대한 계산에는 적합하지 않음

- 선형합동법의 구현 예 :
```javascript
var LCG = (function(){
  var x = 1;
  return function() {
    x = (x * 1103515245 + 12345) | 0;
    return (x >> 16) & 32767;
  }
})();

var arr = [];
for (var i=0; i<64; i++){
  // 주기적으로 배열 출력
  if (i%8 == 0) {
    console.log(arr);
    arr = [];
  }
  // 0~255 범위에서 임의의 수를 구함
  var r = LCG () % 256;
  // 공백으로 채워 길이를 맞춤
  r = new Array(4 - ("" + r)).length).join(" ") + r;
  arr.push(r);
}
console.log(arr);
```


#### 메르센 트위스터 (Mersenne Twister)

- 참고자료 :   
  http://ko.wikipedia.org/wiki/메르센_트위스터  
  http://kplus-biz.github.io/예제/2017/10/27/기본-유사-난수-발생과-메르센-트위스터-구현  


#### Xorshift

- Xorshift 구현 예 :
```javascript
var Xor = function(n) {
  var x,y,z,w;
  // 시드
  this.seed = function(s) {
    x = 123456789;
    if (s !== undefined) x = s;
    y = 362436069, z = 521288629, w = 88675123;
  }
  // 랜덤
  this.rand = function() {
    var t;
    t = x ^ (x << 11);
    x = y; y = z; z = w;
    return w = (w ^ (w >> 19)) ^ (t ^ (t >> 8));
  }
  // 첫회 실행
  this.seed(n);
}
```



## 코드스피츠 문제풀이 및 구현

### 교재 실습코드 구현 (구멍뚫기 알고리즘)

```javascript
function originalCode() {
  // 변수초기화
  var res = "";
  // 미로초기화
  var w = 55;
  var h = 35;
  var maze = new Array(w * h);
  for (var y=1; y<h-1; y++) {
    for (var x=1; x<w-1; x++) {
      maze[x + w * y] = 1;
    }
  }
  // 개시위치, 방향, 패턴
  var startX = w - 5;
  var startY = 4;
  var dir = [ [-1,0], [0,-1], [1,0], [0,1] ];
  var pattern = [
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 2, 1, 3],
    [0, 2, 3, 1],
    [0, 3, 1, 2],
    [0, 3, 2, 1],
    [1, 0, 2, 3],
    [1, 0, 3, 2],
    [1, 2, 0, 3],
    [1, 2, 3, 0],
    [1, 3, 0, 2],
    [1, 3, 2, 0],
    [2, 0, 1, 3],
    [2, 0, 3, 1],
    [2, 1, 0, 3],
    [2, 1, 3, 0],
    [2, 3, 0, 1],
    [2, 3, 1, 0],
    [3, 0, 1, 2],
    [3, 0, 2, 1],
    [3, 1, 0, 2],
    [3, 1, 2, 0],
    [3, 2, 0, 1],
    [3, 2, 1, 0]];
  // 구멍 뚫기
  function dig(x,y) {
    var type = (x+3) * (y+5) * 7 % pattern.length;
    for (var i=0; i<dir.length; i++) {
      var next = dir[pattern[type][i]];
      if (maze[(x + next[0] * 2) + w * (y + next[1] * 2)] == 1) {
        maze[(x + next[0] * 2) + w * (y + next[1] * 2)] = 0;
        maze[(x + next[0]) + w * (y + next[1])] = 0;
        dig(x + next[0] * 2, y + next[1] * 2);
      }
    }
  }
  dig(startX, startY);
  // 실행 결과 생성
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      if (maze[x + w * y] == 1) res += "■";
      else res += "□";
    }
    res += "\n";
  }
  // 결과를 리턴하고 종료
  return res;
}
```


### 코드스피츠 구현 (막대쓰러뜨리기 알고리즘)

```javascript
function mazeRender(title, maze) {
  var x, y, w=maze[0].length, h=maze.length, res = '';
  for (y=0; y<h; y++){
    for (x=0; x<w; x++){
      res += maze[y][x] > 0 ? '■' : '□';
    }
    res += '\n';
  }
  document.getElementById('result').innerHTML += '\n' + res + '\n\n';
}
function mazeSizeCheck(w, h) {
  if (w<11 || h<11) throw '미로는 5*5 이상이어야 합니다.';
  if (w%2==0 || h%2==0) throw '미로의 높이와 너비는 홀수값이어야 합니다.';
}
function rand(n) {
  return (Math.random() * n) % n | 0;
}
function maze1(w, h) {
  mazeSizeCheck(w, h);
  var p, i, j, x, y, dir=[[1,0],[0,1],[-1,0],[0,-1]], maze=[];
  // 지도 초기화
  for (i=0,j=w*h; i<j; i++) {
    y = i / w | 0;
    x = i - y * w;
    if (y == maze.length) maze.push([]);
    maze[y].push(
      x==0 || y==0 || x==w-1 || y==h-1 || 
      (x%2==0 && y%2==0)
      ? 1 : 0
    );
  }
  // 미로 생성
  for (j=2; j<h-1; j+=2)  {
    for (i=2; i<w-1; i+=2) {
      p = j==2 ? 4 : 3;
      p = dir[rand(p)];
      x = i + p[0];
      y = j + p[1];
      if (maze[y][x] == 1) i -= 2;
      else maze[y][x] = 1;
    }
  }
  return maze;
}
```


### 코드스피츠 구현 (구멍뚫기 알고리즘)

```javascript

function maze2(w, h) {
  if (w<11 || h<11) return '미로는 5*5 이상이어야 합니다.';
  if (w%2==0 || h%2==0) return '미로의 높이와 너비는 홀수값이어야 합니다.';

  // 지도 초기화
  var create = function(w, h) {
    var i, j, x, y, maze=[];
    for (i=0, j=w*h; i<j; i++) {
      y = i / w | 0;
      x = i - y * w;
      if (y == maze.length) maze.push([]);
      maze[y].push(1);
    }
    return maze;
  };

  // 구멍 위치 찾기
  var getDigPoints = function(startPoint, maze, dir) {
    var i, j, d, p, digPoint, w=maze[0].length, h=maze.length;
    // 뚫을 방향 및 위치 알아내기
    d = dir[rand(dir.length)];
    i = 0, digPoint=[];
    while (i++ < 2) {
      digPoint.push({x:startPoint.x + d.x * i, y:startPoint.y + d.y * i});
    }
    // 뚫을수있는지 검사
    for (i=0, j=digPoint.length; i<j; i++) {
      p = digPoint[i];
      if (maze[p.y][p.x] == 0 || p.x==0 || p.y==0 || p.x==w-1 || p.y==h-1) return 0;
    }
    return digPoint;
  };

  // 구멍 뚫기
  var dig = function(startPoint, maze, dir) {
    var i, j, p, digPoints, ok = 0; 
    while (digPoints = getDigPoints(startPoint, maze, dir)) {
      for (i = 0, j = digPoints.length; i < j; i++) {
        p = digPoints[i];
        maze[p.y][p.x] = 0;
        startPoint = p; //뚫은 마지막 지점을 시작점으로!
        ok = 1;
      }
    }
    return ok;
  };

  // 시작점 찾기
  var findStartPoint = function(maze, dir) {
    var x, y, d, startPoint=0, w=maze[0].length, h=maze.length, route=[], digPoints;
    //뚫린 경로를 가져옴 (홀수좌표만)
    for (x=1; x<w-1; x+=2) {
      for (y=1; y<h-1; y+=2) {
        if (maze[y][x] == 0) route.push({x:x,y:y});
      }
    }
    //뚫린 경로가 없으면 아무 점이나 시작점으로 잡음
    if (route.length == 0) {
      startPoint = {x:rand(w / 2 - 1) * 2 + 1, y:rand(h / 2 - 1) * 2 + 1};
      maze[startPoint.y][startPoint.x] = 0;
      return startPoint;
    }
    //뚫린 경로에서 시작점을 랜덤으로 찾음
    while (route.length > 0) {
      d = dir.slice();
      startPoint = route.splice(rand(route.length), 1)[0];
      while (d.length) {
        digPoints = getDigPoints(startPoint, maze, d.splice(rand(d.length), 1));
        if (digPoints) return startPoint;
      }
      startPoint = 0;
    }
    return startPoint;
  };

  // 미로 생성
  var dir = [{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}];
  var maze = create(w,h);
  while (1) {
    var startPoint = findStartPoint(maze, dir);
    if (startPoint) {
      while (!dig(startPoint, maze, dir)) {
        startPoint = findStartPoint(maze, dir);
      }
    } else {
      break;
    }
  }

  // 미로 렌더링
  var mazeRender = function(maze) {
    var x, y, w=maze[0].length, h=maze.length, res = '';
    for (y=0; y<h; y++){
      for (x=0; x<w; x++){
        res += maze[y][x] > 0 ? '■' : '□';
      }
      res += '\n';
    }
    return res;
  };

  // 미로 반환
  return mazeRender(maze);
}

var result = maze2(31, 27);
console.log(result);
```

