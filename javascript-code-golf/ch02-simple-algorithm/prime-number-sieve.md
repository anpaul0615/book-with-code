# 2.1장 소수를 걸러내는 신기한 '체'

## '에라토스테네스의 체' 알고리즘

1. 주어진 정수 n 에 대해서, 2 ~ n 까지의 정수를 오름차순으로 나열함(탐색리스트)
2. 아무 값도 들어있지 않은 소수리스트를 준비함
3. 탐색리스트 중에서 가장 작은 값을 소수리스트로 이동함
4. 소수리스트에 추가된 값의 모든 배수를 탐색리스트에서 제거함
5. 소수리스트에 추가된 값의 제곱이 탐색리스트 마지막에 있는 값과 비교함  
   제곱값 < 마지막값 : 3단계로 이동 + 반복  
   제곱값 > 마지막값 : 반복 종료  
6. 탐색리스트에 남아있는 수들을 모두 소수리스트로 이동시킴


## 구현

### 원본코드

```javascript
function orignalCode() {
// 배열 초기화
  var resArr = [];

  // 2 에서 100 까지의 수를 배열에 저장
  for (var i=2; i<=100; i++) {
    resArr.push(i);
  }

  // 배열을 되돌려주면서 종료
  return resArr;
}
```

### 직접 구현 (알고리즘을 그대로 코드로 옮기기)

```javascript
function yourCode(n) {
  // 1. 주어진 정수 n 에 대해서, 2 ~ n 까지의 정수를 오름차순으로 나열함(탐색리스트)
  var naturals = [];
  for (var i=2; i<=n; i++) {
    naturals.push(i);
  }
  naturals.sort(function(a,b) {
    return a - b;
  });
  
  // 2. 아무 값도 들어있지 않은 소수리스트를 준비함
  var primes = [];

  while (1) {
    if (naturals.length === 0) {
      break;
    }
    
    // 3. 탐색리스트 중에서 가장 작은 값을 소수리스트로 이동함
    var number = naturals.shift();
    primes.push(number);

    // 4. 소수리스트에 추가된 값의 모든 배수를 탐색리스트에서 제거함
    naturals = naturals.filter(function(e) {
      return e % number !== 0
    });

    // 5. 소수리스트에 추가된 값의 제곱이 탐색리스트 마지막에 있는 값과 비교함  
    //    제곱값 < 마지막값 : 3단계로 이동 + 반복  
    //    제곱값 > 마지막값 : 반복 종료  
    if (number*number > naturals[naturals.length-1]) {
      break;
    }
  }

  // 6. 탐색리스트에 남아있는 수들을 모두 소수리스트로 이동시킴
  primes = primes.concat(naturals);

  return primes;
}
```

### 교재 문제풀이 해설 및 구현

- 탐색 종료 조건이 현재 소수 제곱 비교인 이유 ..? 
  1. 가장 최근에 소수리스트로 옮긴 수를 a 라고 하고, 탐색리스트에서 가장 큰 수를 b 라고 한다.
  2. a*a > b 일때, b 가 a 보다 큰 소수가 아니라면 어떤 소수의 배수이어야 한다.
  3. a 보다 작은 소수의 배수는 이미 탐색리스트에서 모두 제거되어 있다.
  4. 따라서 어떤 소수의 배수이려면 둘 이상의 a 보다 큰 소수의 곱이어야 한다.
  5. 둘 이상의 a 보다 큰 소수의 곱은 반드시 b 보다 크다.
  6. 그러므로 a*a > b 가 성립할경우, 탐색리스트에 남은 수는 모두 소수다.

```javascript
function yourCode() {
  var resArr = [];
  var primeArr = [];
  var numArr = [];
  var start = 2;
  var end = 100;
  var n = start;

  // 시작수~종료수를 배열에 저장
  for (var i=start; i<=end; i++) {
    numArr.push(i);
  }

  // 탐색리스트가 빌때까지 소수 탐색
  while (numArr.length) {
    // 첫번째 숫자를 소수로서 취득
    n = numArr.shift();
    // 소수리스트에 저장
    primeArr.push(n);
    // 소수의 배수 제거 (역순처리)
    for (var i=numArr.length-1; i>=0; i--) {
      if (numArr[i] % n ==0) numArr.splice(i,1);
    }
    // 현재 소수의 제곱이 탐색리스트의 마지막수보다 크면 탐색 종료
    if (n*n > numArr[numArr.length-1]) break;
  }

  // 남은 탐색리스트를 소수리스트에 합산
  resArr = primeArr.concat(numArr);

  // 최종 소수리스트를 반환하고 처리 종료
  return resArr;
}
```

