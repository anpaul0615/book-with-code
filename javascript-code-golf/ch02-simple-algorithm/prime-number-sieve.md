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
