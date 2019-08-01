# 6.1. 연료를 절약하여 미지의 지형을 답파하라 (알고리즘 문제 5)

## 목표 및 제약사항

- 시작점부터 목표점까지 연료를 최소한으로 사용해서 이동시키기 
- 맵은 가로120 세로60 의 크기와 1~10범위의 고도로 구성되어있음
- 맵의 이동비용은 고도의 2제곱으로 1~100범위로 구성되어 있음  
  (최저고도와 최고고도의 비용차이가 100배까지 차이나므로, 가능한한 낮은 고도로 이동해야함)
- 맵의 이동좌표는 7200칸(가로120 x 세로60)이며 최대 500번까지 이동할수있음
- 상하좌우와 각 방향의 대각선까지해서 총 8개의 방향으로 이동할수있음
- 로봇은 이동할때마다 탐사를 수행 => 주위 1칸(총 3*3칸 범위) 분의 이동비용을 구함


## 맵 특징 (휴리스틱 분석)

- 맵의 대부분 땅은 고도1(이동비용1) 의 평지
- 평지는 전체의 1/3 ~ 1/4 정도의 면적을 차지함
- 맵에는 산으로 불릴법한 높은 고도 지점이 일정 개수 있음
- 산이라 불리는 부분은 중앙이 가장 높고 주변으로 갈수록 고도가 낮아짐
- 여러개의 산이 배치되는 모습에는 규칙성이 없어보임


## 맵 생성 알고리즘

- 알고리즘 :   
  1) 맵 안에 산 지형에 대한 지점을 무작위로 할당함  
  2) 각 지점에 대한 조산활동(산 지형 생성) 을 적용함  
    1) 0~9 중 무작위의 값을 생성함  
    2) 0,1 인 경우, x방향으로 1 이동  
    3) 2,3 인 경우, x방향으로 -1 이동  
    4) 4,5 인 경우, y방향으로 1 이동  
    5) 6,7 인 경우, y방향으로 -1 이동  
    6) 8 인 경우, x방향으로 1만큼 시작점으로 이동  
    7) 9 인 경우, y방향으로 1만큼 시작점으로 이동  
    8) 현재 지점의 맵 위치 높이(고도)를 1 증가시킴  
  3) 맵 안에서 가장 높은 위치(최고고도) 를 구함
  4) (각각의 칸 고도의 제곱근 / 최고고도의 제곱근) 에 이동비용범위(1~10)를 곱하여 최종 고도를 구함

- 코드 :  
```javascript
function makeMap(map) {
  // 랜덤 시드 설정
  var xors = new Xors(map.seed);
  // 가로 세로 2배로 맵초기화
  var w = map.w;
  var h = map.h;
  var arr = map.arr;
  for (var x=0; x<w; x++) {
    arr[x] = [];
    for (var y=0; y<h*2; y++) {
      arr[x][y] = 0;
    }
  }
  // 맵 생성
  for (var i=0; i<map.key; i++) {
    // 조산활동 좌표 지정
    var rX = xors.rand() % w;
    var rY = xors.rand() % h;
    var pos = { x: rX, y: rY };
    // 맵 성장
    for (var j=0; j<map.deep; j++) {
      mapGrowth(pos, rX, rY);
    }
  }

  /* 맵 성장 함수*/
  function mapGrowth(pos, bsX, bsY) {
    var mvR = xors.rand() % 10;
    var mvX = 0, mvY = 0;
    // 조산활동 좌표 이동방향
    switch (mvR) {
      // 단순이동
      case 0:
      case 1: mvX = 1; break;
      case 2:
      case 3: mvX = -1; break;
      case 4:
      case 5: mvY = 1; break;
      case 6:
      case 7: mvY = -1; break;
      // 중심으로 이동
      case 8: mvX = (pos.x < bsX) ? 1 : (pos.x > bsX) ? -1 : 0; break;
      case 9: mvY = (pos.y < bsY) ? 1 : (pos.y > bsY) ? -1 : 0; break;
    }
    // 조산활동 좌표 이동
    pos.x = map.inW(pos.x + mvX);
    pos.y = map.inH(pos.y + mvY);
    // 조산활동
    arr[pos.x][pos.y] += 1;
  }

  // 최고고도 계산
  var altMax = 1;
  for (var x=0; x<W; x++) {
    for (var y=0; y<h; y++) {
      if (arr[x][y] > altMax) {
        altMax = arr[x][y];
      }
    }
  }
  // 높이 조정
  var sqrtAltMax = Math.sqrt(altMax);
  for (var x=0; x<w; x++) {
    for (var y=0; y<h; y++) {
      var sqrt = Math.sqrt(arr[x][y]);
      arr[x][y] = (sqrt / sqrtAltMax * map.stp) |0;
      arr[x][y]++;
      if (arr[x][y] > map.stp) arr[x][y] = map.stp;
    }
  }
}
```


## 맵 탐지 알고리즘 구현

### 맵 해석

- 맵 전체를 사람의 눈으로 보면, 이동비용이 적을것같은 경로가 몇몇 보임  
  일정 이상 고도를 피해서 이동하면 연료소비량을 줄일수있음
- 맵 생성 알고리즘을 보면, 산 지형의 개수를 알수있음  
  또한 산 지형이 만들어질때 1/5확률로 시작점으로 돌아가는걸로 보아 산이 그다지 멀리 퍼지지않는것을 알수있음
- 조산활동 좌표가 무작위로 배치되기 때문에, 산 지형이 세로 방향 일직선으로 배치될수도있음  
  (이경우 산을 너무 멀리 둘러가는 경로를 포기하는 처리를 구현해야함)

### 교재 실습코드

```javascript
function terrainSearch(arnd, nowX, nowY, goalX, goalY, mapW, mapH) {
  // 1) 변수 초기화
  var res = [ 'u' ];
  var drcX = goalX - nowX;
  var drcY = goalY - nowY;
  var dstnc = Math.abs(drcX) + Math.abs(drcY);

  // 2) 이동 처리
  // 2-1) 골이 가까우면 아무것도 생각하지 말고 골 방향으로 이동함
  if (dstnc < 5) {
    if (drcX < 0) { res = [ 'l' ]; }
    else if (drcX > 0) { res = [ 'r' ]; }
    else if (drcY < 0) { res = [ 'u' ]; }
    else if (drcY > 0) { res = [ 'd' ]; }
  }
  // 2-2) X위치가 골의 X위치와 같으므로 세로로 이동함
  else if (drcX == 0) {
    if (drcY < 0) { res = [ 'u' ]; }
    else if (drcY > 0) { res = [ 'd' ]; }
  }
  // 2-3) Y위치가 골의 Y위치와 같으므로 가로로 이동함
  else if (drcY == 0) {
    if (drcX < 0) { res = [ 'l' ]; }
    else if (drcX > 0) { res = [ 'r' ]; }
  }
  // 2-4) 골에서 멀 경우
  else {
    var frstMv;
    if (Math.abs(drcX) > Math.as(drcY)) {
      // 가로 방향의 거리가 멀 경우에는 가로 이동을 우선함
      if (drcX < 0) { frstMv = 'l'; }
      else if (drcX > 0) { frstMv = 'r'; }
      else if (drcY < 0) { frstMv = 'u'; }
      else if (drcY > 0) { frstMv = 'd'; }
    }
    else {
      // 세로 방향의 거리가 멀 경우에는 세로 이동을 우선함
      if (drcY < 0) { frstMv = 'u'; }
      else if (drcY > 0) { frstMv = 'd'; }
      else if (drcX < 0) { frstMv = 'l'; }
      else if (drcX > 0) { frstMv = 'r'; }
    }
    res = [ frstMv ];
    // 대각선 이동 비용 검토
    var rt = 1.3;
    if (frstMv == 'l') {
      if (arnd[0][1] * rt > arnd[1][0] + arnd[0][0] && drcY <= 0) { res = [ 'u', 'l' ]; }
      else if (arnd[0][1] * rt > arnd[1][2] + arnd[0][2] && drcY >= 0) { res = [ 'd', 'l' ]; }
    }
    else if (frstMv == 'r') {
      if (arnd[2][1] * rt > arnd[1][0] + arnd[2][0] && drcY <= 0) { res = [ 'u', 'r' ]; }
      else if (arnd[2][1] * rt > arnd[1][2] + arnd[2][2] && drcY >= 0) { res = [ 'd', 'r' ]; }
    }
    else if (frstMv == 'u') {
      if (arnd[1][0] * rt > arnd[0][1] + arnd[0][0] && drcX <= 0) { res = [ 'l', 'u' ]; }
      else if (arnd[1][0] * rt > arnd[2][1] + arnd[2][0] && drcX >= 0) { res = [ 'r', 'u' ]; }
    }
    else if (frstMv == 'd') {
      if (arnd[1][2] * rt > arnd[0][1] + arnd[0][2] && drcX <= 0) { res = [ 'l', 'd' ]; }
      else if (arnd[1][2] * rt > arnd[2][1] + arnd[2][2] && drcX >= 0) { res = [ 'r', 'd' ]; }
    }
  }
  // 3) 결과 반환
  return res;
}
```


## 코드스피츠 구현 (맵 생성 알고리즘)

```javascript
/* Xorshift 랜덤함수 */
var Xors = function(n) {
  var x, y, z, w;
  // 시드
  this.seed = function(s) {
    x = 123456789
    if (typeof s !== "undefined") x = s; 
    y = 362436069; z = 521288629; w = 88675123;
  }
  // 랜덤
  this.rand = function() {
    var t;
    t = x ^ (x << 11);
    x = y; y = z; z = w;
    return w = (w^(w>>19))^(t^(t>>8));
  }
  // 첫회 실행
  this.seed(n);
};

/* 맵 설정값 */
var map = {
  w: 120,  // 가로 폭
  h: 60,  // 높이
  arr: [],  // 배열
  stp: 10,  // 이동 비용의 스텝. 1~10.
  key: 45,  // 조산운동의 키 포인트 수
  deep: 1000, // 조산운동의 심도계소
  seed: 0,  // 랜덤 시드
  drwSz: 5, // 그림 크기
  strtRtX: 0.9, // 시작위치 비율X
  strtRtY: 0.3, // 시작위치 비율Y
  goalRtX: 0.1, // 종료위치 비율X
  goalRtY: 0.7, // 종료위치 비율Y
  inW: function(x) {	// 좌표범위 가로
    if (x < 0) return 0;
    if (x >= this.w) return this.w - 1;
    return x;
  },
  inH: function(y) {	// 좌표범위 세로
    if (y < 0) return 0;
    if (y >= this.h) return this.h - 1;
    return y;
  }
};

/* 맵 생성 */
function mkMap(map) {
  // 랜덤 시드를 설정
  var xors = new Xors(map.seed);
  // 가로 세로 2배로 맵을 초기화
  var w = map.w;
  var h = map.h;
  var arr = map.arr;
  for (var x = 0; x < w; x ++) {
    arr[x] = [];
    for (var y = 0; y < h * 2; y ++) {
      arr[x][y] = 0;
    }
  }

  // 맵 생성 처리
  for (var i = 0; i < map.key; i ++) {
    // 키 포인트 작성
    var rX = xors.rand() % w;
    var rY = xors.rand() % h;
    var pos = {x: rX, y: rY};
    // 맵 성장 처리
    for (var j = 0; j < map.deep; j ++) {
      mapGrwth(pos, rX, rY);
    }
  }

  /* 맵 성장 */
  function mapGrwth(pos, bsX, bsY) {
    var mvR = xors.rand() % 10;
    var mvX = 0, mvY = 0;
    // 키 포인트의 이동 방향
    switch (mvR) {
    // 단순히 이동
    case 0: case 1: mvX =  1; break;
    case 2: case 3: mvX = -1; break;
    case 4: case 5: mvY =  1; break;
    case 6: case 7: mvY = -1; break;
    // 중심으로 이동
    case 8: mvX = (pos.x < bsX) ? 1
          : (pos.x > bsX) ? -1 : 0; break;
    case 9: mvY = (pos.y < bsY) ? 1
          : (pos.y > bsY) ? -1 : 0; break;
    }
    // 킴 포인트의 위치를 이동
    pos.x = map.inW(pos.x + mvX);
    pos.y = map.inH(pos.y + mvY);
    // 조산 활동
    arr[pos.x][pos.y] += 1;
  }

  // 최고 고도 계산
  var altMax = 1;	// 최고 고도
  for (var x = 0; x < w; x ++) {
    for (var y = 0; y < h; y ++) {
      if (arr[x][y] > altMax) {
        altMax = arr[x][y];
      }
    }
  }
  // 높이 조정
  var sqrtAltMax = Math.sqrt(altMax);
  for (var x = 0; x < w; x ++) {
    for (var y = 0; y < h; y ++) {
      var sqrt = Math.sqrt(arr[x][y]);
      arr[x][y] = (sqrt / sqrtAltMax * map.stp)|0;
      arr[x][y]++;
      if (arr[x][y] > map.stp) arr[x][y] = map.stp;
    }
  }
}

/* 맵 그리기 */
function drwMap(map) {
  // 변수 초기화
  var canvas = document.getElementById("canvas");
  var cntxt = canvas.getContext("2d");
  canvas.width = map.w * map.drwSz;
  canvas.height = map.h * map.drwSz;
  cntxt.font = "24px serif"
  // 색 초기화
  var colMin = {r: 192, g: 255, b: 64};
  var colMax = {r:  80, g:  96, b: 32};
  var colDif = {
    r: colMax.r - colMin.r, 
    g: colMax.g - colMin.g, 
    b: colMax.b - colMin.b
  };
  // 맵 그리기 처리
  for (var x = 0; x < map.w; x ++) {
    for (var y = 0; y < map.h; y ++) {
      var bs = map.arr[x][y] / map.stp;
      var r = colMin.r + (colDif.r * bs)|0;
      var g = colMin.g + (colDif.g * bs)|0;
      var b = colMin.b + (colDif.b * bs)|0;
      cntxt.fillStyle = "rgb("+r+","+g+","+b+")";
      cntxt.fillRect(x * map.drwSz, y * map.drwSz
        ,map.drwSz, map.drwSz);
    }
  }
}

mkMap(map);
drwMap(map);
```

