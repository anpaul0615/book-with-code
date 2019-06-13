# 2.2. 산넘고 물건너 최단 경로를 찾아라

## 이동비용 기반 최단경로 선택 알고리즘

1. "목적지 좌표" 를 기준으로 "합계비용 배열" 을 완성함
  1. "이동비용 배열" 을 준비함
  2. "합계비용 배열"을 준비함
  3. "합계비용 배열" 의 "목적지 좌표" 에 0 을 할당하고, 그 좌표를 "현재 칸", 그 값을 "현재 합계비용" 이라고 가정함
  4. "현재 칸" 에서 상하좌우에 인접한 칸에 이동함
  5. "현재 합계비용" 과 그 좌표의 "이동비용 배열의 값" 을 더한 값을 "다음 합계비용" 이라고함
  6. 이동한 좌표의 "합계비용 배열의 값" 과 "다음 합계비용" 을 비교함  
    이동 좌표 값 > 다음 합계비용 : 이동한 좌표를 "현재 칸" 으로 지정함  
    이동 좌표 값 <= 다음 합계비용 : 처리없음  
  7. "합계비용 배열" 의 "현재 칸" 에 "다음 합계비용" 값을 할당 + "현재 합계비용" 에 "다음 합계비용" 값을 할당함
  8. "합계비용 배열" 을 완성할때까지 4~7번 절차를 반복함
2. "시작지 좌표" 를 기준으로 "합계비용 배열" 의 최단경로를 탐색함
  1. 완성된 "합계비용 배열" 에서 "시작지 좌표" 를 "현재 칸" 으로 지정함
  2. "현재 칸" 의 상하좌우 인접 칸 중에서 비용이 가장 작은 좌표로 이동하고, 그 좌표를 "현재 칸" 으로 지정함
  3. 최종비용이 0 인 "목적지 좌표" 까지 1~2번 절차를 반복함



## 구현

### 교재 코드 재구성 (루프기반 구현)

```javascript
// "이동비용 배열" 초기화
let moveCostMap = [
  [5,5,4,2,1,1,1,2,2,3],
  [5,4,3,2,1,1,2,2,3,4],
  [5,4,2,1,1,2,2,4,5,5],
  [4,4,2,1,2,2,3,3,4,5],
  [4,3,1,1,4,3,3,3,4,5],
  [3,1,1,5,4,3,2,3,4,5],
  [2,1,3,4,3,3,2,2,3,4],
  [1,1,3,4,3,2,1,1,2,3],
  [2,1,1,3,4,2,2,3,4,4],
  [3,2,1,1,3,3,3,3,4,5]
];

// "합계비용 배열" 초기화
let costSummaryMap = moveCostMap.map(elist => elist.map(()=>Infinity));

// map 사이즈
const mapHeight = costSummaryMap.length;
const mapWidth = costSummaryMap[0].length;

// 출발지, 목적지 좌표
const startPoint = { x: 4, y: 0 };
const goalPoint = { x: 5, y: 9 };

// 이동비용 계산 (목적지 → 출발)
let stack = [];
stack.unshift({
  x: goalPoint.x,
  y: goalPoint.y,
  cost: -moveCostMap[goalPoint.y][goalPoint.x]
});
while (stack.length > 0) {
  let currentPoint = stack.shift();
  let currentCost = currentPoint.cost + moveCostMap[currentPoint.y][currentPoint.x];
  if (currentCost >= costSummaryMap[currentPoint.y][currentPoint.x])
    continue;
  costSummaryMap[currentPoint.y][currentPoint.x] = currentCost;
  if (currentPoint.x > 0)
    stack.unshift({ x: currentPoint.x -1, y: currentPoint.y, cost: currentCost });
  if (currentPoint.y > 0)
    stack.unshift({ x: currentPoint.x, y: currentPoint.y - 1, cost: currentCost });
  if (currentPoint.x < mapWidth - 1)
    stack.unshift({ x: currentPoint.x + 1, y: currentPoint.y, cost: currentCost });
  if (currentPoint.y < mapHeight - 1)
    stack.unshift({ x: currentPoint.x, y: currentPoint.y + 1, cost: currentCost });
}

// 디버그 출력
console.log(costSummaryMap);

// 최단경로 계산 (출발지 → 목적지)
let path = [];
path.push({ x: startPoint.x, y:startPoint.y, direction:null });
let currentPoint = path[path.length - 1];
let nextMininumCost = costSummaryMap[currentPoint.y][currentPoint.x];
let nextMininumPoint = { x: currentPoint.x, y: currentPoint.y };
while (nextMininumCost != 0) {
  currentPoint = path[path.length - 1];
  for (let np of [ {x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1} ]) {
    let currentNearbyPoint = { x: currentPoint.x + np.x, y: currentPoint.y + np.y };
    if (costSummaryMap[currentNearbyPoint.y] === undefined 
    || costSummaryMap[currentNearbyPoint.y][currentNearbyPoint.x] === undefined) {
      continue;
    }
    let currentNearbyCost = costSummaryMap[currentNearbyPoint.y][currentNearbyPoint.x]
    if (nextMininumCost > currentNearbyCost) {
      nextMininumCost = currentNearbyCost;
      nextMininumPoint = currentNearbyPoint;
    }
  }
  let direction;
  if (nextMininumPoint.x == goalPoint.x && nextMininumPoint.y == goalPoint.y) direction = null;
  else if (nextMininumPoint.x > currentPoint.x) direction = '→';
  else if (nextMininumPoint.x < currentPoint.x) direction = '←';
  else if (nextMininumPoint.y > currentPoint.y) direction = '↓';
  else if (nextMininumPoint.y < currentPoint.y) direction = '↑';
  path.push({ x: nextMininumPoint.x, y:nextMininumPoint.y, direction });
}

// 디버그 출력
console.log(path);
```


### 교재 코드 재구성 (재귀 구현)

```javascript
// "이동비용 배열" 초기화
let moveCostMap = [
  [5,5,4,2,1,1,1,2,2,3],
  [5,4,3,2,1,1,2,2,3,4],
  [5,4,2,1,1,2,2,4,5,5],
  [4,4,2,1,2,2,3,3,4,5],
  [4,3,1,1,4,3,3,3,4,5],
  [3,1,1,5,4,3,2,3,4,5],
  [2,1,3,4,3,3,2,2,3,4],
  [1,1,3,4,3,2,1,1,2,3],
  [2,1,1,3,4,2,2,3,4,4],
  [3,2,1,1,3,3,3,3,4,5]
];

// "합계비용 배열" 초기화
let costSummaryMap = moveCostMap.map(elist => elist.map(()=>Infinity));

// map 사이즈
const mapHeight = costSummaryMap.length;
const mapWidth = costSummaryMap[0].length;

// 출발지, 목적지 좌표
const startPoint = { x: 4, y: 0 };
const goalPoint = { x: 5, y: 9 };

// 이동비용 계산 (목적지 → 출발)
function calculateCostSummaryMap(x, y, cost) {
  cost += moveCostMap[y][x];
  if (cost >= costSummaryMap[y][x]) return;
  costSummaryMap[y][x] = cost;
  
  if (x > 0) calculateCostSummaryMap(x - 1, y, cost);
  if (y > 0) calculateCostSummaryMap(x, y - 1, cost);
  if (x < mapWidth - 1) calculateCostSummaryMap(x + 1, y, cost);
  if (y < mapHeight - 1) calculateCostSummaryMap(x, y + 1, cost);
}
calculateCostSummaryMap(goalPoint.x, goalPoint.y, -moveCostMap[goalPoint.y][goalPoint.x]);

// 디버그 출력
console.log(costSummaryMap);

// 최단경로 계산 (출발지 → 목적지)
let path = [];
function calculatePath(x,y) {
  let cost = Infinity;
  let nextX, nextY;

  if (x > 0 && costSummaryMap[y][x-1] < cost) {
    cost = costSummaryMap[y][x-1];
    nextX = x - 1;
    nextY = y;
  }
  if (y > 0 && costSummaryMap[y-1][x] < cost) {
    cost = costSummaryMap[y-1][x];
    nextX = x;
    nextY = y - 1;
  }
  if (x < mapWidth - 1 && costSummaryMap[y][x+1] < cost) {
    cost = costSummaryMap[y][x+1];
    nextX = x + 1;
    nextY = y;
  }
  if (y < mapHeight - 1 && costSummaryMap[y+1][x] < cost) {
    cost = costSummaryMap[y+1][x];
    nextX = x;
    nextY = y + 1;
  }
  if (cost == 0) {
    return;   
  }

  let direction;
  if (nextX > x) direction = '→';
  else if (nextX < x) direction = '←';
  else if (nextY > y) direction = '↓';
  else if (nextY < y) direction = '↑';
  path.push({ x: nextX, y:nextY, direction });

  calculatePath(nextX, nextY);
}

path.push({ x: startPoint.x, y:startPoint.y, direction:null });
calculatePath(startPoint.x, startPoint.y);
path.push({ x: goalPoint.x, y:goalPoint.y, direction:null });

// 디버그 출력
console.log(path);
```
