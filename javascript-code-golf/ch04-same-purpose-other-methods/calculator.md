# 4.1. 계산식을 컴퓨터에 이해시키자 (알고리즘 문제 3)

## 계산기 조건
- evalFunction 등 문자열을 코드로 실행하는 방법을 사용하지 말것
- 계산식 중의 수치는 정수만 다룰것
- 계산 과정이나 답에는 소수점이 포함될수있음
- 사용가능한 연산 기호는 +,-,*,/
- 공백 문자 등이 계산식안에 포함되면 안됨 (0123456789+-*/ 의 14가지 문자만을 사용)
- 사칙연산만 지원. 연산 기호에 따른 우선순위를 지킬것 (곱셈, 나눗셈은 덧셈, 뺄셈보다 우선)
- 계산식에 괄호를 쓸수없음



## 구현

### 교재 실습코드 1 (2-Path 처리)

- 1. 계산식을 배열로 분할
  1) `숫자 -` 와 같은 형태의 문자열을 `숫자+-` 형태로 바꿈
  2) splt 배열을 만듬
  3) 숫자와 -(음수기호). 그 이외의 문자열을 분리하여 splt 배열에 저장함

- 2. splt 배열에 대해서 곱셈과 나눗셈 처리
  1) 안이 빈 num 배열을 작성함
  2) +(덧셈) 은 무시하고 지나감
  3) 수치는 num 배열에 저장함
  4) *(곱셉) 과 /(나눗셈) 은 다음과 같이 처리함
    4-1) num 배열의 맨마지막 값을 꺼냄
    4-2) splt 배열에서 다음 수치를 꺼냄
    4-3) 위의 두 수치를 계산함
    4-4) num 배열에 결과를 저장함

- 3. 최종처리
  1) num 배열의 수치를 모두 더함
  2) 그 결과를 답으로 반환함


```javascript
function yourCode(arg) {
	// 식 변환하기
  var repStr = arg.replace(/(\d)-/g, '$1+-');
  console.log(reStr);
	// 식 분할하기
  var splt = repStr.match(/[-\d]+|./g);
  console.log(splt);
  // 곱셈,나눗셈을 실행하고 수치배열 만들기
  var num = [];
  while (splt.length) {
    var tgt = splt.shift();
    if (tgt == '+') {
      continue;
    }
    else if (tgt == '*') {
      var bfr = num.pop();
      var aftr = splt.shift();
      num.push(bfr * aftr);
    }
    else if (tgt == '/') {
      var bfr = num.pop();
      var aftr = aplt.shift();
      num.push(bft / aftr);
    }
    else {
      num.push(tgt|0);
    }
  }
  console.log(num);
  // 수치배열의 합 구하기
  var res = 0;
  while(num.length) res += num.shift();
  console.log(res);
  // 결과를 되돌리며 처리 종료
  return res;
}
```



### 교재 실습코드 2 (역폴란드표기법 기반 처리)

- 1. 계산식을 배열로 분할
  1) `숫자 -` 와 같은 형태의 문자열을 `숫자+-` 형태로 바꿈
  2) splt 배열을 만듬
  3) 숫자와 -(음수기호). 그 이외의 문자열을 분리하여 splt 배열에 저장함

- 2. splt 배열의 곱셈, 나눗셈 부분 처리하기
  1) splt 배열의 곱셈, 나눗셈 부분을 추출함
  2) 추출한 곳을 역폴란드 표기로 된 배열로 만듬
  3) 역폴란드 표기 배열을 원래 splt 배열에서 추출한 곳과 바꾸어 넣음
  ex) `[1,+,2,*,3,+,-4]  =>  [1,+,[2,3,*],+,-4]`

- 3. splt 배열의 덧셈 부분 처리하기
  1) splt 배열의 덧셈 부분을 추출함
  2) 추출한 곳을 역폴란드 표기로 된 배열로 만듬
  3) 역폴란드 표기 배열을 원래 splt 배열에서 추출한 곳과 바꾸어 넣음
  ex) `[1,+,[2,3,*],+,-4]  =>  [ [ [1,[2,3,*],+], -4],+ ]`

- 4. splt 배열의 중첩된 부분 풀어내기
  ex) `[1,+,[2,3,*],+,-4]  =>  [1,2,3,*,+,-4,+]`

- 5. 풀어낸 배열을 역폴란드 표기법의 처리방법에 따라 처리하기
  1) 배열의 첫 요소의 값을 꺼냄
  2) 만약수치라면 버퍼에 push 함
  3) 만약 연산자라면 버퍼에서 2개의 값을 pop 해서 연산자에 맞는 계산을 하고 그 결과를 다시 버퍼에 push 함
  4) 배열이 비었으면 처리를 종료함
  5) 버퍼의 첫 요소의 값을 답으로 반환함


```javascript
function yourCode(arg) {
	/** 식 중첩 함수 **/
  function nest(arrSrc, arrDst, mark) {
    while (arrSrc.length) {
      var tgt = arrSrc.shift();
      if (mark.indexOf(tgt) >= 0) {
        var bfr = arrDst.pop();
        var aftr = arrSrc.shift();
        arrDst.push([bfr, aftr, tgt]);
      }
      else {
        arrDst.push(tgt);
      }
    }
  }
	/** 식 전개 함수 **/
  function expand(arrSrc, arrDst) {
    var tgt = arrSrc.shift();
    if (tgt instanceof Array)
      arguments.callee(tgt, arrDst);
    else
      arrDst.push(tgt);
    if (arrSrc.length > 0)
      arguments.callee.apply(this, arguments);
  }
  /** 역폴란드 표기 배열 계산 함수 **/
  function reversePolishNotation(arrSrc, arrDst) {
    while (arrSrc.length) {
      var tgt = arrSrc.shift();
      if (tgt.match(/\d/))
        arrDst.push(tgt|0);
      else {
        var aftr = arrDst.pop();
        var bfr = arrDst.pop();
        var r;
        if (tgt == '+') r = bfr + aftr;
        if (tgt == '*') r = bfr * aftr;
        if (tgt == '/') r = bfr / aftr;
        arrDst.push(r);
        console.log(bfr + ',' + aftr + ',' + tgt + ' -> ' + r);
      }
    }
  }
  /** 디버깅 출력 함수 **/
  function dump(arr) {
    var res = [];
    for (var i=0; i<arr.length; i++) {
      var dat = arr[i];
      if (dat instanceof Array) res.push(dump(dat));
      else res.push(dat);
    }
    return '[' + res.join(',') + ']';
  }

  // 식변환
  var repStr = arg.replace(/(\d)-/g, '$1+-');
  console.log(repStr);
  // 식분할
  var splt = repStr.match(/[-\d]+|./g);
  console.log(splt);
  // 곱셈,나눗셈을 역폴란드 표기법으로 바꾸어 중첩시키기
  var arrSrc = splt;
  var arrDst = [];
  nest(arrSrc, arrDst, '*/');
  console.log('곱셈, 나눗셈 : ', dump(arrDst));
  // 덧셈을 역폴란드 표기법으로 바꾸어서 중첩시키기
  arrSrc = arrDst;
  arrDst = [];
  nest(arrSrc, arrDst, '+');
  console.log('덧셈 : ', dump(arrDst));
  // 역폴란드 표기 배열을 전개
  arrSrc = arrDst;
  arrDst = [];
  expand(arrSrc, arrDst);
  console.log('전개 : ', dump(arrDst));
  // 역폴란드 표기배열을 계산
  arrSrc = arrDst;
  arrDst = [];
  console.log('역폴란트 표기 배열 계산 : ');
  reversePolishNotation(arrSrc, arrDst);
  console.log('답 : ', arrDst[0]);
  // 처리종료
  return arrDst[0];
}
```

